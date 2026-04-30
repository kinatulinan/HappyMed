import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import hmLogo from "../assets/happymedlogo.png";

// Simple inline SVGs for layout icons
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>;

// Specific Side Nav Icons
const DashboardIcon = () => <svg className="hm-nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>;
const CartIcon = () => <svg className="hm-nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>;
const LinkIcon = () => <svg className="hm-nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
const BoxIcon = () => <svg className="hm-nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;
const ReportsIcon = () => <svg className="hm-nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 18h8"/><path d="M12 18v-6"/></svg>;
const ChartIcon = () => <svg className="hm-nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>;
const UsersIcon = () => <svg className="hm-nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const FactoryIcon = () => <svg className="hm-nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>;
const UserBadgeIcon = () => <svg className="hm-nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M18 8h3"/><path d="M18 12h3"/></svg>;
const SettingsIcon = () => <svg className="hm-nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const BarChartIcon = () => <svg className="hm-nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>;

export default function DashboardLayout() {
  const { user, logout, hasRole } = useAuth();
  
  // Mock nav items array for the specific sidebar
  const navItems = [
    { name: "Dashboard", path: "/", icon: <DashboardIcon />, exact: true },
    { name: "Medicines", path: "/medicines", icon: <BoxIcon /> },
    { name: "Stock", path: "/stock", icon: <ChartIcon /> },
    { name: "Reports", path: "/reports", icon: <BarChartIcon /> },
    { name: "Settings", path: "/settings", icon: <SettingsIcon /> },
  ];

  return (
    <div className="hm-shell">
      {/* Sidebar */}
      <aside className="hm-sidebar">
        <div className="hm-sidebar-brand">
          <img src={hmLogo} alt="HappyMed Logo" className="hm-brand-logo" />
        </div>

        <nav className="hm-nav">
          {navItems.map((item) => (
            <NavLink 
              key={item.name} 
              to={item.path} 
              end={item.exact}
              className={({ isActive }) => `hm-nav-link ${isActive ? 'active' : ''}`}
            >
              <div className="hm-nav-item-left">
                {item.icon}
                <span>{item.name}</span>
              </div>
              {item.dropdown && <span className="hm-chevron"><ChevronRightIcon /></span>}
            </NavLink>
          ))}
          
          {hasRole("ADMIN") && (
            <NavLink to="/audit-logs" className={({ isActive }) => `hm-nav-link ${isActive ? 'active' : ''}`}>
               <div className="hm-nav-item-left">
                 <ReportsIcon />
                 <span>Audit Logs</span>
               </div>
            </NavLink>
          )}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="hm-main">
        {/* Topbar */}
        <header className="hm-topbar">
          <div className="hm-topbar-left">
            <button className="hm-menu-btn"><MenuIcon /></button>
            <div className="hm-search-container">
              <SearchIcon />
              <input type="text" placeholder="Search" className="hm-search-input" />
            </div>
          </div>
          
          <div className="hm-topbar-right">
            <button className="hm-notification">
              <BellIcon />
              <span className="hm-notification-badge"></span>
            </button>
            
            <div className="hm-user-profile" onClick={logout} title="Click to logout">
              <div className="hm-user-avatar">
                {/* Fallback to SVG avatar if no image, resembling the profile pic */}
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="18" fill="#FDE68A"/>
                  <path d="M18 19C20.7614 19 23 16.7614 23 14C23 11.2386 20.7614 9 18 9C15.2386 9 13 11.2386 13 14C13 16.7614 15.2386 19 18 19Z" fill="#D97706"/>
                  <path d="M10.4216 26.683C10.7481 24.3722 13.9175 22.5 18 22.5C22.0825 22.5 25.2519 24.3722 25.5784 26.683C23.6358 28.756 20.9496 30 18 30C15.0504 30 12.3642 28.756 10.4216 26.683Z" fill="#D97706"/>
                </svg>
              </div>
              <div className="hm-user-info">
		        <span className="hm-user-name">{user?.username || "Guest"}</span>
		        <span className="hm-user-role">
                  {user?.roles && Array.isArray(user.roles) 
                    ? user.roles.join(", ") 
                    : "User"}
                </span>
              </div>
              <span className="hm-chevron" style={{ color: '#94a3b8' }}><ChevronDownIcon /></span>
            </div>
          </div>
        </header>
        
        <div className="hm-main-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

