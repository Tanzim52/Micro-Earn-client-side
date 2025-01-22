import { createBrowserRouter } from 'react-router-dom'
;
import Root from '../Root';
import Error from '../Error'
import Home from '../Components/Home/Home';




export const router= createBrowserRouter([
    {
      path: '/',
      element: <Root/>,
      errorElement:<Error></Error>,
      children: [
        {
          path: '/',
          element:<Home></Home>
        }]
    }
    ]);