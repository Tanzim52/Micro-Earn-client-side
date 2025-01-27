import { createBrowserRouter } from 'react-router-dom'
  ;
import Root from '../Root';
import Error from '../Error'
import Home from '../Components/Home/Home';
import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register';




export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path:'login',
        element:<Login></Login>
      },
      {
        path:'register',
        element:<Register></Register>
      }]
  }
]);