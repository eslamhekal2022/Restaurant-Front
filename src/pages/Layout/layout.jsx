import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { useDispatch } from 'react-redux';
import { setUserRedux } from '../../Redux/user.js';
import ScrollToTop from '../ScrollTop/ScrollTop.jsx';
import Footer from '../Footer/Footer.jsx';
import './layout.css'; // أنشئ ملف CSS لو مش موجود

export default function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUserRedux(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return (
    <div className="layout-wrapper">
      <ScrollToTop />
      <Navbar />
      <main className="layout-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
