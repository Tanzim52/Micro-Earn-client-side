import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar';
import DashboardNav from '../components/Dashboard/DashboardNav';
import DashboardFooter from '../components/Dashboard/DashboardFooter';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const DashboardLayout = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const { data, isLoading } = useQuery({
        queryKey: ['coins', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    })
    if (isLoading) {
        return <span className="loading loading-bars loading-lg"></span>
    }
    return (
        <div className='max-w-screen-2xl dark:bg-gray-950 dark:text-white min-h-screen'>
            <DashboardNav user={user} data={data} />
            <div className='grid grid-cols-12'>
                <div className='col-span-2'>
                    <Sidebar data={data} />
                </div>
                <div className='md:col-span-10 col-span-12 md:p-10 p-0 min-h-screen'>
                    <Outlet />
                </div>
            </div>
        </div>

    );
};

export default DashboardLayout;
