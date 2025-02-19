import React from 'react';
import { BsFillBagPlusFill } from 'react-icons/bs';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTasks, FaUsers } from 'react-icons/fa';

const Stats = () => {
    const axiosSecure = useAxiosSecure();
    const { data: stats = [] } = useQuery({
        queryKey: ["stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/home-stats");
            return res.data;
        },
    });

    return (
        <div className='max-w-screen-xl pt-20 mx-auto'>
            <div className='text-center mt-20 flex justify-center space-y-3 flex-col items-center'>
                <h3 className='md:text-4xl text-3xl text-center tracking-wider font-bold uppercase pt-10'>Stats</h3>
                <div className='w-24 h-2 rounded-lg bg-secondary'></div>
                <p className='text-gray-700 dark:text-white'>Here are our all stats</p>
            </div>
            <div className=' my-20 grid md:grid-cols-3 grid-cols-1 gap-4'>
                {/* card 1 */}
                <div className="card bg-gray-800 text-white">
                    <div className="card-body space-y-2 items-center text-center">
                        <p className='text-7xl text-secondary'><BsFillBagPlusFill /></p>
                        <p className='text-5xl font-bold'>{stats.totalTasks}</p>
                        <p className=' uppercase text-3xl font-semibold'>Total Tasks</p>
                    </div>
                </div>
                {/* card 2 */}
                <div className="card bg-gray-800 text-white">
                    <div className="card-body space-y-2 items-center text-center">
                        <p className='text-7xl text-secondary'><FaTasks /></p>
                        <p className='text-5xl font-bold'>{stats.totalSubmissions}</p>
                        <p className=' uppercase text-3xl font-semibold'>Total submissions</p>
                    </div>
                </div>
                {/* card 3 */}
                <div className="card bg-gray-800 text-white">
                    <div className="card-body space-y-2 items-center text-center">
                        <p className='text-7xl text-secondary'><FaUsers /></p>
                        <p className='text-5xl font-bold'>{stats.totalUsers}</p>
                        <p className=' uppercase text-3xl font-semibold'>Total Users</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;