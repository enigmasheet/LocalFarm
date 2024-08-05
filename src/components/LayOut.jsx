// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
