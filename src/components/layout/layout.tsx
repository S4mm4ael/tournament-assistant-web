import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../footer';
import { Header } from '../header';

export function Layout() {
  return (
    <div className="layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
