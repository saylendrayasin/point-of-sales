import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import { Outlet } from 'react-router-dom';

export function Component() {
  return (
    <Dashboard>
      <Outlet />
    </Dashboard>
  );
}
