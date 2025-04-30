// import { Navigate, Outlet } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useEffect } from "react";

// const ProtectedRoute = () => {
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       toast.warn("Please log in to continue.");
//     }
//   }, [token]);

//   return token ? <Outlet /> : <Navigate to="/" replace />;
// };

// export default ProtectedRoute;
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
 
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
 
  useEffect(() => {
    if (!token) {
      toast.warn("Please log in to continue.");
    }
  }, [token]);
 
  return token ? children : <Navigate to="/" replace />;
};
 
export default ProtectedRoute;