import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Firebase/AuthContext";
const PrivateRoute = ({ children }) => {
  const { user,  } = useContext(AuthContext);
  const location = useLocation();



  // if not logged in, redirect to Register
  if (!user) {
    return <Navigate to="/Register" state={{ from: location }} replace />;
  }

  // if logged in, render the child component
  return children;
};

export default PrivateRoute;
