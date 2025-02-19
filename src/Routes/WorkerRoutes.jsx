import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useWorker from '../Hooks/useWorker';

const WorkerRoutes = ({children}) => {
    const {user,loading} = useAuth();
    const [isWorker,isLoading] = useWorker();
    const location = useLocation();
    if (loading || isLoading) {
        return <span className="loading loading-bars loading-lg"></span>
    }
    if (user && isWorker) {
        return children;
    }

    return (
        <Navigate to="/login" state={{ from:location }}></Navigate>
    );
};

export default WorkerRoutes;