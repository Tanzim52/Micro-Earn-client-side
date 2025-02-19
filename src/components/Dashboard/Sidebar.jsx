import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../public/icons8-p-button-96.png';
import { IoHome } from 'react-icons/io5';
import { FaCoins, FaTasks, FaUsers } from 'react-icons/fa';
import { SiSubtitleedit } from 'react-icons/si';
import { PiHandWithdrawBold } from 'react-icons/pi';
import { MdMenuOpen, MdOutlineAddTask, MdPayment } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';
import { FaCircleUser } from 'react-icons/fa6';
import useAuth from '../../Hooks/useAuth';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

const Sidebar = ({ data }) => {
    const { user_role } = data;
    const { logOut } = useAuth();
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false); // State for toggling sidebar

    const handleLogOut = async () => {
        await logOut();
        toast.success("You have logged out successfully");
        navigate('/');
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {/* Mobile toggle button */}
            <button
                className="text-white bg-secondary p-2 fixed top-4 left-4 z-50 md:hidden"
                onClick={toggleSidebar}>
                {isOpen ? <IoMdClose className='text-3xl' /> : <MdMenuOpen className='text-3xl' />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed top-20 left-0 z-50 bg-slate-800 text-white h-full w-64 transform transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 md:w-72`}>
                <div className="pt-8 px-4">
                    <Link
                        to="/"
                        className="md:text-2xl text-2xl flex items-center font-bold text-white tracking-wider">
                        <img className="w-10 h-10" src={logo} alt="" /> PicciWorkers
                    </Link>
                </div>

                {/* Worker Links */}
                {user_role === 'worker' && (
                    <div className="mt-20 border-y-2 border-gray-500 py-10">
                        <Link
                            to="/dashboard/worker/home"
                            className="md:text-lg hover:text-secondary py-2 transition-all duration-75 hover:bg-gray-700 text-lg px-4 flex items-center gap-2 font-bold">
                            <IoHome /> Home
                        </Link>
                        <Link
                            to="/dashboard/tasklist"
                            className="md:text-lg hover:text-secondary py-2 transition-all duration-75 hover:bg-gray-700 text-lg px-4 flex items-center gap-2 font-bold">
                            <FaTasks /> TaskList
                        </Link>
                        <Link
                            to="/dashboard/my-submissions"
                            className="md:text-lg hover:text-secondary py-2 transition-all duration-75 hover:bg-gray-700 text-lg px-4 flex items-center gap-2 font-bold">
                            <SiSubtitleedit /> My Submissions
                        </Link>
                        <Link
                            to="/dashboard/withdrawals"
                            className="md:text-lg hover:text-secondary py-2 transition-all duration-75 hover:bg-gray-700 text-lg px-4 flex items-center gap-2 font-bold">
                            <PiHandWithdrawBold /> Withdrawals
                        </Link>
                    </div>
                )}

                {/* Buyer Links */}
                {user_role === 'buyer' && (
                    <div className="mt-20 border-y-2 border-gray-500 py-10">
                        <Link
                            to="/dashboard/buyer/home"
                            className="md:text-lg hover:text-secondary py-2 transition-all duration-75 hover:bg-gray-700 text-lg px-4 flex items-center gap-2 font-bold">
                            <IoHome /> Home
                        </Link>
                        <Link
                            to="/dashboard/add-tasks"
                            className="md:text-lg hover:text-secondary py-2 transition-all duration-75 hover:bg-gray-700 text-lg px-4 flex items-center gap-2 font-bold">
                            <MdOutlineAddTask /> Add New Tasks
                        </Link>
                        <Link
                            to="/dashboard/all-tasks"
                            className="md:text-lg hover:text-secondary py-2 transition-all duration-75 hover:bg-gray-700 text-lg px-4 flex items-center gap-2 font-bold">
                            <SiSubtitleedit /> My Tasks
                        </Link>
                        <Link
                            to="/purchase-coins"
                            className="md:text-lg hover:text-secondary py-2 transition-all duration-75 hover:bg-gray-700 text-lg px-4 flex items-center gap-2 font-bold">
                            <FaCoins /> Purchase Coin
                        </Link>
                        <Link
                            to="/dashboard/payment-history"
                            className="md:text-lg hover:text-secondary py-2 transition-all duration-75 hover:bg-gray-700 text-lg px-4 flex items-center gap-2 font-bold">
                            <MdPayment /> Payment History
                        </Link>
                    </div>
                )}

                {/* Admin Links */}
                {user_role === 'admin' && (
                    <div className="mt-20 border-y-2 border-gray-500 py-10">
                        <Link
                            to="/dashboard/admin/home"
                            className="md:text-lg hover:text-secondary py-2 transition-all duration-75 hover:bg-gray-700 text-lg px-4 flex items-center gap-2 font-bold">
                            <IoHome /> Home
                        </Link>
                        <Link
                            to="/dashboard/manage-users"
                            className="md:text-lg hover:text-secondary py-2 transition-all duration-75 hover:bg-gray-700 text-lg px-4 flex items-center gap-2 font-bold">
                            <FaUsers /> Manage Users
                        </Link>
                        <Link
                            to="/dashboard/manage-tasks"
                            className="md:text-lg hover:text-secondary py-2 transition-all duration-75 hover:bg-gray-700 text-lg px-4 flex items-center gap-2 font-bold">
                            <SiSubtitleedit /> Manage Task
                        </Link>
                    </div>
                )}

                {/* Profile and Logout */}
                <div className="mt-10">
                    <Link
                        to="/dashboard/profile"
                        className="md:text-lg hover:text-secondary py-2 transition-all duration-75 hover:bg-gray-700 text-lg px-4 flex items-center gap-2 font-bold">
                        <FaCircleUser /> Profile
                    </Link>
                    <button
                        onClick={handleLogOut}
                        className="md:text-lg w-full hover:text-secondary py-2 transition-all duration-75 hover:bg-gray-700 text-lg px-4 flex items-center gap-2 font-bold">
                        <CiLogout /> LogOut
                    </button>
                </div>
            </aside>

            
        </div>
    );
};

export default Sidebar;
