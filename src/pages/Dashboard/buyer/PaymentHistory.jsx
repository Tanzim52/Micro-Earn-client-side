import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
          const res = await axiosSecure.get("/payment");
          return res.data;
        },
      });
    
    return (
        <div>
              <h1 className='text-4xl text-center font-semibold uppercase pt-10'>Payment History</h1>
            <div className="overflow-x-auto dark:text-white text-gray-700 p-6">
                <table className="table">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th className="dark:text-white text-gray-700"></th>
                            <th className="dark:text-white text-gray-700">TransitionId</th>
                            <th className="dark:text-white text-gray-700">Amount</th>
                            <th className="dark:text-white text-gray-700">TotalCoins</th>
                            <th className="dark:text-white text-gray-700">Email</th>
                            <th className="dark:text-white text-gray-700">Date</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {payments?.map((payment, index) => (
                            <tr key={payment._id} className="hover hover:text-gray-700">
                                <th>{index + 1}</th>
                                <td>{payment.paymentId}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.totalCoins}</td>
                                <td>{payment.email}</td>
                                <td>{payment.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;