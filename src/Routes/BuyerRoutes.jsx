import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useBuyer from '../Hooks/useBuyer';

const BuyerRoutes = ({children}) => {
    const {user,loading} = useAuth();
    const [isBuyer,isLoading] = useBuyer();
    const location = useLocation();
    if (loading || isLoading) {
        return <span className="loading loading-bars loading-lg"></span>
    }
    if (user && isBuyer) {
        return children;
    }

    return (
        <Navigate to="/login" state={{ from:location }}></Navigate>
    );
};

export default BuyerRoutes;