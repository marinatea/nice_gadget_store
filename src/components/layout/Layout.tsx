import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const Layout: React.FC = () => {

  return (
    <>
      <Header>
      </Header>
        <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
