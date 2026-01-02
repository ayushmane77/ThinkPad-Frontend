// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [token, setToken] = useState(null);
//   const [isCheckingAuth, setIsCheckingAuth] = useState(true); // 🔥 NEW

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");

//     if (storedToken) {
//       setIsAuthenticated(true);
//       setToken(storedToken);
//     }

//     setIsCheckingAuth(false); // 🔥 auth check done
//   }, []);

//   const login = (jwtToken) => {
//     localStorage.setItem("token", jwtToken);
//     setToken(jwtToken);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         token,
//         isCheckingAuth, // 🔥 expose this
//         login,
//         logout
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



import { createContext, useContext, useEffect, useState } from "react";
import { isTokenExpired } from "../utils/isTokenExpired";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken || isTokenExpired(storedToken)) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setToken(null);
    } else {
      setIsAuthenticated(true);
      setToken(storedToken);
    }

    setIsCheckingAuth(false);
  }, []);

  const login = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        login,
        logout,
        isCheckingAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

