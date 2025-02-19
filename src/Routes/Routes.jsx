import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import DashboardLayout from "../layout/DashboardLayout";
import AddTasks from "../pages/Dashboard/buyer/AddTasks";
import PurchaseCoin from "../pages/PurchaseCoin/PurchaseCoin";
import AllMyTasks from "../pages/Dashboard/buyer/AllMyTasks";
import UpdateTask from "../pages/Dashboard/buyer/UpdateTask";
import PaymentHistory from "../pages/Dashboard/buyer/PaymentHistory";
import TaskDetails from "../pages/Home/JobDetails/TaskDetails";
import Tasklist from "../pages/Dashboard/worker/Tasklist";
import MySubmissions from "../pages/Dashboard/worker/MySubmissions";
import WithDrawals from "../pages/Dashboard/worker/WithDrawals";
import ManageUser from "../pages/Dashboard/Admin/ManageUser";
import ManageTask from "../pages/Dashboard/Admin/ManageTask";
import WorkerHome from "../pages/Dashboard/worker/WorkerHome";
import BuyerHome from "../pages/Dashboard/buyer/BuyerHome";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "../pages/Dashboard/Profile/Profile";
import AdminRoutes from "./AdminRoutes";
const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'register',
                element: <Register/>
            },
            {
                path: 'purchase-coins',
                element: <ProtectedRoutes><PurchaseCoin/></ProtectedRoutes>
                
            },
            {
                path:"task-details/:id",
                element: <ProtectedRoutes><TaskDetails/></ProtectedRoutes>,
                loader: ({params}) =>fetch(`${import.meta.env.VITE_BASE_URL}/task/${params.id}`)
            }
        ],
    },
    {
        path: '/dashboard',
        element: <ProtectedRoutes><DashboardLayout/></ProtectedRoutes>,
        children: [
            {
                path: 'admin/home',
                element: <AdminHome/>
            },
            {
                path: "manage-users",
                element: <ManageUser/>
            },
            {
                path: 'manage-tasks',
                element: <ManageTask/>
            },
            // buyer routes
            {
                path: 'buyer/home',
                element: <BuyerHome/>
            },
            {
                path: 'add-tasks',
                element: <AddTasks/>
            },
            {
                path: 'all-tasks',
                element: <AllMyTasks/>
            },
            {
                path: 'update-tasks/:id',
                element: <UpdateTask/>,
                loader: ({params}) => fetch(`${import.meta.env.VITE_BASE_URL}/task/${params.id}`)
            },
            {
                path: 'payment-history',
                element: <PaymentHistory/>
            },
            // worker routes
            {
                path: 'worker/home',
                element: <WorkerHome/>
            },
            ,{
                path: 'tasklist',
                element: <Tasklist/>
            },
            {
                path:"my-submissions",
                element: <MySubmissions/>
            },
            {
                path: 'withdrawals',
                element: <WithDrawals/>
            },
            {
                path: 'profile',
                element: <Profile/>
            }
        ]
    }
])

export default routes;