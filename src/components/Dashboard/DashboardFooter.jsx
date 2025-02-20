import React from 'react';

const DashboardFooter = () => {
    return (
        <footer className="footer footer-center bg-slate-800 text-white p-5">
            <aside>
                <p className='text-base'>Copyright © {new Date().getFullYear()} - All right reserved by μ-Earn Industries Ltd</p>
            </aside>
        </footer>
    );
};

export default DashboardFooter;