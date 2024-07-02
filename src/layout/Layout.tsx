import React, { ReactNode } from 'react';
import Dash from '../components/Dash';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Dash />
      <main className="flex-1 p-4 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

export default Layout;
