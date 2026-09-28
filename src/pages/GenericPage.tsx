import { useState } from 'react';
import { Plus, Search, RotateCcw } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { useAppData } from '../app/providers/AppProvider';

const config: Record<string, { title: string; description: string; purpose: string; columns: string[]; key?: string }> = {
  households: { title: 'Households', description: 'Group residents into household records.', purpose: 'Household registry', columns: ['Household ID', 'Household Head', 'Purok', 'Address', 'Members'] },
  certificates: { title: 'Certificates', description: 'Track certificate types and issuance workflow.', purpose: 'Certificate issuance queue', columns: ['Certificate', 'Resident', 'Purpose', 'Date', 'Status'] },
  requests: { title: 'Service Requests', description: 'Review and update resident service applications.', purpose: 'Requests queue', columns: ['Request ID', 'Resident', 'Service', 'Date', 'Status'] },
  complaints: { title: 'Complaints', description: 'Log community concerns and track resolution.', purpose: 'Complaint records', columns: ['Complaint ID', 'Resident', 'Category', 'Location', 'Status'] },
  blotter: { title: 'Blotter Records', description: 'Restricted incident-record workspace. Demo data only.', purpose: 'Blotter register', columns: ['Case ID', 'Complainant', 'Incident', 'Date', 'Status'] },
  payments: { title: 'Payments', description: 'Track service fees and payment status.', purpose: 'Payment ledger', columns: ['Payment ID', 'Resident', 'Service', 'Amount', 'Status'] },
  announcements: { title: 'Announcements', description: 'Manage notices visible to the community.', purpose: 'Community announcements', columns: ['Announcement ID', 'Title', 'Category', 'Date', 'Status'] },
  events: { title: 'Events', description: 'Plan community activities and schedules.', purpose: 'Community events', columns: ['Event ID', 'Event', 'Location', 'Date', 'Status'] },
  reports: { title: 'Reports & Analytics', description: 'Review operational totals derived from local demo data.', purpose: 'Current data summary', columns: ['Metric', 'Value'] },
  users: { title: 'User Management', description: 'MVP placeholder for future staff accounts and permissions.', purpose: 'Staff access control', columns: ['Role', 'Scope'] },
  'audit-logs': { title: 'Audit Logs', description: 'MVP placeholder. Production changes should be audit logged server-side.', purpose: 'Audit trail', columns: ['Event', 'Actor', 'Timestamp'] },
  settings: { title: 'Settings', description: 'Manage this local demo and review implementation limitations.', purpose: 'Local demo settings', columns: ['Setting', 'Value'] }
};

export function GenericPage({ section }: { section: string }) {
  const { data, resetDemo } = useAppData();
  const c = config[section];
  const [query, setQuery] = useState('');

  const rows: Record<string, string>[] = section === 'households' ? data.households.map(h => ({ a: h.id, b: data.residents.find(r => r.id === h.headResidentId)?.firstName + ' ' + (data.residents.find(r => r.id === h.headResidentId)?.lastName || ''), c: h.purok, d: h.address, e: String(h.members) })) :
    section === 'requests' ? data.requests.map(r => ({ a: r.id, b: data.residents.find(x => x.id === r.residentId)?.firstName + ' ' + (data.residents.find(x => x.id === r.residentId)?.lastName || ''), c: r.service, d: r.date, e: r.status })) :
    section === 'complaints' ? data.complaints.map(x => ({ a: x.id, b: x.residentName, c: x.category, d: x.location, e: x.status })) :
    section === 'payments' ? data.payments.map(x => ({ a: x.id, b: x.residentName, c: x.service, d: `₱${x.amount.toFixed(2)}`, e: x.status })) :
    section === 'announcements' ? data.announcements.map(x => ({ a: x.id, b: x.title, c: x.category, d: x.date, e: x.status })) :
    section === 'reports' ? [{ a: 'Active residents', b: String(data.residents.filter(r => r.status === 'Active').length) }, { a: 'Households', b: String(data.households.length) }, { a: 'Service requests', b: String(data.requests.length) }, { a: 'Complaints', b: String(data.complaints.length) }, { a: 'Payments recorded', b: String(data.payments.length) }] :
    section === 'settings' ? [{ a: 'Storage mode', b: 'Browser localStorage' }, { a: 'Demo data', b: 'Sample records only' }, { a: 'Production readiness', b: 'Not production-ready' }] :
    section === 'users' ? [{ a: 'Barangay Admin', b: 'Full demo UI access' }, { a: 'Secretary', b: 'Future role-based access' }, { a: 'Treasurer', b: 'Future finance access' }] :
    section === 'blotter' ? [{ a: 'No sample case rows', b: 'No actual blotter data' }] :
    section === 'certificates' ? data.requests.filter(r => r.status === 'Approved' || r.status === 'Completed').map(r => ({ a: r.service, b: data.residents.find(x => x.id === r.residentId)?.firstName + ' ' + (data.residents.find(x => x.id === r.residentId)?.lastName || ''), c: r.purpose, d: r.date, e: r.status })) :
    [];

  const visible = rows.filter(row => Object.values(row).join(' ').toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <PageHeader 
        title={c.title} 
        description={c.description} 
        action={
          section === 'settings' ? (
            <button className="secondary-button" onClick={() => { if (confirm('Reset all demo data to the original sample?')) resetDemo(); }}>
              <RotateCcw size={16} /> Reset demo data
            </button>
          ) : undefined
        } 
      />
      
      <div className="panel data-panel">
        <div className="list-toolbar">
          <div>
            <strong>{c.purpose}</strong>
            <span> · {rows.length} records</span>
          </div>
          <label className="search-field">
            <Search size={17} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search records" />
          </label>
        </div>
        
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {c.columns.map(x => <th key={x}>{x}</th>)}
              </tr>
            </thead>
            <tbody>
              {visible.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((v, j) => <td key={j}>{v}</td>)}
                </tr>
              ))}
              {!visible.length && (
                <tr>
                  <td className="empty-cell" colSpan={c.columns.length}>No records to display.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {['certificates', 'events'].includes(section) && (
          <div className="feature-note">
            <Plus size={17} /> Create/approval workflows for this module are planned for the next MVP iteration.
          </div>
        )}
      </div>
    </>
  );
}