import React, { useContext } from 'react';
import { ThemeContext } from '../../provider/ThemeProvider';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import goldCoin from '../../assets/dollar-coin.png'
import { IoNotifications } from 'react-icons/io5';
const DashboardNav = ({user,data}) => {
    const emailFirstLetter = user?.email.charAt(0).toUpperCase();
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <div className="navbar py-4 sticky top-0 z-50 bg-slate-800 text-white">
            <div className="navbar-start ">
              
            </div>
            <div className="navbar-end">
                <button className='text-3xl hidden lg:block mr-4' onClick={toggleTheme}>
                    {theme === "light" ? <FaMoon /> : <FaSun className='text-orange-400' />}
                </button>
                <button className='text-3xl mr-4 text-secondary'><IoNotifications /></button>
                {
                    user ? <>
                        <button className="btn mr-2 btn-primary text-lg text-white"><img className='w-6 h-6' src={goldCoin} /><span>{data?.coins}</span></button>
                        <div className='mx-3'>
                            <h3 className='font-semibold text-lg'>{data?.name}</h3>
                            <p className='text-gray-300'>{data?.user_role}</p>
                        </div>
                        <div className="dropdown dropdown-end mr-2">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-20 rounded-full">
                                    {
                                        user.photoURL !== null ? <>
                                            <img referrerPolicy="no-referrer"
                                                alt={user?.displayName}
                                                src={user?.photoURL} />

                                        </> :
                                            <>
                                                <p className='bg-red-500 w-full h-full text-white font-bold uppercase text-3xl'>{emailFirstLetter}</p>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                        : ""
                }


            </div>
        </div>
    );
};

export default DashboardNav;