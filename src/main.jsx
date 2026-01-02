import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";


import Root from "./Components/Root.Jsx";
import HomeLayOut from "./Components/HomeLayOut.Jsx";
import BrowseTask from "./Components/BrowseTask";
import AddTask from "./Components/AddTask";
import MyPostedTask from "./Components/MyPostedTask";
import ErrorElement from "./Components/ErrorElement";
import AuthProvider from "./Firebase/AuthProvider";
import Register from "./UserPage.jsx/Register";
import Login from "./UserPage.jsx/Login";
import PrivateRoute from "./Components/PrivateRoute";
import Update from "./Components/Update";
import TaskDetails from "./Components/TaskDetails";
import AdminLogin from "./Components/AdminLogin.jsx";
import AdminRoute from "./Components/AdminRoute";






const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <HomeLayOut />,
      },
      {
        
        path: "/BrowseTask",
        loader :()=>fetch('https://noooo-five.vercel.app/events'),
        element: <BrowseTask />,
      },
    
    {
  path: "/AddTask",
  element: (
    <AdminRoute>
      <AddTask />
    </AdminRoute>
  ),
},

{
  path: "/PostedTask",
  loader: () => fetch(""),
  element: (
    <PrivateRoute>
      <MyPostedTask />
    </PrivateRoute>
  ),
},


      {
        path:'/Register',
        element:<Register />
      },
      {
        path:'/Login',
        element:<Login />
      },
      {
  path: "/admin-login",
  element: <AdminLogin />,
},
      {
        
  path: "/update",

  element: <Update />
    
  
      },


    {
  path: '/taskDetails/:id',
  loader: async ({ params }) => {
    const res = await fetch(`https://noooo-five.vercel.app/events/${params.id}`);
    if (!res.ok) {
      throw new Response("Event not found", { status: res.status });
    }
    return res.json(); // returns { success: true, event }
  },
  element: <TaskDetails />
}

      
    ]}])


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
<RouterProvider router={router} />
    </AuthProvider>
    
  </StrictMode>
);
