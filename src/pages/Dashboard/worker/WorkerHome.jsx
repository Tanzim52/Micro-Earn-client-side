import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const WorkerHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: submissions = [] } = useQuery({
        queryKey: ["approved-submissions", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/approved-submissions/${user?.email}`);
            return res.data;
        },
    });
    const { data: workerStats = [] } = useQuery({
        queryKey: ["worker-stats", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/worker-stats/${user?.email}`);
            return res.data;
        },
    });

    return (
        <div className='md:text-center text-left '>
            <div className="stats w-full md:max-w-screen-md dark:bg-gray-900 bg-gray-800 text-white dark:text-white shadow md:m-10 my-10 rounded-none">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                    </div>
                    <div className="stat-title text-white uppercase">Count of</div>
                    <div className="stat-value text-white">{workerStats.totalSubmissionsCount}</div>
                    <div className="stat-desc text-white uppercase">All Submissions</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                    </div>
                    <div className="stat-title text-white uppercase">Total pending </div>
                    <div className="stat-value text-white">{workerStats.totalPendingCount}</div>
                    <div className="stat-desc text-white uppercase">submission</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                    </div>
                    <div className="stat-title text-white uppercase">Total Earning</div>
                    <div className="stat-value text-white">{workerStats.totalEarnings}</div>
                    <div className="stat-desc text-white uppercase">Coins</div>
                </div>


            </div>
            <div>
                <h1 className='md:text-4xl text-2xl text-center font-semibold uppercase pt-10'>Approved Submissions</h1>
                <div className="overflow-x-auto dark:text-white text-gray-700 p-6">
                    <table className="table">
                        {/* Table Head */}
                        <thead>
                            <tr>
                                <th className="dark:text-white text-gray-700"></th>
                                <th className="dark:text-white text-gray-700">Task Title</th>
                                <th className="dark:text-white text-gray-700">Payable Amount</th>
                                <th className="dark:text-white text-gray-700">Buyer Name</th>
                                <th className="dark:text-white text-gray-700">Status</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {submissions?.map((submission, index) => (
                                <tr key={submission._id} className="hover hover:text-gray-700">
                                    <th>{index + 1}</th>
                                    <td>{submission.task_title}</td>
                                    <td>{submission.payable_amount}</td>
                                    <td>{submission.buyer_name}</td>
                                    <td><button className='btn btn-warning rounded-3xl'>{submission.status}</button></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WorkerHome;