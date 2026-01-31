import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearAuth } from '../../services/storage';
import '../../styles/components/_sidebar.scss';

// Icons
const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const UserCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="8.5" cy="7" r="4"/>
    <polyline points="17 11 19 13 23 9"/>
  </svg>
);

const HandshakeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 17h-4l-3-3-3 3H6"/>
    <path d="M2 9h4l3 3 3-3h4"/>
    <path d="M17 9V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4"/>
    <path d="M17 19v2a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-2"/>
  </svg>
);

const SackDollarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const PiggyBankIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"/>
    <path d="M2 9v1c0 1.1.9 2 2 2h1"/>
  </svg>
);

const HandCoinsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/>
    <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/>
    <circle cx="16" cy="5" r="3"/>
  </svg>
);

const UserXIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="8.5" cy="7" r="4"/>
    <line x1="18" y1="8" x2="23" y2="13"/>
    <line x1="23" y1="8" x2="18" y2="13"/>
  </svg>
);

const ScaleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m8 2 4 4 4-4"/>
    <path d="M3 14h7"/>
    <path d="M10 6v8"/>
    <path d="M14 14h7"/>
    <path d="M14 14V6"/>
  </svg>
);

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M9 3v18"/>
    <path d="M3 9h6"/>
    <path d="M3 15h6"/>
    <path d="M15 3v18"/>
    <path d="M15 9h6"/>
    <path d="M15 15h6"/>
  </svg>
);

const CoinsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6"/>
    <path d="M18.09 10.37A6 6 0 1 1 10.34 18"/>
    <path d="M7 6h1v4"/>
    <path d="m16.71 13.88.7.71-2.82 2.82"/>
  </svg>
);

const ScrollIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/>
    <path d="M19 17V5a2 2 0 0 0-2-2H4"/>
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18"/>
    <path d="m19 9-5 5-4-4-3 3"/>
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
  </svg>
);

const ClipboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

// Logo
const LendsqrLogo = () => (
  <svg width="145" height="30" viewBox="0 0 145 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.69055 22.5H0V4.01562H2.69055V22.5Z" fill="#213F7D"/>
    <path d="M13.9539 22.8047C12.5664 22.8047 11.3242 22.5 10.2266 21.8906C9.13672 21.2734 8.28125 20.3984 7.66016 19.2656C7.03906 18.125 6.72852 16.7812 6.72852 15.2344C6.72852 13.6797 7.04297 12.332 7.67188 11.1914C8.30859 10.0508 9.17578 9.17188 10.2734 8.55469C11.3711 7.9375 12.6133 7.62891 14 7.62891C15.3867 7.62891 16.6289 7.9375 17.7266 8.55469C18.8242 9.17188 19.6875 10.0508 20.3164 11.1914C20.9531 12.332 21.2715 13.6797 21.2715 15.2344C21.2715 16.7891 20.9492 18.1367 20.3047 19.2773C19.6602 20.418 18.7852 21.293 17.6797 21.9023C16.5742 22.5039 15.332 22.8047 13.9539 22.8047Z" fill="#213F7D"/>
    <path d="M32.875 22.5L29.3594 17.3203L26.0234 22.5H23.0625L28.0234 15.0586L23.2617 7.92969H26.2227L29.5586 12.8906L32.7695 7.92969H35.6367L30.8164 14.9414L35.8594 22.5H32.875Z" fill="#213F7D"/>
    <path d="M58.5 22.5H55.8094V4.01562H58.5V22.5Z" fill="#39CDCC"/>
    <path d="M69.4586 22.8047C68.0711 22.8047 66.8289 22.5 65.7312 21.8906C64.6414 21.2734 63.7859 20.3984 63.1648 19.2656C62.5437 18.125 62.2332 16.7812 62.2332 15.2344C62.2332 13.6797 62.5477 12.332 63.1766 11.1914C63.8133 10.0508 64.6805 9.17188 65.7781 8.55469C66.8758 7.9375 68.118 7.62891 69.5047 7.62891C70.8914 7.62891 72.1336 7.9375 73.2312 8.55469C74.3289 9.17188 75.1922 10.0508 75.8211 11.1914C76.4578 12.332 76.7762 13.6797 76.7762 15.2344C76.7762 16.7891 76.4539 18.1367 75.8094 19.2773C75.1648 20.418 74.2898 21.293 73.1844 21.9023C72.0789 22.5039 70.8367 22.8047 69.4586 22.8047Z" fill="#39CDCC"/>
    <path d="M88.3797 22.5L84.8641 17.3203L81.5281 22.5H78.5672L83.5281 15.0586L78.7664 7.92969H81.7273L85.0633 12.8906L88.2742 7.92969H91.1414L86.3211 14.9414L91.3641 22.5H88.3797Z" fill="#39CDCC"/>
    <path d="M37.4844 7.92969H40.1289V12.5039C40.6289 11.1797 41.4102 10.1328 42.4727 9.36328C43.543 8.58594 44.7617 8.17188 46.1289 8.12109V10.6875H45.5781C44.0547 10.6875 42.7695 11.1953 41.7227 12.2109C40.6758 13.2266 40.1523 14.7266 40.1523 16.7109V22.5H37.4844V7.92969Z" fill="#213F7D"/>
    <path d="M93.6641 7.92969H96.3086V12.5039C96.8086 11.1797 97.5898 10.1328 98.6523 9.36328C99.7227 8.58594 100.941 8.17188 102.309 8.12109V10.6875H101.758C100.234 10.6875 98.9492 11.1953 97.9023 12.2109C96.8555 13.2266 96.332 14.7266 96.332 16.7109V22.5H93.6641V7.92969Z" fill="#39CDCC"/>
    <path d="M47.4258 22.5V7.92969H50.0703V22.5H47.4258Z" fill="#213F7D"/>
    <path d="M103.605 22.5V7.92969H106.25V22.5H103.605Z" fill="#39CDCC"/>
    <path d="M52.5625 22.5V7.92969H55.207V10.6523C55.6992 9.69531 56.4297 8.93359 57.3984 8.36719C58.375 7.79297 59.5156 7.50586 60.8203 7.50586C62.4609 7.50586 63.7852 7.99219 64.793 8.96484C65.8086 9.92969 66.3164 11.3516 66.3164 13.2305V22.5H63.6484V13.6992C63.6484 12.4102 63.3379 11.4375 62.7168 10.7812C62.0957 10.125 61.2324 9.79688 60.127 9.79688C58.8535 9.79688 57.8262 10.2148 57.0449 11.0508C56.2637 11.8867 55.873 13.0273 55.873 14.4727V22.5H52.5625Z" fill="#213F7D"/>
    <path d="M108.742 22.5V7.92969H111.387V10.6523C111.879 9.69531 112.609 8.93359 113.578 8.36719C114.555 7.79297 115.695 7.50586 117 7.50586C118.641 7.50586 119.965 7.99219 120.973 8.96484C121.988 9.92969 122.496 11.3516 122.496 13.2305V22.5H119.828V13.6992C119.828 12.4102 119.518 11.4375 118.896 10.7812C118.275 10.125 117.412 9.79688 116.307 9.79688C115.033 9.79688 114.006 10.2148 113.225 11.0508C112.443 11.8867 112.053 13.0273 112.053 14.4727V22.5H108.742Z" fill="#39CDCC"/>
    <path d="M129.039 22.8047C127.652 22.8047 126.41 22.5 125.312 21.8906C124.223 21.2734 123.367 20.3984 122.746 19.2656C122.125 18.125 121.814 16.7812 121.814 15.2344C121.814 13.6797 122.129 12.332 122.758 11.1914C123.395 10.0508 124.262 9.17188 125.359 8.55469C126.457 7.9375 127.699 7.62891 129.086 7.62891C130.473 7.62891 131.715 7.9375 132.812 8.55469C133.91 9.17188 134.773 10.0508 135.402 11.1914C136.039 12.332 136.357 13.6797 136.357 15.2344C136.357 16.7891 136.035 18.1367 135.391 19.2773C134.746 20.418 133.871 21.293 132.766 21.9023C131.66 22.5039 130.418 22.8047 129.039 22.8047Z" fill="#39CDCC"/>
    <path d="M145 22.5H142.332V4.01562H145V22.5Z" fill="#39CDCC"/>
  </svg>
);

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const navSections = [
    {
      title: 'CUSTOMERS',
      items: [
        { label: 'Users', icon: <UsersIcon />, path: '/users' },
        { label: 'Guarantors', icon: <UserCheckIcon />, path: '/guarantors' },
        { label: 'Loans', icon: <SackDollarIcon />, path: '/loans' },
        { label: 'Decision Models', icon: <HandshakeIcon />, path: '/decision-models' },
        { label: 'Savings', icon: <PiggyBankIcon />, path: '/savings' },
        { label: 'Loan Requests', icon: <HandCoinsIcon />, path: '/loan-requests' },
        { label: 'Whitelist', icon: <UserCheckIcon />, path: '/whitelist' },
        { label: 'Karma', icon: <UserXIcon />, path: '/karma' },
      ],
    },
    {
      title: 'BUSINESSES',
      items: [
        { label: 'Organization', icon: <BuildingIcon />, path: '/organization' },
        { label: 'Loan Products', icon: <HandCoinsIcon />, path: '/loan-products' },
        { label: 'Savings Products', icon: <BuildingIcon />, path: '/savings-products' },
        { label: 'Fees and Charges', icon: <CoinsIcon />, path: '/fees' },
        { label: 'Transactions', icon: <ChartIcon />, path: '/transactions' },
        { label: 'Services', icon: <SettingsIcon />, path: '/services' },
        { label: 'Service Account', icon: <UsersIcon />, path: '/service-account' },
        { label: 'Settlements', icon: <ScrollIcon />, path: '/settlements' },
        { label: 'Reports', icon: <ChartIcon />, path: '/reports' },
      ],
    },
    {
      title: 'SETTINGS',
      items: [
        { label: 'Preferences', icon: <ScaleIcon />, path: '/preferences' },
        { label: 'Fees and Pricing', icon: <ClipboardIcon />, path: '/fees-pricing' },
        { label: 'Audit Logs', icon: <ClipboardIcon />, path: '/audit-logs' },
        { label: 'Systems Messages', icon: <SettingsIcon />, path: '/system-messages' },
      ],
    },
  ];

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <LendsqrLogo />
        </div>

        <div className="sidebar-content">
          <div className="org-selector">
            <BriefcaseIcon />
            <span>Switch Organization</span>
            <ChevronDownIcon />
          </div>

          <a href="/dashboard" className={`dashboard-link ${isActive('/dashboard') ? 'active' : ''}`}>
            <HomeIcon />
            <span>Dashboard</span>
          </a>

          {navSections.map((section, index) => (
            <nav className="nav-section" key={index}>
              <div className="section-title">{section.title}</div>
              {section.items.map((item, itemIndex) => (
                <a
                  key={itemIndex}
                  href={item.path}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                    onClose();
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="sidebar-footer">
          <button className="logout-link" onClick={handleLogout}>
            <LogoutIcon />
            <span>Logout</span>
          </button>
          <div className="version">v1.2.0</div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
