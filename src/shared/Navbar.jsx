import React, { useContext } from 'react';
import { ThemeContext } from '../provider/ThemeProvider';
import { FaMoon, FaSun, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../src/assets/μ-Earn_fav_icon_with_no_background-removebg-preview.png';
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import goldCoin from '../assets/dollar-coin.png';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    
    const { data, isLoading } = useQuery({
        queryKey: ['coins', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <span className="loading loading-bars loading-lg"></span>;
    }

    const emailFirstLetter = user?.email?.charAt(0)?.toUpperCase();

    const handleLogOut = async () => {
        await logOut();
        toast.success("You have logged out successfully");
        navigate('/');
    };

    const getDashboardLink = () => {
        switch (data?.user_role) {
            case "buyer":
                return '/dashboard/buyer/home';
            case "worker":
                return '/dashboard/worker/home';
            case "admin":
                return '/dashboard/admin/home';
            default:
                return '/dashboard'; // Fallback link
        }
    };

    return (
        <div className="navbar px-5 md:px-10 sticky top-0 z-50 w-full bg-[#3D405B] text-white">
            {/* Navbar Start */}
            <div className="navbar-start">
                {/* Mobile Dropdown Button */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <FaBars className="text-xl" />
                    </div>
                    <ul 
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-[#3D405B] rounded-box shadow-lg z-50 mt-3 w-52 p-2">
                        {
                            user ? (
                                <Link target="_blank" to="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Ariful544" 
                                    className="btn btn-secondary text-white w-full">
                                    Join as Developer
                                </Link>
                            ) : (
                                <>
                                    <Link to="/register" className="btn btn-primary text-white w-full mb-2">Register</Link>
                                    <Link to="/login" className="btn btn-warning text-white w-full mb-2">Login</Link>
                                    <Link target="_blank" to="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Ariful544" 
                                        className="btn btn-secondary text-white w-full">
                                        Join as Developer
                                    </Link>
                                </>
                            )
                        }
                    </ul>
                </div>
                {/* Logo */}
                <Link to="/" className="flex items-center text-2xl md:text-3xl font-bold tracking-wide">
                    <img className="w-12 h-12 md:w-14 md:h-14" src={logo} alt="μ-Earn Logo" />
                    <p className="ml-2">μ-Earn</p>
                </Link>
            </div>

            {/* Navbar Center (Hidden on Small Screens) */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-4">
                    {
                        user ? (
                            <Link target="_blank" to="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Ariful544" 
                                className="btn bg-secondary text-white">
                                Join as Developer
                            </Link>
                        ) : (
                            <>
                                <Link to="/register" className="btn btn-primary text-white">Register</Link>
                                <Link to="/login" className="btn btn-warning text-white">Login</Link>
                                <Link target="_blank" to="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Ariful544" 
                                    className="btn bg-secondary text-white">
                                    Join as Developer
                                </Link>
                            </>
                        )
                    }
                </ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end">
                {/* Theme Toggle */}
                <button className="text-2xl lg:text-3xl mr-4" onClick={toggleTheme}>
                    {theme === "light" ? <FaMoon className="text-zinc-200" /> : <FaSun className="text-orange-400" />}
                </button>

                {/* User Controls */}
                {
                    user ? (
                        <>
                            {/* Coin Balance */}
                            <button className="btn btn-primary text-lg text-white flex items-center mr-2">
                                <img className="w-6 h-6 mr-1" src={goldCoin} alt="Coin" />
                                <span>{data?.coins}</span>
                            </button>

                            {/* Profile Dropdown */}
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 md:w-12 rounded-full">
                                        {
                                            user.photoURL ? (
                                                <img referrerPolicy="no-referrer" alt={user.displayName} src={user.photoURL} />
                                            ) : (
                                                <p className="bg-red-500 w-full h-full text-white font-bold uppercase text-3xl flex items-center justify-center">
                                                    {emailFirstLetter}
                                                </p>
                                            )
                                        }
                                    </div>
                                </div>
                                <ul 
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-[#3D405B] text-white rounded-box shadow-lg mt-3 w-52 p-2">
                                    <li>
                                        <Link to={getDashboardLink()} className="justify-between">Dashboard</Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogOut}>Logout</button>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <div className="hidden md:flex space-x-2">
                            <Link to="/register" className="btn btn-primary text-white">Register</Link>
                            <Link to="/login" className="btn btn-warning text-white">Login</Link>
                            <Link target="_blank" to="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Ariful544" 
                                className="btn bg-secondary text-white">
                                Join as Developer
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;
