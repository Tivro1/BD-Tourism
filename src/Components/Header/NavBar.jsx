import { useContext, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from '../../assets/logo.png';
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useUser from "../../Hooks/useUser";
import useAxiosWithInterceptors from "../../Authentication/useAxiosWithInterceptors";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signout } = useContext(AuthContext);
  const [users] = useUser();

  const profileImage = users.filter((res) => res?.email === user?.email);
  const navigate = useNavigate();
  const axiosInstance = useAxiosWithInterceptors();
  const handleCartToDashboard = () => {
    navigate("/dashboard/cart");
  };

  const handleLogout = (e) => {
    signout()
      // .then(async() => {
      //   await axiosInstance
      //   .delete(`/user-del`, { params: { email } }) // Pass the email here
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((error) => {
      //     console.error("Error deleting user:", error);
      //   });


      // })
      // .catch((error) => {
      //   console.error("Logout error:", error);
      // });
      console.log(e);
  };

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="fixed top-0 w-[1024px] bg-[#d8be2a] flex justify-between items-center p-5 z-50 shadow-lg">
        {/* Logo */}
        <div className="w-[44px] h-[44px] rounded-full overflow-hidden">
          <img src={logo} alt="Logo" className="w-full h-full object-cover" />
        </div>

        {/* Navbar items (Desktop) */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex gap-5 text-xl font-bold text-white">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "text-sky-500" : "text-white")}
            >
              HOME
            </NavLink>
            <NavLink
              to="/trips"
              className={({ isActive }) => (isActive ? "text-sky-500" : "text-white")}
            >
              TRIPS
            </NavLink>
           
            <NavLink
              to="/community"
              className={({ isActive }) => (isActive ? "text-sky-500" : "text-white")}
            >
              COMMUNITY
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "text-sky-500" : "text-white")}
            >
             ABOUT ME
            </NavLink>
          </div>

          {/* Cart button */}
          <button
            onClick={handleCartToDashboard}
            className="flex items-center gap-2 text-white"
          >
            <FiShoppingCart className="text-2xl" />
            <div className="badge badge-secondary"></div>
          </button>

          {/* Authentication or User */}
          {!user ? (
            <>
              <NavLink
                to="/loging"
                className="text-white hover:text-sky-500 transition text-xl font-bold"
              >
                LOGIN
              </NavLink>
              <NavLink
                to="/reg"
                className="text-white hover:text-sky-500 transition text-xl font-bold"
              >
                SIGNUP
              </NavLink>
            </>
          ) : (
            <div className="relative">
              <div
                onClick={handleDropdown}
                className="w-[40px] h-[40px] rounded-full overflow-hidden cursor-pointer"
              >
                <img className="w-full h-full object-cover" src={profileImage[0]?.image} alt="Profile" />
              </div>

              {/* Dropdown menu */}
              <div
                className={`absolute top-[45px] right-0 bg-gray-800 w-[200px] p-3 rounded-lg transition-all duration-300 ${
                  dropdown ? "block" : "hidden"
                }`}
              > 
                <h1 className="text-white text-center">{user?.displayName}</h1>
                <h1 className="text-white text-center">{user?.email}</h1>
               <hr className="w-full bg-white h-[1px]"></hr>
                <NavLink
                  to="/dashboard"
                  className="block text-white py-2 px-4 hover:bg-gray-700 rounded-lg"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={()=>handleLogout(user?.email)}
                  className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600 w-full mt-2"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button className="mr-[600px]" onClick={handleMenuToggle}>
            {menuOpen ? (
              <FaTimes className="text-white text-3xl" />
            ) : (
              <FaBars className="text-white text-3xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? "block" : "hidden"
        }`}
        onClick={handleMenuToggle}
      ></div>

      <div
        className={`fixed top-0 left-0 bg-[#2b2b2b] w-[70%] h-full text-white p-5 z-50 transition-all duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end mb-5">
          <button onClick={handleMenuToggle}>
            <FaTimes className="text-white text-3xl" />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className="text-white text-lg hover:text-sky-500 transition"
          >
            HOME
          </NavLink>
          <NavLink
            to="/trips"
            className="text-white text-lg hover:text-sky-500 transition"
          >
            TRIPS
          </NavLink>

          <NavLink
            to="/dashboard"
            className="text-white text-lg hover:text-sky-500 transition"
          >
            DASHBOARD
          </NavLink>

          
          <NavLink
            to="/community"
            className="text-white text-lg hover:text-sky-500 transition"
          >
            COMMUNITY
          </NavLink>
          <NavLink
            to="/about"
            className="text-white text-lg hover:text-sky-500 transition"
          >
            ABOUT ME
          </NavLink>

          {/* Authentication or User */}
          {!user ? (
            <>
              <NavLink
                to="/loging"
                className="text-white text-lg hover:text-sky-500 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/reg"
                className="text-white text-lg hover:text-sky-500 transition"
              >
                SignUp
              </NavLink>
            </>
          ) : (
            <div>
              <div
                onClick={handleDropdown}
                className="w-[40px] h-[40px] rounded-full overflow-hidden cursor-pointer mb-5"
              >
                <img className="w-full h-full object-cover" src={profileImage[0]?.image} alt="Profile" />
              </div>

              <div
                className={`bg-gray-800 p-3 rounded-lg transition-all duration-300 ${
                  dropdown ? "block" : "hidden"
                }`}
              >
                <NavLink
                  to="/dashboard"
                  className="block text-white py-2 px-4 hover:bg-gray-700 rounded-lg"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={()=>handleLogout(user?.email)}
                  className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600 w-full mt-2"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
