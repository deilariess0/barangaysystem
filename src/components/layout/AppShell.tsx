import { useState, useEffect, type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Activity, Bell, BookOpen, CalendarDays, ChartNoAxesColumn, ClipboardList, FileCheck2, House, LayoutDashboard, Menu, Megaphone, Search, Settings, ShieldAlert, Users, Wallet, X, UserCog, ScrollText, User, LogOut } from 'lucide-react';

const nav = [
  { label: 'Main', items: [['Dashboard', '/dashboard', LayoutDashboard], ['Residents', '/residents', Users], ['Households', '/households', House], ['Barangay Census', '/census', ChartNoAxesColumn], ['Certificates', '/certificates', FileCheck2], ['Requests', '/requests', ClipboardList], ['Complaints', '/complaints', ShieldAlert], ['Blotter', '/blotter', BookOpen]] },
  { label: 'Community', items: [['Payments', '/payments', Wallet], ['Announcements', '/announcements', Megaphone], ['Events', '/events', CalendarDays], ['Reports', '/reports', Activity]] },
  { label: 'System', items: [['User Management', '/users', UserCog], ['Audit Logs', '/audit-logs', ScrollText], ['Settings', '/settings', Settings]] }
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const title = location.pathname.split('/')[1]?.replace(/-/g, ' ') || 'Dashboard';

  // Close dropdowns when clicking anywhere else on the screen
  useEffect(() => {
    const handleClickOutside = () => {
      setShowNotifications(false);
      setShowProfile(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Combine mobile and desktop classes for the sidebar and main area
  const sidebarClass = `sidebar ${mobileOpen ? 'sidebar-open' : ''} ${desktopCollapsed ? 'sidebar-collapsed' : ''}`;
  const mainClass = `main-area ${desktopCollapsed ? 'main-expanded' : ''}`;

  return (
    <div className="app-shell">
      <aside className={sidebarClass}>
        <div className="brand">
          {/* Replaced the Landmark icon with your custom logo */}
          <img 
            src="/logo.png" 
            alt="Barangay Logo" 
            style={{ width: '42px', height: '42px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} 
          />
          <div><strong>Barangay Digital Hub</strong><small>Management System</small></div>
          <button className="mobile-close icon-button" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X /></button>
        </div>
        
        <nav>
          {nav.map(group => (
            <div className="nav-group" key={group.label}>
              <p>{group.label}</p>
              {group.items.map(([label, to, Icon]) => (
                <NavLink key={to} to={to} onClick={() => setMobileOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <Icon size={18} /><span>{label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        
        <div className="sidebar-user">
          <span className="avatar">JD</span>
          <div><strong>Juan Dela Cruz</strong><small>Barangay Admin</small></div>
        </div>
      </aside>

      {mobileOpen && <button className="scrim" onClick={() => setMobileOpen(false)} aria-label="Close menu" />}

      <main className={mainClass}>
        <header className="topbar">
          {/* Dynamic Menu Button: Shows X when open, Hamburger when closed */}
          <button
            className="icon-button menu-toggle"
            onClick={() => {
              if (window.innerWidth > 760) {
                setDesktopCollapsed(!desktopCollapsed);
              } else {
                // On mobile, always open the drawer and reset desktop collapse
                setDesktopCollapsed(false);
                setMobileOpen(true);
              }
            }}
            aria-label="Toggle navigation"
          >
            {/* Shows X on desktop if collapsed, OR on mobile if drawer is open */}
            {(desktopCollapsed || mobileOpen) ? <X /> : <Menu />}
          </button>

          <div className="breadcrumbs">
            Workspace <span>/</span> <strong>{title.replace(/^./, c => c.toUpperCase())}</strong>
          </div>

          <div className="top-actions">
            <label className="global-search">
              <Search size={17} />
              <input placeholder="Search residents, requests..." aria-label="Search" />
            </label>

            {/* Notification Bell Dropdown */}
            <div style={{ position: 'relative' }}>
              <button className="icon-button" aria-label="Notifications" onClick={(e) => { e.stopPropagation(); setShowNotifications(!showNotifications); setShowProfile(false); }}>
                <Bell size={19} /><i className="notification-dot" />
              </button>
              {showNotifications && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '10px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', width: '300px', zIndex: 50, padding: '10px' }}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Notifications</h4>
                  <div style={{ padding: '8px', fontSize: '13px', borderBottom: '1px solid #f1f5f9' }}>New resident registration pending approval.</div>
                  <div style={{ padding: '8px', fontSize: '13px', borderBottom: '1px solid #f1f5f9' }}>Certificate request #1042 is ready.</div>
                  <div style={{ padding: '8px', fontSize: '13px' }}>System update scheduled for tonight.</div>
                </div>
              )}
            </div>

            {/* Profile Avatar Dropdown */}
            <div style={{ position: 'relative' }}>
              <button className="avatar" style={{ border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => { e.stopPropagation(); setShowProfile(!showProfile); setShowNotifications(false); }}>
                JD
              </button>
              {showProfile && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '10px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', width: '200px', zIndex: 50, padding: '5px 0' }}>
                  <div style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}>
                    <strong style={{ display: 'block', fontSize: '14px' }}>Juan Dela Cruz</strong>
                    <small style={{ color: '#64748b' }}>admin@barangay.gov</small>
                  </div>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 15px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '14px' }}><User size={16} /> My Profile</button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 15px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '14px' }}><Settings size={16} /> Account Settings</button>
                  <div style={{ borderTop: '1px solid #eee', margin: '5px 0' }}></div>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 15px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '14px', color: '#ef4444' }}><LogOut size={16} /> Log Out</button>
                </div>
              )}
            </div>
          </div>
        </header>
        
        <div className="page-content">{children}</div>
        
        <footer>Barangay Digital Hub <span>•</span> MVP Demo · Local browser storage</footer>
      </main>
    </div>
  );
}