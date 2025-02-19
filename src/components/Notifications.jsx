import React, { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa';
import useAuth from '../Hooks/useAuth';
import axios from 'axios';

const Notifications = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (user?.email) {
                const res = await axios.get(`/notifications/${user.email}`);
                setNotifications(res.data);
            }
        };
        fetchNotifications();
    }, [user]);

    // Hide popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative">
            <button className="text-2xl" onClick={() => setShowPopup(!showPopup)}>
                <FaBell />
            </button>
            {showPopup && (
                <div
                    ref={popupRef}
                    className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
                    <h2 className="text-lg font-bold mb-2">Notifications</h2>
                    <ul className="space-y-2">
                        {notifications?.length > 0 ? (
                            notifications?.map((notification, index) => (
                                <li key={index} className="border-b pb-2">
                                    <p>{notification.message}</p>
                                    <a
                                        href={notification.actionRoute}
                                        className="text-blue-500 hover:underline text-sm">
                                        Go to {notification.actionRoute}
                                    </a>
                                    <p className="text-xs text-gray-400">
                                        {new Date(notification.time).toLocaleString()}
                                    </p>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-500">No notifications available.</p>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Notifications;
