import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import CheckOut from "../pages/checkOut/CheckOut";
import Checkings from "../pages/Checkings/Checkings";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      },
      {
        path: 'checkout/:id',
        element: <CheckOut></CheckOut>,
        loader: ({ params }) => fetch(`http://localhost:5000/services/${params.id}`)

      },
      {
        path:'checkings',
        element:<PrivateRoute><Checkings></Checkings></PrivateRoute>
      }
    ]
  },
]);

export default router;