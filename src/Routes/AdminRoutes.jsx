import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin';

const AdminRoutes = ({children}) => {
    const {user,loading} = useAuth();
    const [isAdmin,isLoading] = useAdmin();
    const location = useLocation();
    if (loading || isLoading) {
        return <span className="loading loading-bars loading-lg"></span>
    }
    if (user && isAdmin) {
        return children;
    }

    return (
        <Navigate to="/login" state={{ from:location }}></Navigate>
    );
};

export default AdminRoutes;