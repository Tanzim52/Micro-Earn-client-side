import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
const ProtectedRoutes = ({children}) => {
    const {user,loading} = useAuth();
    if(loading){
        return <span className="loading loading-bars loading-lg"></span>
    }
    if(user){
        return children;
    }
    return (
       <Navigate to="/login"></Navigate>
    );
};

export default ProtectedRoutes;