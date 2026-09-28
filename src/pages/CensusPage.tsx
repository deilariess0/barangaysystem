import React from 'react';
import { Users, House, MapPinned, ChartColumn } from 'lucide-react';
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { PageHeader } from '../components/ui/PageHeader';
import { useAppData } from '../app/providers/AppProvider';

// Helper function to calculate age from a date string
function getAge(dateString: string): number {
  const dob = new Date(dateString);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  
  // Adjust age if birthday hasn't occurred yet this year
  if (
    now.getMonth() < dob.getMonth() || 
    (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())
  ) {
    age--;
  }
  
  return Math.max(0, age); // Ensure age is never negative
}

export function CensusPage() {
  const { data } = useAppData();
  
  // Filter active residents
  const residents = data.residents.filter(r => r.status === 'Active');

  // Define age groups: [Label, Min Age, Max Age]
  const ageGroups = [
    ['0–14', 0, 14],
    ['15–24', 15, 24],
    ['25–34', 25, 34],
    ['35–44', 35, 44],
    ['45–54', 45, 54],
    ['55–64', 55, 64],
    ['65+', 65, 200]
  ] as const;

  // Calculate population by age group
  const ageData = ageGroups.map(([name, min, max]) => ({
    name,
    count: residents.filter(r => {
      const age = getAge(r.birthDate);
      return age >= min && age <= max;
    }).length
  }));

  // Calculate population by purok (assuming Purok 1 through 7)
  const purokData = Array.from({ length: 7 }, (_, i) => {
    const purokName = `Purok ${i + 1}`;
    return {
      name: purokName,
      residents: residents.filter(r => r.purok === purokName).length
    };
  });

  // Calculate population by sex
  const maleCount = residents.filter(r => r.sex === 'Male').length;
  const femaleCount = residents.filter(r => r.sex === 'Female').length;
  const totalResidents = residents.length;

  return (
    <>
      {/* Header Section */}
      <PageHeader 
        eyebrow="Population registry" 
        title="Barangay Census" 
        description="A demographic snapshot generated from active resident records. This is an operational estimate, not an official census submission."
      />

      {/* Top Stats Cards */}
      <div className="stats-grid three">
        <div className="stat-card">
          <div className="stat-icon blue"><Users /></div>
          <div className="stat-label">Total population</div>
          <div className="stat-value">{totalResidents.toLocaleString()}</div>
          <div className="stat-foot">Active residents in local registry</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon green"><House /></div>
          <div className="stat-label">Households</div>
          <div className="stat-value">{data.households.length.toLocaleString()}</div>
          <div className="stat-foot">Registered household records</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon purple"><MapPinned /></div>
          <div className="stat-label">Puroks represented</div>
          <div className="stat-value">{new Set(residents.map(r => r.purok)).size}</div>
          <div className="stat-foot">With at least one active resident</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="census-page-grid">
        
        {/* Chart: Population by Age Group */}
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Population by age group</h2>
              <p>Age calculated from date of birth</p>
            </div>
            <ChartColumn className="muted-icon" />
          </div>
          
          <div className="large-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7edf4" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#526176', fontSize: 12 }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <YAxis 
                  allowDecimals={false} 
                  tick={{ fill: '#526176', fontSize: 12 }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <Tooltip />
                <Bar dataKey="count" name="Residents" fill="#2878df" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* List: Population by Purok */}
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Population by purok</h2>
              <p>Resident count per area</p>
            </div>
          </div>
          
          {purokData.map(p => (
            <div className="bar-row" key={p.name}>
              <span>{p.name}</span>
              <div className="bar-track">
                <div 
                  style={{ 
                    width: `${totalResidents ? (p.residents / totalResidents) * 100 : 0}%` 
                  }} 
                />
              </div>
              <strong>{p.residents}</strong>
            </div>
          ))}
        </section>

        {/* Stats: Population by Sex */}
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Population by sex</h2>
              <p>Based on recorded resident profiles</p>
            </div>
          </div>
          
          <div className="gender-row">
            <span className="gender-dot male" />
            <span>Male</span>
            <strong>{maleCount}</strong>
            <small>
              {totalResidents ? Math.round((maleCount / totalResidents) * 100) : 0}%
            </small>
          </div>
          
          <div className="gender-row">
            <span className="gender-dot female" />
            <span>Female</span>
            <strong>{femaleCount}</strong>
            <small>
              {totalResidents ? Math.round((femaleCount / totalResidents) * 100) : 0}%
            </small>
          </div>
          
          <div className="privacy-note">
            Census figures are computed from the demo registry stored in this browser. 
            Validate against official barangay records before operational use.
          </div>
        </section>
        
      </div>
    </>
  );
}