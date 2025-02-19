import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const MySubmissions = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const { data: submissions = [] } = useQuery({
        queryKey: ["my-submissions", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-submissions/${user?.email}`);
            return res.data;
        },
    });

    // Pagination Logic
    const totalPages = Math.ceil(submissions.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedSubmissions = submissions.slice(startIndex, startIndex + rowsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <h1 className='text-4xl text-center font-semibold uppercase pt-10'>My All Submissions</h1>
            <div className="overflow-x-auto dark:text-white text-gray-700 p-6">
                <table className="table">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th className="dark:text-white text-gray-700"></th>
                            <th className="dark:text-white text-gray-700">TaskID</th>
                            <th className="dark:text-white text-gray-700">Task Title</th>
                            <th className="dark:text-white text-gray-700">Submission Details</th>
                            <th className="dark:text-white text-gray-700">Status</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {paginatedSubmissions.map((submission, index) => (
                            <tr key={submission._id} className="hover hover:text-gray-700">
                                <th>{startIndex + index + 1}</th>
                                <td>{submission.task_id}</td>
                                <td>{submission.task_title}</td>
                                <td>{submission.submission_details.substr(0, 40)}</td>
                                <td><button className='btn btn-warning rounded-3xl'>{submission.status}</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* DaisyUI Pagination */}
                <div className="flex justify-center mt-4">
                    <div className="btn-group">
                        <button
                            className={`btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            «
                        </button>
                        {[...Array(totalPages).keys()].map((page) => (
                            <button
                                key={page}
                                className={`btn ${currentPage === page + 1 ? 'btn-active' : ''}`}
                                onClick={() => handlePageChange(page + 1)}
                            >
                                {page + 1}
                            </button>
                        ))}
                        <button
                            className={`btn ${currentPage === totalPages ? 'btn-disabled' : ''}`}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            »
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MySubmissions;
