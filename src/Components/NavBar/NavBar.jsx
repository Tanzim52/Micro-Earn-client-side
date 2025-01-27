import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const NavOptions = <>
    <li><Link to='login'>Login</Link></li>
    <li><Link to='register'>Register</Link></li>
</>
const NavBar = () => {
    return (
        <>
            <div className="navbar bg-[#243E36] text-[#7CA982] md:px-6">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-[#fefadc] rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {NavOptions}
                        </ul>
                    </div>
                    <Link to='/' className="text-2xl font-bold tracking-wide"><i>&micro;</i>_Earn</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {NavOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to='https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Tanzim52' target='_blank' className="bg-emerald-800 text-[#fefadc] text-sm px-4 py-2 rounded-md flex flex-col items-center md:flex-row md:gap-1">
                        <FaGithub size={16} /><p> Join as Developer</p>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NavBar;