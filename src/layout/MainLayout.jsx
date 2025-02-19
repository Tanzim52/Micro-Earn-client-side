import React from 'react';
import Navbar from '../shared/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../shared/Footer';
import ScrollToTop from '../components/ScrollToTop';

const MainLayout = () => {
    const location = useLocation();
    const NoHeaderFooter = location.pathname.includes('/login') || location.pathname.includes('/register')
    return (
        <div className='min-h-screen bg-base-100  dark:bg-gray-900 dark:text-white'>
            <ScrollToTop/>
           {NoHeaderFooter ||  <Navbar/>}
            <main className='min-h-screen bg-base-100 px-4 md:px-0 dark:bg-gray-900 dark:text-white'>
                <Outlet/>
            </main>
           {NoHeaderFooter ||  <Footer/> }
        </div>
    );
};

export default MainLayout;