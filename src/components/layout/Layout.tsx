import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import '../../styles/components/_layout.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <main className="main-content">
        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
