import React, { useContext } from 'react';
import { ThemeContext } from '../provider/ThemeProvider';
import { FaMoon, FaSun, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../public/icons8-p-button-96.png';
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
        enabled: !!user?.email, // Prevents fetching if no user is logged in
    });

    if (isLoading) {
        return <span className="loading loading-bars loading-lg"></span>;
    }

    const emailFirstLetter = user?.email?.charAt(0).toUpperCase();
    
    const handleLogOut = async () => {
        await logOut();
        toast.success("You have logged out successfully");
        navigate('/');
    };

    const getDashboardLink = () => {
        switch (data?.user_role) {
            case "buyer": return '/dashboard/buyer/home';
            case "worker": return '/dashboard/worker/home';
            case "admin": return '/dashboard/admin/home';
            default: return '/dashboard'; // Fallback link
        }
    };

    return (
        <div className="navbar px-4 md:px-[105px] sticky top-0 z-50 bg-base-100 dark:bg-gray-900 dark:text-white">
            {/* Navbar Start */}
            <div className="navbar-start">
                {/* Mobile Menu Button */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <FaBars className="text-xl" />
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-900 dark:text-white rounded-box z-50 mt-3 w-52 p-2 shadow-md">
                        {user ? (
                            <Link target="_blank" to="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Ariful544" 
                                className="btn w-full bg-secondary border border-secondary hover:bg-[#f98633] hover:border-[#f98633] text-white">
                                Join as Developer
                            </Link>
                        ) : (
                            <>
                                <Link to="/register" className="btn w-full btn-primary text-white">Register</Link>
                                <Link to="/login" className="btn w-full btn-warning text-white">Login</Link>
                                <Link target="_blank" to="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Ariful544" 
                                    className="btn w-full bg-secondary border border-secondary hover:bg-[#f98633] hover:border-[#f98633] text-white">
                                    Join as Developer
                                </Link>
                            </>
                        )}
                    </ul>
                </div>
                
                {/* Logo */}
                <Link to="/" className="flex items-center font-bold text-gray-800 dark:text-white tracking-wider">
                    <img className="w-12 md:w-14 h-12 md:h-14" src={logo} alt="Logo" />
                    <span className="ml-2 md:text-3xl text-2xl">PicciWorkers</span>
                </Link>
            </div>

            {/* Navbar End */}
            <div className="navbar-end flex items-center gap-4">
                {/* Dark Mode Toggle */}
                <button className="text-2xl hidden lg:block" onClick={toggleTheme}>
                    {theme === "light" ? <FaMoon /> : <FaSun className="text-orange-400" />}
                </button>

                {/* User Logged In */}
                {user ? (
                    <>
                        {/* Coins Button */}
                        <button className="btn btn-primary flex items-center text-lg text-white">
                            <img className="w-6 h-6" src={goldCoin} alt="Coins" />
                            <span>{data?.coins}</span>
                        </button>

                        {/* User Dropdown */}
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                    {user.photoURL ? (
                                        <img referrerPolicy="no-referrer" alt={user?.displayName} src={user?.photoURL} className="rounded-full" />
                                    ) : (
                                        <span className="text-white font-bold text-xl bg-red-500 p-2 rounded-full">{emailFirstLetter}</span>
                                    )}
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-900 dark:text-white rounded-box z-50 mt-3 w-52 p-2 shadow-md">
                                <li><Link to={getDashboardLink()}>Dashboard</Link></li>
                                <li><button onClick={handleLogOut}>Logout</button></li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <div className="hidden md:flex items-center gap-2">
                        <Link to="/register" className="btn btn-primary text-white">Register</Link>
                        <Link to="/login" className="btn btn-warning text-white">Login</Link>
                        <Link target="_blank" to="https://github.com/Tanzim52/Micro-Earn-client-side" 
                            className="btn bg-secondary border border-secondary hover:bg-[#f98633] hover:border-[#f98633] text-white">
                            Join as Developer
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
