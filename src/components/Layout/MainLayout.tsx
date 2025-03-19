
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navigation/Navbar';
import BuddyWrapper from '../Buddy/BuddyWrapper';

const MainLayout = () => {
  return (
    <BuddyWrapper>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </BuddyWrapper>
  );
};

export default MainLayout;
