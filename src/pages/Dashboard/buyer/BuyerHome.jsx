import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { toast } from 'react-toastify';
import useCoins from '../../../Hooks/useCoins'
const BuyerHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [coins,refetch] = useCoins()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    const { data: submissions = [],refetch:refetchSubmission } = useQuery({
        queryKey: ["pending-submissions", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pending-submissions/${user?.email}`);
            return res.data;
        },
    });
    const { data: buyerStats = [] } = useQuery({
        queryKey: ["buyer-stats", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/buyer-stats/${user?.email}`);
            return res.data;
        },
    });
    const handleSubmissions = (submission) => {
        setIsModalOpen(true);
        setSelectedSubmission(submission)
        
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSubmission(null);
    };
    const handleApprove = async(submission,status) => {
        const {_id,worker_email,payable_amount} = submission;
         await axiosSecure.patch(`/update-submission-status/${_id}`,{status});
        const res = await axiosSecure.patch(`/update-user-coins/${worker_email}`,{
            payable_amount:  parseInt(payable_amount)
        })
        if(res.data.modifiedCount > 0) {
            toast.success("Status updated successfully")
            refetch();
            refetchSubmission()
        }
    }
    const handleReject = async(submission,status) => {
        const {_id,task_id} = submission;
        await axiosSecure.patch(`/update-submission-status/${_id}`,{status});
        const res = await axiosSecure.patch(`/update-required-workers/${task_id}`);
        if(res.data.modifiedCount > 0) {
            toast.success("Status updated successfully")
            refetchSubmission()
        }
    }
    return (
        <div className='text-center'>
            <div className="stats dark:bg-gray-900 bg-gray-800 text-white dark:text-white shadow m-10 rounded-none">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                    </div>
                    <div className="stat-title text-white uppercase">Count of</div>
                    <div className="stat-value text-white">{buyerStats.totalTasksCount}</div>
                    <div className="stat-desc text-white uppercase">Total task</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                    </div>
                    <div className="stat-title text-white uppercase">Count of </div>
                    <div className="stat-value text-white">{buyerStats.totalPendingTasks}</div>
                    <div className="stat-desc text-white uppercase"> pending Task</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                    </div>
                    <div className="stat-title text-white uppercase">total payment paid</div>
                    <div className="stat-value text-white">{buyerStats.totalPaymentPaid}</div>
                    <div className="stat-desc text-white uppercase">Coins</div>
                </div>


            </div>
            <div>
                <h1 className='text-4xl text-center font-semibold uppercase pt-10'>Pending Submissions</h1>
                <div className="overflow-x-auto dark:text-white text-gray-700 p-6">
                    <table className="table">
                        {/* Table Head */}
                        <thead>
                            <tr>
                                <th className="dark:text-white text-gray-700"></th>
                                <th className="dark:text-white text-gray-700">Worker Name</th>
                                <th className="dark:text-white text-gray-700">Task Title</th>
                                <th className="dark:text-white text-gray-700">Payable Amount</th>
                                <th className="dark:text-white text-gray-700">Status</th>
                                <th className="dark:text-white text-gray-700">Action</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {submissions?.map((submission, index) => (
                                <tr key={submission._id} className="hover hover:text-gray-700">
                                    <th>{index + 1}</th>
                                    <td>{submission.worker_name}</td>
                                    <td>{submission.task_title}</td>
                                    <td>{submission.payable_amount}</td>
                                    <td><span className='text-secondary font-bold'>{submission.status}</span></td>
                                    <td>
                                        <button onClick={() => handleSubmissions(submission)} className='btn btn-info mr-2 rounded-3xl'>View Details</button>
                                        <button onClick={() => handleApprove(submission,"approved")} className='btn btn-primary mr-2 rounded-3xl'>Approve</button>
                                        <button onClick={() => handleReject(submission,"rejected")} className='btn btn-warning rounded-3xl'>Reject</button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && selectedSubmission && (
                <div className="modal modal-open fixed top-0 left-0 w-full h-full text-black bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="modal-box w-11/12 max-w-2xl bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-bold mb-4 text-gray-700">
                            submission details
                        </h2>
                        <div>
                            <div className='text-left'>
                                <p><span className='font-bold text-lg'>Task Title: </span>{selectedSubmission.task_title}</p>
                            </div>
                            <div className='text-left'>
                                <p><span className='font-bold text-lg'>Submission Details: </span>{selectedSubmission.submission_details}</p>
                            </div>
                            <div className='text-left'>
                                <p><span className='font-bold text-lg'>Payable Amount: </span>{selectedSubmission.payable_amount}</p>
                            </div>
                            <div className='text-left'>
                                <p><span className='font-bold text-lg'>Worker Email: </span>{selectedSubmission.worker_email}</p>
                            </div>
                            <div className='text-left'>
                                <p><span className='font-bold text-lg'>Worker Name: </span>{selectedSubmission.worker_name}</p>
                            </div>
                            <div className='text-left'>
                                <p><span className='font-bold text-lg'>Buyer Name: </span>{selectedSubmission.buyer_name}</p>
                            </div>
                            <div className='text-left'>
                                <p><span className='font-bold text-lg'>Buyer Email: </span>{selectedSubmission.buyer_email}</p>
                            </div>
                            <div className='text-left'>
                                <p><span className='font-bold text-lg'>Submission Date: </span>{moment(selectedSubmission.date).format('MMMM Do YYYY, h:mm:ss a')}</p>
                            </div>
                            <div className='text-left'>
                                <p className='font-bold text-lg'>Status: <span className='text-secondary'>{selectedSubmission.status} </span></p>
                            </div>
                            <div className='text-left'>
                                <p><span className='font-bold text-lg'>Task Image: </span><img src={selectedSubmission.task_image} className='w-full' alt="" /></p>
                            </div>
                        </div>
                        <div className="modal-action mt-4">
                            <button
                                onClick={handleCloseModal}
                                className="btn bg-secondary hover:bg-secondary text-white w-full"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyerHome;