import React from 'react';
import { 
  Users, 
  House, 
  ClipboardList, 
  CalendarCheck, 
  ArrowUpRight, 
  FilePlus2, 
  UserPlus, 
  MessageSquareWarning, 
  FileCheck2 
} from 'lucide-react';
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';
import { useAppData } from '../app/providers/AppProvider';

// Helper function to calculate age from birthdate
function calculateAge(birthDate: string): number {
  const dob = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  
  // Adjust age if birthday hasn't occurred yet this year
  if (
    now.getMonth() < dob.getMonth() || 
    (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age;
}

export function DashboardPage() {
  const { data } = useAppData();
  
  // Filter active residents
  const activeResidents = data.residents.filter(r => r.status === 'Active');

  // --- Chart Data Preparation ---
  const chartData = [
    { name: '0–14', count: 0 },
    { name: '15–24', count: 0 },
    { name: '25–34', count: 0 },
    { name: '35–44', count: 0 },
    { name: '45–54', count: 0 },
    { name: '55–64', count: 0 },
    { name: '65+', count: 0 },
  ];

  activeResidents.forEach(resident => {
    const age = calculateAge(resident.birthDate);
    let index = 6; // Default to 65+
    
    if (age < 15) index = 0;
    else if (age < 25) index = 1;
    else if (age < 35) index = 2;
    else if (age < 45) index = 3;
    else if (age < 55) index = 4;
    else if (age < 65) index = 5;
    
    chartData[index].count++;
  });

  // --- Statistics Cards Data ---
  const stats = [
    { 
      label: 'Total Residents', 
      value: activeResidents.length, 
      sub: 'Active resident records', 
      Icon: Users, 
      color: 'blue' 
    },
    { 
      label: 'Households', 
      value: data.households.length, 
      sub: 'Registered households', 
      Icon: House, 
      color: 'green' 
    },
    { 
      label: 'Pending Requests', 
      value: data.requests.filter(r => r.status === 'Pending' || r.status === 'In review').length, 
      sub: 'Need staff attention', 
      Icon: ClipboardList, 
      color: 'amber' 
    },
    { 
      label: "Today's Appointments", 
      value: data.requests.filter(r => r.date === new Date().toISOString().slice(0, 10)).length, 
      sub: 'Scheduled service requests', 
      Icon: CalendarCheck, 
      color: 'purple' 
    }
  ];

  const recentRequests = data.requests.slice(0, 5);

  return (
    <>
      {/* Header Section */}
      <PageHeader 
        eyebrow="Dashboard" 
        title="Barangay Management Overview" 
        description="A clear view of resident records, services, and community activity." 
        action={
          <span className="date-chip">
            {new Date().toLocaleDateString('en-PH', { dateStyle: 'medium' })}
          </span>
        }
      />

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map(s => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon ${s.color}`}>
              <s.Icon size={21} />
            </div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value.toLocaleString()}</div>
            <div className="stat-foot">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        {/* Census Chart Panel */}
        <section className="panel census-panel">
          <div className="panel-heading">
            <div>
              <h2>Barangay Census Overview</h2>
              <p>Resident age distribution from the current registry</p>
            </div>
            <Link className="text-link" to="/census">
              View full census <ArrowUpRight size={16} />
            </Link>
          </div>
          
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
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

          <div className="census-mini">
            <div>
              <span>Total population</span>
              <strong>{activeResidents.length.toLocaleString()}</strong>
            </div>
            <div>
              <span>Male</span>
              <strong>{activeResidents.filter(r => r.sex === 'Male').length}</strong>
            </div>
            <div>
              <span>Female</span>
              <strong>{activeResidents.filter(r => r.sex === 'Female').length}</strong>
            </div>
            <div>
              <span>Puroks represented</span>
              <strong>{new Set(activeResidents.map(r => r.purok)).size}</strong>
            </div>
          </div>
        </section>

        {/* Quick Actions Panel */}
        <section className="panel quick-panel">
          <div className="panel-heading">
            <div>
              <h2>Quick Actions</h2>
              <p>Common staff tasks</p>
            </div>
          </div>
          
          <div className="quick-grid">
            <Link to="/residents">
              <UserPlus />
              <span>Add resident</span>
            </Link>
            <Link to="/requests">
              <FilePlus2 />
              <span>New request</span>
            </Link>
            <Link to="/complaints">
              <MessageSquareWarning />
              <span>Record complaint</span>
            </Link>
            <Link to="/certificates">
              <FileCheck2 />
              <span>Issue certificate</span>
            </Link>
          </div>

          <div className="notice">
            <strong>Demo data only</strong>
            <p>
              Records are saved in this browser's local storage. Do not enter real resident personal or case information.
            </p>
          </div>
        </section>

        {/* Recent Requests Panel */}
        <section className="panel requests-panel">
          <div className="panel-heading">
            <div>
              <h2>Recent Requests</h2>
              <p>Latest resident service applications</p>
            </div>
            <Link className="text-link" to="/requests">
              View all <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Resident</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map(r => {
                  const person = data.residents.find(x => x.id === r.residentId);
                  return (
                    <tr key={r.id}>
                      <td className="muted">{r.id}</td>
                      <td>
                        {person ? `${person.firstName} ${person.lastName}` : 'Resident record unavailable'}
                      </td>
                      <td>{r.service}</td>
                      <td>{r.date}</td>
                      <td>
                        <span className={`status status-${r.status.toLowerCase().replace(' ', '-')}`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {!recentRequests.length && (
                  <tr>
                    <td colSpan={5} className="empty-cell">No requests yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Announcements Panel */}
        <section className="panel announcement-panel">
          <div className="panel-heading">
            <div>
              <h2>Announcements</h2>
              <p>Community notices</p>
            </div>
            <Link className="text-link" to="/announcements">
              Manage <ArrowUpRight size={16} />
            </Link>
          </div>
          
          {data.announcements
            .filter(a => a.status === 'Published')
            .slice(0, 4)
            .map(a => (
              <article className="announcement-item" key={a.id}>
                <span className="announcement-bullet">
                  <FileCheck2 size={17} />
                </span>
                <div>
                  <strong>{a.title}</strong>
                  <p>{a.date} · {a.category}</p>
                </div>
              </article>
            ))}
        </section>
      </div>
    </>
  );
}