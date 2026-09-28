import React, { useMemo, useState } from 'react';
import { Plus, Search, Trash2, UserRound, X } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { useAppData } from '../app/providers/AppProvider';
import type { Resident } from '../types';

// Initial state for the "Add Resident" form
const blankResident: Omit<Resident, 'id' | 'createdAt'> = {
  firstName: '',
  lastName: '',
  birthDate: '',
  sex: 'Male',
  civilStatus: 'Single',
  phone: '',
  purok: 'Purok 1',
  streetAddress: '',
  voterStatus: 'Unknown',
  status: 'Active',
};

export function ResidentsPage() {
  const { data, updateCollection } = useAppData();
  
  // Component State
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(blankResident);

  // Filter residents based on search query
  const filteredResidents = useMemo(() => {
    const searchLower = query.toLowerCase();
    return data.residents.filter(r => 
      `${r.firstName} ${r.lastName} ${r.id} ${r.purok}`.toLowerCase().includes(searchLower)
    );
  }, [data.residents, query]);

  // Handle form submission
  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    
    const newResident: Resident = {
      ...form,
      id: `RES-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    updateCollection('residents', [newResident, ...data.residents]);
    setForm(blankResident);
    setIsModalOpen(false);
  }

  // Handle resident deletion
  function handleRemove(id: string) {
    if (confirm('Delete this resident from the local demo?')) {
      updateCollection('residents', data.residents.filter(r => r.id !== id));
    }
  }

  // Helper to update specific form fields
  const updateFormField = (field: keyof typeof blankResident, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Header Section */}
      <PageHeader 
        title="Residents" 
        description="Maintain the barangay resident registry and basic demographic information." 
        action={
          <button className="primary-button" onClick={() => setIsModalOpen(true)}>
            <Plus size={17} /> Add resident
          </button>
        }
      />

      {/* Main Data Table Panel */}
      <div className="panel data-panel">
        
        {/* Toolbar */}
        <div className="list-toolbar">
          <div>
            <strong>{data.residents.length} resident records</strong>
            <span> · Local demo registry</span>
          </div>
          
          <label className="search-field">
            <Search size={17} />
            <input 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              placeholder="Search name, ID, purok" 
            />
          </label>
        </div>

        {/* Data Table */}
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Resident</th>
                <th>Resident ID</th>
                <th>Age / Sex</th>
                <th>Address / Purok</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredResidents.map(r => (
                <tr key={r.id}>
                  <td>
                    <div className="resident-cell">
                      <span className="avatar soft"><UserRound size={17} /></span>
                      <strong>
                        {r.firstName} {r.middleName ? `${r.middleName} ` : ''}{r.lastName}
                      </strong>
                    </div>
                  </td>
                  <td>{r.id}</td>
                  <td>{r.birthDate} · {r.sex}</td>
                  <td>{r.streetAddress}, {r.purok}</td>
                  <td>{r.phone}</td>
                  <td>
                    <span className="status status-approved">{r.status}</span>
                  </td>
                  <td>
                    <button 
                      className="icon-button danger" 
                      onClick={() => handleRemove(r.id)} 
                      aria-label={`Delete ${r.firstName} ${r.lastName}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              
              {!filteredResidents.length && (
                <tr>
                  <td colSpan={7} className="empty-cell">No matching resident records.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Resident Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" role="presentation">
          <form className="modal" onSubmit={handleSave}>
            
            <div className="modal-heading">
              <div>
                <h2>Add resident</h2>
                <p>Fields marked with * are required.</p>
              </div>
              <button 
                type="button" 
                className="icon-button" 
                onClick={() => setIsModalOpen(false)} 
                aria-label="Close"
              >
                <X />
              </button>
            </div>

            <div className="form-grid">
              <label>
                First name *
                <input 
                  required 
                  value={form.firstName} 
                  onChange={e => updateFormField('firstName', e.target.value)} 
                />
              </label>
              
              <label>
                Last name *
                <input 
                  required 
                  value={form.lastName} 
                  onChange={e => updateFormField('lastName', e.target.value)} 
                />
              </label>
              
              <label>
                Date of birth *
                <input 
                  required 
                  type="date" 
                  value={form.birthDate} 
                  onChange={e => updateFormField('birthDate', e.target.value)} 
                />
              </label>
              
              <label>
                Sex
                <select 
                  value={form.sex} 
                  onChange={e => updateFormField('sex', e.target.value as Resident['sex'])}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </label>
              
              <label>
                Phone *
                <input 
                  required 
                  value={form.phone} 
                  onChange={e => updateFormField('phone', e.target.value)} 
                />
              </label>
              
              <label>
                Purok
                <select 
                  value={form.purok} 
                  onChange={e => updateFormField('purok', e.target.value)}
                >
                  {Array.from({ length: 7 }, (_, i) => (
                    <option key={i}>Purok {i + 1}</option>
                  ))}
                </select>
              </label>
              
              <label className="span-2">
                Street / Address *
                <input 
                  required 
                  value={form.streetAddress} 
                  onChange={e => updateFormField('streetAddress', e.target.value)} 
                />
              </label>
              
              <label>
                Civil status
                <select 
                  value={form.civilStatus} 
                  onChange={e => updateFormField('civilStatus', e.target.value)}
                >
                  {['Single', 'Married', 'Widowed', 'Separated'].map(x => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
              
              <label>
                Voter status
                <select 
                  value={form.voterStatus} 
                  onChange={e => updateFormField('voterStatus', e.target.value as Resident['voterStatus'])}
                >
                  {['Registered', 'Not registered', 'Unknown'].map(x => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                className="secondary-button" 
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="primary-button" type="submit">
                <Plus size={16} /> Save resident
              </button>
            </div>
            
          </form>
        </div>
      )}
    </>
  );
}