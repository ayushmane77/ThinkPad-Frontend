

// import React, { useState } from "react";
// import { Menu, X } from "lucide-react";

// import { useAuth } from "../Context/AuthContext";
// import { useLocation, Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleMenu = () => setIsOpen(!isOpen);
//   const location = useLocation();
//   const isHome = location.pathname === "/";
//   const isLoginPage = location.pathname === "/login";
//   const isRegisterPage = location.pathname === "/register";
//   const { isAuthenticated, logout } = useAuth();
//   const isNotesPage = location.pathname.startsWith("/notes");
//   const navigate = useNavigate();
//   const menuItems = [
//     { label: "Services", id: "Services" },
//     { label: "Support", id: "Support" },
//     { label: "Contact", id: "Contact" }
//   ];

//   console.log("Navbar auth state:", isAuthenticated);

//   const scrollToSection = (id) => {
//     const section = document.getElementById(id);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth", block: "start" });
//       setIsOpen(false); // close mobile menu after click
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-black">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

//         {/* Logo */}
//         <div className="flex items-center gap-2 cursor-pointer">
//           <img
//             src="/download.jpg"
//             alt="logo"
//             className="w-8 h-8 rounded-full"
//           />
//           <Link to={"/"}>
//             <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//               ThinkPad
//             </span>
//           </Link>

//         </div>

//         {/* Desktop Menu */}


//         <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300 items-center">

//           {/* 🌐 LANDING PAGE (logged out) */}
//           {!isAuthenticated && isHome && (
//             <>
//               <span onClick={() => scrollToSection("Services")} className="cursor-pointer hover:text-white">
//                 Services
//               </span>
//               <span onClick={() => scrollToSection("Support")} className="cursor-pointer hover:text-white">
//                 Support
//               </span>
//               <span onClick={() => scrollToSection("Contact")} className="cursor-pointer hover:text-white">
//                 Contact
//               </span>

//               <Link to="/login" className="hover:text-white">
//                 Sign In
//               </Link>
//             </>
//           )}

//           {/* 🔑 LOGIN PAGE */}
//           {!isAuthenticated && isLoginPage && (
//             <Link to="/register" className="hover:text-white">
//               Get Started
//             </Link>
//           )}

//           {/* 📝 REGISTER PAGE */}
//           {!isAuthenticated && isRegisterPage && (
//             <Link to="/login" className="hover:text-white">
//               Sign In
//             </Link>
//           )}

//           {/* 🔐 AUTHENTICATED USER */}
//           {isAuthenticated && (
//             <>
//               <button
//                 onClick={() => navigate("/createnote")}
//                 className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition"
//               >
//                 + New Note
//               </button>

//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 rounded-full bg-red-500/80 hover:bg-red-500 text-white transition"
//               >
//                 Logout
//               </button>
//             </>
//           )}

//         </div>

//         {!isAuthenticated && isHome && (
//           <Link
//             to="/register"
//             className="hidden md:block px-5 py-2 rounded-full text-sm font-semibold
//                bg-gradient-to-r from-purple-500 to-pink-500
//                hover:opacity-90 transition text-white"
//           >
//             Get Started
//           </Link>
//         )}




//         {/* Mobile Icon */}
//         <button onClick={toggleMenu} className="md:hidden text-gray-300">
//           {isOpen ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-gray-300">
//           {menuItems.map(item => (
//             <Link
//               key={item.id}
//               to="/"
//               onClick={() => setIsOpen(false)}
//               className="py-2 border-b border-white/10 hover:text-white"
//             >
//               {item.label}
//             </Link>
//           ))}

//           <Link
//             to="/register"
//             onClick={() => setIsOpen(false)}
//             className="mt-3 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-center"
//           >
//             Get Started
//           </Link>
//         </div>
//       )}

//     </nav>
//   );
// };

// export default Navbar;




import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  const toggleMenu = () => setIsOpen(prev => !prev);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  /**
   * ✅ SINGLE SOURCE OF TRUTH
   * This function renders menu items for BOTH desktop & mobile
   */
  const renderMenuItems = (isMobile = false) => {
    const baseClass = isMobile
      ? "py-2 border-b border-white/10 hover:text-white"
      : "cursor-pointer hover:text-white";

    // 🌐 Logged out — Home page
    if (!isAuthenticated && isHome) {
      return (
        <>
          <span onClick={() => scrollToSection("Services")} className={baseClass}>
            Services
          </span>
          <span onClick={() => scrollToSection("Support")} className={baseClass}>
            Support
          </span>
          <span onClick={() => scrollToSection("Contact")} className={baseClass}>
            Contact
          </span>
          <Link to="/login" className={baseClass} onClick={() => setIsOpen(false)}>
            Sign In
          </Link>
          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className={`mt-2 px-4 py-2 rounded-full bg-purple-600 text-white text-center ${
              isMobile ? "" : "ml-2"
            }`}
          >
            Get Started
          </Link>
        </>
      );
    }

    // 🔑 Login page
    if (!isAuthenticated && isLoginPage) {
      return (
        <Link
          to="/register"
          onClick={() => setIsOpen(false)}
          className={baseClass}
        >
          Get Started
        </Link>
      );
    }

    // 📝 Register page
    if (!isAuthenticated && isRegisterPage) {
      return (
        <Link
          to="/login"
          onClick={() => setIsOpen(false)}
          className={baseClass}
        >
          Sign In
        </Link>
      );
    }

    // 🔐 Logged in (Notes / Dashboard)
    if (isAuthenticated) {
      return (
        <>
          <button
            onClick={() => {
              navigate("/createnote");
              setIsOpen(false);
            }}
            className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white"
          >
            + New Note
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </button>
        </>
      );
    }

    return null;
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-black">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/download.jpg" alt="logo" className="w-8 h-8 rounded-full" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            ThinkPad
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-300 items-center">
          {renderMenuItems(false)}
        </div>

        {/* Mobile Icon */}
        <button onClick={toggleMenu} className="md:hidden text-gray-300">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-gray-300">
          {renderMenuItems(true)}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

