import {
    FaBook,
    FaEdit,
    FaHome,
    FaJoint,
    FaMagnet,
    FaPlus,
    FaShoppingBag,
    FaUser,
  } from "react-icons/fa";
  import { NavLink, Outlet } from "react-router-dom";
  import { SiStorybook } from "react-icons/si";
  import { MdAssignmentAdd } from "react-icons/md";
  import useAdmin from "../Hooks/useAdmin";
import useGuide from "../Hooks/useGuide";
import { useEffect, useState } from "react";

   

  const DashBoard = () => {
    const [isAdmin] = useAdmin();
    const [isGuide]= useGuide();
    console.log(isGuide);
    console.log(isAdmin);
    const [normalUser, setNormalUser]=useState(false);
    useEffect(() => {
      if (!isAdmin && !isGuide) {
        setNormalUser(true);
      } else {
        setNormalUser(false); // Reset the state if the user is an admin or a guide
      }
    }, [isAdmin, isGuide]);



    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-full md:w-[300px] bg-[#1b1b1b] text-white p-4 md:p-6">
          <strong className="block text-center text-2xl font-bold mb-4">
            Dashboard
          </strong>
          <hr className="border-gray-400 mb-6" />
          <ul className="flex flex-col gap-4">
            {isAdmin && (
              <div>
                <li>
                  <NavLink
                    to="/dashboard/adminProfile"
                    state={{ message:true}}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg text-white shadow-md"
                        : "flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-lg"
                    }
                  >
                    <FaMagnet /> Manage Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="additems"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg text-white shadow-md"
                        : "flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-lg"
                    }
                  >
                    <FaPlus /> Add Package
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="all-users"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg text-white shadow-md"
                        : "flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-lg"
                    }
                  >
                    <FaBook /> Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="manage-candidate"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg text-white shadow-md"
                        : "flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-lg"
                    }
                  >
                    <FaEdit /> Manage Candidates
                  </NavLink>
                </li>
              </div>
            )}
  
            {normalUser &&(
              // Normal User
              <div>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg text-white shadow-md"
                        : "flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-lg"
                    }
                  >
                    <FaHome /> User Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    state={{ message:true}}
                    to="/dashboard/userProfile"
                   
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg text-white shadow-md"
                        : "flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-lg"
                    }
                  >
                    <FaUser /> Manage Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="mybooking"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg text-white shadow-md"
                        : "flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-lg"
                    }
                  >
                    <FaShoppingBag /> My Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="manageStory"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg text-white shadow-md"
                        : "flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-lg"
                    }
                  >
                    <SiStorybook /> Manage Stories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="addstory"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg text-white shadow-md"
                        : "flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-lg"
                    }
                  >
                    <MdAssignmentAdd /> Add Stories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="join-as-guide"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg text-white shadow-md"
                        : "flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-lg"
                    }
                  >
                    <FaJoint /> Join as Guide
                  </NavLink>
                </li>
              </div>
            )}
             {/* Guides Route */}
               {isGuide && (
                 <div>
                 <li>
                   <NavLink
                     to="/"
                     className={({ isActive }) =>
                       isActive
                         ? "flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg text-white shadow-md"
                         : "flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-lg"
                     }
                   >
                     <FaHome /> User Home
                   </NavLink>
                 </li>
                 <li>
                   <NavLink
                     state={{ message:true}}
                     to="/dashboard/userProfile"
                    
                     className={({ isActive }) =>
                       isActive
                         ? "flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg text-white shadow-md"
                         : "flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-lg"
                     }
                   >
                     <FaUser /> Manage Profile
                   </NavLink>
                 </li>
               
                 <li>
                   <NavLink
                     to="manageStory"
                     className={({ isActive }) =>
                       isActive
                         ? "flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg text-white shadow-md"
                         : "flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-lg"
                     }
                   >
                     <SiStorybook /> Manage Stories
                   </NavLink>
                 </li>
                 <li>
                   <NavLink
                     to="addstory"
                     className={({ isActive }) =>
                       isActive
                         ? "flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg text-white shadow-md"
                         : "flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-lg"
                     }
                   >
                     <MdAssignmentAdd /> Add Stories
                   </NavLink>
                 </li>
                 <li>
                   <NavLink
                     to="my-assigned-tours"
                     className={({ isActive }) =>
                       isActive
                         ? "flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg text-white shadow-md"
                         : "flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-lg"
                     }
                   >
                     <FaJoint /> My Assigned Tours
                   </NavLink>
                 </li>
               </div>
               )}

          </ul>
        </div>
  
        {/* Main Content */}
        <div className="flex-1 p-4 bg-white bg-opacity-25">
          <Outlet />
        </div>
      </div>
    );
  };
  
  export default DashBoard;
  