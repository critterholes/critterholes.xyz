import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

const Layout: React.FC = () => {
  return (
    <div className="relative w-full">
      <main> 
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;