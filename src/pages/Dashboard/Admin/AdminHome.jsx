import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useCoins from '../../../Hooks/useCoins';
import { toast } from 'react-toastify';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: withdraws = [], refetch } = useQuery({
        queryKey: ["withdraws"],
        queryFn: async () => {
            const res = await axiosSecure.get('/withdraws');
            return res.data;
        },
    });
    
    const { data: adminStats = [] } = useQuery({
        queryKey: ["adminStats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-stats");
            return res.data;
        },
    });
    const handleApprovePayment = async (withdraw, status) => {
        const { _id, worker_email, withdrawal_coin } = withdraw;
        await axiosSecure.patch(`/update-withdrawal-status/${_id}`, { status })
        const res = await axiosSecure.patch(`/users/${worker_email}`, {
            withdrawal_coin: parseInt(withdrawal_coin),
        });
        
        if (res.data.modifiedCount > 0) {
            toast.success("Withdrawal request submitted successfully!");
            refetch();
        }

    };
    return (
        <div className='text-center'>
            <div className="stats dark:bg-gray-900 bg-gray-800 text-white dark:text-white shadow m-10 rounded-none">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                    </div>
                    <div className="stat-title text-white uppercase">Count of</div>
                    <div className="stat-value text-white">{adminStats.totalWorkers}</div>
                    <div className="stat-desc text-white uppercase">Total workers</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                    </div>
                    <div className="stat-title text-white uppercase">Count of </div>
                    <div className="stat-value text-white">{adminStats.totalBuyers}</div>
                    <div className="stat-desc text-white uppercase">Total Buyers</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                    </div>
                    <div className="stat-title text-white uppercase">Total Available</div>
                    <div className="stat-value text-white">{adminStats.totalAvailableCoinsData}</div>
                    <div className="stat-desc text-white uppercase">Coins</div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-secondary">
                    </div>
                    <div className="stat-title text-white uppercase">Total Payment</div>
                    <div className="stat-value text-white">{adminStats.totalPayment}</div>
                    <div className="stat-desc text-white uppercase">Coins</div>
                </div>


            </div>
            <div>
                <h1 className='text-4xl text-center font-semibold uppercase pt-10'>Withdraws Collection </h1>
                <div className="overflow-x-auto dark:text-white text-gray-700 p-6">
                    <table className="table">
                        {/* Table Head */}
                        <thead>
                            <tr>
                                <th className="dark:text-white text-gray-700"></th>
                                <th className="dark:text-white text-gray-700">Worker Name</th>
                                <th className="dark:text-white text-gray-700">Worker Email</th>
                                <th className="dark:text-white text-gray-700">Withdrawal coins</th>
                                <th className="dark:text-white text-gray-700">Status</th>
                                <th className="dark:text-white text-gray-700">Action</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {withdraws?.map((withdraws, index) => (
                                <tr key={withdraws._id} className="hover hover:text-gray-700">
                                    <th>{index + 1}</th>
                                    <td>{withdraws.worker_name}</td>
                                    <td>{withdraws.worker_email}</td>
                                    <td>{withdraws.withdrawal_coin}</td>
                                    <td><button className='btn btn-warning rounded-3xl'>{withdraws.status}</button></td>
                                    <td><button onClick={() => handleApprovePayment(withdraws, "approved")} className='btn btn-primary rounded-3xl'>Approve payment </button></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;