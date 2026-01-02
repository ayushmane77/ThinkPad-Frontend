// import { Navigate } from "react-router-dom";
// import { useAuth } from "../Context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, isCheckingAuth } = useAuth();

//   // 🔥 WAIT until auth check finishes
//   if (isCheckingAuth) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white">
//         Checking authentication...
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isCheckingAuth } = useAuth();

  if (isCheckingAuth) return null; // or spinner

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

