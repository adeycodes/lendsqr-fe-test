import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearAuth } from '../../services/storage';
import '../../styles/components/_sidebar.scss';

// Icons
const BriefcaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.4" d="M10 9H16V13.5C16 14.3 15.3 15 14.5 15H1.5C0.7 15 0 14.3 0 13.5V9H6V10.5C6 10.6326 6.05268 10.7598 6.14645 10.8536C6.24021 10.9473 6.36739 11 6.5 11H9.5C9.63261 11 9.75979 10.9473 9.85355 10.8536C9.94732 10.7598 10 10.6326 10 10.5V9Z" fill="#213F7D" />
    <path d="M14.5 4H12V2.5C12 1.7 11.3 1 10.5 1H5.5C4.7 1 4 1.7 4 2.5V4H1.5C0.7 4 0 4.7 0 5.5V8H16V5.5C16 4.7 15.3 4 14.5 4ZM10 4H6V3H10V4Z" fill="#213F7D" />
  </svg>

);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const HomeIcon = () => (
  <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_159793_345)">
      <path opacity="0.4" d="M9.33341 12.8775V10.2222C9.33341 10.1043 9.28659 9.99127 9.20324 9.90792C9.11989 9.82457 9.00684 9.77774 8.88897 9.77774H7.11119C6.99332 9.77774 6.88027 9.82457 6.79692 9.90792C6.71357 9.99127 6.66675 10.1043 6.66675 10.2222V12.8808C6.66675 12.9983 6.62023 13.111 6.53736 13.1943C6.45449 13.2776 6.34201 13.3247 6.22453 13.3252L3.11119 13.3333C2.99332 13.3333 2.88027 13.2865 2.79692 13.2031C2.71357 13.1198 2.66675 13.0067 2.66675 12.8889V8.33497L7.78869 4.11691C7.84889 4.06839 7.92388 4.04193 8.00119 4.04193C8.07851 4.04193 8.1535 4.06839 8.21369 4.11691L13.3334 8.3333V12.8889C13.3334 13.0067 13.2866 13.1198 13.2032 13.2031C13.1199 13.2865 13.0068 13.3333 12.889 13.3333L9.77786 13.3247C9.71926 13.3247 9.66124 13.3131 9.60713 13.2906C9.55303 13.2681 9.50391 13.2351 9.4626 13.1935C9.4213 13.152 9.38862 13.1026 9.36645 13.0484C9.34427 12.9942 9.33305 12.9361 9.33341 12.8775Z" fill="#213F7D" />
      <path d="M15.9255 7.45416L15.2172 8.31528C15.1894 8.34913 15.1552 8.37717 15.1166 8.3978C15.0779 8.41843 15.0356 8.43124 14.992 8.4355C14.9484 8.43975 14.9044 8.43537 14.8625 8.42261C14.8206 8.40985 14.7816 8.38895 14.7478 8.36111L8.21362 2.97805C8.15342 2.92953 8.07843 2.90307 8.00112 2.90307C7.9238 2.90307 7.84882 2.92953 7.78862 2.97805L1.25475 8.36111C1.18646 8.41724 1.09866 8.44395 1.01068 8.43536C0.922692 8.42676 0.841724 8.38357 0.785587 8.31528L0.0772555 7.45416C0.020991 7.38601 -0.00590471 7.2983 0.0024817 7.21032C0.0108681 7.12234 0.0538501 7.04129 0.121978 6.985L7.15251 1.19444C7.39117 0.998046 7.69065 0.890667 7.99973 0.890667C8.30881 0.890667 8.60829 0.998046 8.84695 1.19444L11.3333 3.23916V1.22222C11.3333 1.13381 11.3684 1.04903 11.431 0.986517C11.4935 0.924004 11.5783 0.888885 11.6667 0.888885H13.2222C13.3106 0.888885 13.3954 0.924004 13.4579 0.986517C13.5204 1.04903 13.5555 1.13381 13.5555 1.22222V5.06972L15.8778 6.98389C15.9119 7.01156 15.9402 7.0457 15.9611 7.08434C15.9819 7.12299 15.995 7.16539 15.9994 7.20909C16.0039 7.25279 15.9996 7.29694 15.9869 7.339C15.9743 7.38106 15.9534 7.4202 15.9255 7.45416Z" fill="#213F7D" />
    </g>
    <defs>
      <clipPath id="clip0_159793_345">
        <rect width="16" height="14.2222" fill="white" />
      </clipPath>
    </defs>
  </svg>

);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const UserCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>
);

const HandshakeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 17h-4l-3-3-3 3H6" />
    <path d="M2 9h4l3 3 3-3h4" />
    <path d="M17 9V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4" />
    <path d="M17 19v2a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-2" />
  </svg>
);

const SackDollarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const PiggyBankIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
    <path d="M2 9v1c0 1.1.9 2 2 2h1" />
  </svg>
);

const HandCoinsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
    <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
    <circle cx="16" cy="5" r="3" />
  </svg>
);

const UserXIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="18" y1="8" x2="23" y2="13" />
    <line x1="23" y1="8" x2="18" y2="13" />
  </svg>
);

const ScaleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m8 2 4 4 4-4" />
    <path d="M3 14h7" />
    <path d="M10 6v8" />
    <path d="M14 14h7" />
    <path d="M14 14V6" />
  </svg>
);

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18" />
    <path d="M3 9h6" />
    <path d="M3 15h6" />
    <path d="M15 3v18" />
    <path d="M15 9h6" />
    <path d="M15 15h6" />
  </svg>
);

const CoinsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6" />
    <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
    <path d="M7 6h1v4" />
    <path d="m16.71 13.88.7.71-2.82 2.82" />
  </svg>
);

const ScrollIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
    <path d="M19 17V5a2 2 0 0 0-2-2H4" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
  </svg>
);

const ClipboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

// Logo
const LendsqrLogo = () => (
  <svg width="145" height="30" viewBox="0 0 145 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 2.22118C0 1.76087 0.369365 1.38771 0.825 1.38771H3.3C3.75564 1.38771 4.125 1.76087 4.125 2.22118V17.2235C4.125 17.6838 4.49437 18.057 4.95 18.057H15.675C16.1306 18.057 16.5 17.6838 16.5 17.2235V14.7231C16.5 14.2628 16.1306 13.8897 15.675 13.8897H10.725C9.3581 13.8897 8.25 12.7702 8.25 11.3893V3.8881C8.25 2.50718 9.3581 1.38771 10.725 1.38771H18.15C19.5169 1.38771 20.625 2.50718 20.625 3.8881V19.7239C20.625 21.1049 19.5169 22.2243 18.15 22.2243H2.475C1.1081 22.2243 0 21.1049 0 19.7239V2.22118ZM16.5 6.3885C16.5 5.92819 16.1306 5.55503 15.675 5.55503H12.375V8.88889C12.375 9.3492 12.7444 9.72236 13.2 9.72236H16.5V6.3885Z" fill="url(#paint0_linear_159793_582)" />
    <path d="M29.4375 0V23.1713H33.4078V0H29.4375Z" fill="#213F7D" />
    <path d="M52.9489 16.442C53.5724 9.71271 50.1927 6.33149 44.7786 6.33149C39.5286 6.33149 36.1818 9.9116 36.1818 14.884C36.1818 20.1215 39.4958 23.6022 45.0739 23.6022C47.5349 23.6022 50.3239 22.7403 52.0302 20.9503L49.4708 18.3978C48.5521 19.3591 46.6161 19.9227 45.1396 19.9227C42.3177 19.9227 40.5786 18.4641 40.3161 16.442H52.9489ZM40.3818 13.0939C40.9724 10.9724 42.7443 9.9116 44.9099 9.9116C47.2068 9.9116 48.8474 10.9724 49.1099 13.0939H40.3818Z" fill="#213F7D" />
    <path d="M71.9476 23.1713V14.5856C71.9476 9.44751 68.8961 6.56354 65.0898 6.56354C63.0554 6.56354 61.4148 7.39227 59.7742 9.01657L59.5117 6.79558H55.9351V23.1713H59.9054V14.8177C59.9054 12.3315 61.5789 10.2431 64.0398 10.2431C66.5992 10.2431 67.9445 12.1326 67.9445 14.6188V23.1713H71.9476Z" fill="#213F7D" />
    <path d="M83.23 10.2099C85.7566 10.2099 87.9222 12.1326 87.9222 14.9834C87.9222 17.9337 85.7566 19.7901 83.23 19.7901C80.6706 19.7901 78.6363 17.8343 78.6363 14.9834C78.6363 12.0331 80.6706 10.2099 83.23 10.2099ZM88.1847 0V9.04972C87.2331 7.35912 84.5753 6.43094 82.8691 6.43094C78.1441 6.43094 74.6331 9.34807 74.6331 14.9834C74.6331 20.3536 78.2097 23.5359 82.9675 23.5359C84.9362 23.5359 86.9378 22.8729 88.1847 20.9171L88.4472 23.1713H92.1878V0H88.1847Z" fill="#213F7D" />
    <path d="M108.468 8.51934C106.598 6.86188 104.695 6.36464 102.168 6.36464C99.2151 6.36464 95.3432 7.69061 95.3432 11.4696C95.3432 15.1823 98.9854 16.3094 102.037 16.5414C104.334 16.674 105.253 17.1381 105.253 18.2652C105.253 19.4586 103.842 20.2541 102.332 20.221C100.528 20.1878 97.9026 19.2265 96.7541 17.9337L94.7854 20.8177C97.1479 23.3039 99.7073 23.7348 102.267 23.7348C106.893 23.7348 109.223 21.2486 109.223 18.3646C109.223 14.0221 105.351 13.326 102.299 13.1271C100.232 12.9945 99.2807 12.3978 99.2807 11.337C99.2807 10.3094 100.331 9.71271 102.234 9.71271C103.776 9.71271 105.089 10.0773 106.237 11.1713L108.468 8.51934Z" fill="#213F7D" />
    <path d="M119.599 19.6575C116.875 19.6575 115.005 17.5691 115.005 15.0166C115.005 12.4641 116.711 10.3757 119.599 10.3757C122.486 10.3757 124.192 12.4641 124.192 15.0166C124.192 17.5691 122.322 19.6575 119.599 19.6575ZM128.556 30V6.82873H124.816L124.553 9.08287C123.306 7.25967 121.141 6.46409 119.303 6.46409C114.316 6.46409 111.002 10.2099 111.002 15.0166C111.002 19.7901 113.988 23.5691 119.172 23.5691C120.878 23.5691 123.405 23.0387 124.553 21.2486V30H128.556Z" fill="#213F7D" />
    <path d="M132.073 6.82873V23.1713H136.076V14.5525C136.076 11.5359 138.012 10.4088 140.112 10.4088C141.424 10.4088 142.179 10.7735 142.999 11.4696L144.804 7.9558C143.918 7.06077 142.31 6.39779 140.637 6.39779C138.996 6.39779 137.323 6.69613 136.076 8.71823L135.781 6.82873H132.073Z" fill="#213F7D" />
    <defs>
      <linearGradient id="paint0_linear_159793_582" x1="-1.55986e-06" y1="32.4343" x2="21.8776" y2="-3.51985" gradientUnits="userSpaceOnUse">
        <stop stop-color="#213F7D" />
        <stop offset="1" stop-color="#39CDCC" />
      </linearGradient>
    </defs>
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
