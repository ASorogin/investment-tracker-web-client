// src/components/dashboard/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useAuth } from '../../context/AuthContext';

export const DashboardLayout = () => {
  const { user } = useAuth();
  
  return (
    <div className="h-screen flex">
      <div className="flex-1">
        <Navbar userName={user?.name} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};