import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

import usePackages from "../../Hooks/usePackages";
import useUser from "../../Hooks/useUser";
import usePayments from "../../Hooks/usePayments";
import useTourGuides from "../../Hooks/useTourGuides";
import useAxiosWithInterceptors from "../../Authentication/useAxiosWithInterceptors";
import useStories from "../../Hooks/useStories";

const AdminProfile = () => {
  const location = useLocation();
  const { message } = location.state || {};
  const [showMessage, setShowMessage] = useState(message);
  const axiosInstance = useAxiosWithInterceptors();
  const [adminData, setAdminData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedAdminData, setUpdatedAdminData] = useState({});

  useEffect(() => {
    if (showMessage) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Welcome To Your Profile",
        showConfirmButton: false,
        timer: 1500,
      });
      setShowMessage(false);
    }
  }, [showMessage]);

  const [stories] = useStories();
  const [guide] = useTourGuides();
  const [pkages] = usePackages();
  const [users,refetch] = useUser();
  const [totalPayment] = usePayments();

  const totalPayments = totalPayment.reduce(
    (initial, total) => initial + total.amount,
    0
  );

  const usersWithoutRole = users.filter((usr) => usr.role === undefined);

  useEffect(() => {
    const admin = users.find((usr) => usr.role === "admin");
    setAdminData(admin || null);
  }, [users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAdminData({ ...updatedAdminData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    const updatedData = {
      name: updatedAdminData.name || adminData.name,  
      image: updatedAdminData.image || adminData.image, 
      email: adminData.email,  
      role: adminData.role, 
    };
  
    try {
      const response = await axiosInstance.patch(`/users/${adminData._id}`, updatedData);
      if (response.data.modifiedCount === 1) {
        const data = await response.data;
        setAdminData(data);
        setIsEditModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "Profile updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
       refetch();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error updating profile",
        text: error.message,
      });
    }
  };
  

  return (
    <div className="min-h-screen mt-[84px] p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Dashboard
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="p-4 bg-gray-700 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Total Payments</h3>
          <p className="text-3xl font-bold mt-2">${totalPayments}</p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Total Tour Guides</h3>
          <p className="text-3xl font-bold mt-2">{guide.length}</p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Total Packages</h3>
          <p className="text-3xl font-bold mt-2">{pkages.length}</p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Total Clients</h3>
          <p className="text-3xl font-bold mt-2">{usersWithoutRole.length}</p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Total Stories</h3>
          <p className="text-3xl font-bold mt-2">{stories.length}</p>
        </div>
      </motion.div>

      {adminData && (
        <motion.div
          className="mt-12 bg-gray-700 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <img
              src={adminData.image}
              alt={adminData.name}
              className="w-24 h-24 rounded-full shadow-md mb-4 md:mb-0 md:mr-6"
            />
            <div>
              <h2 className="text-2xl font-semibold">{adminData.name}</h2>
              <p className="text-lg">{adminData.email}</p>
              <p className="text-sm text-gray-400">Role: {adminData.role}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all"
          >
            Edit Profile
          </button>
        </motion.div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <motion.div
            className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
            <form onSubmit={handleSubmit}>
  <div className="mb-4">
    <label className="block text-white font-medium">Name</label>
    <input
      type="text"
      name="name"
      className="w-full border-gray-300 text-black rounded-lg p-2 mt-1"
      defaultValue={adminData.name}
      onChange={handleInputChange}
    />
  </div>
  <div className="mb-4">
    <label className="block text-white font-medium">Image URL</label>
    <input
      type="text"
      name="image"
      className="w-full border-gray-300 text-black rounded-lg p-2 mt-1"
      defaultValue={adminData.image}
      onChange={handleInputChange}
    />
  </div>
  <div className="mb-4">
    <label className="block text-white font-medium">Email</label>
    <input
      type="email"
      className="w-full border-gray-300 text-black rounded-lg p-2 mt-1"
      value={adminData.email}
      disabled
    />
  </div>
  <div className="mb-4">
    <label className="block text-white font-medium">Role</label>
    <input
      type="text"
      className="w-full border-gray-300 text-black rounded-lg p-2 mt-1"
      value={adminData.role}
      disabled
    />
  </div>
  <div className="flex justify-end">
    <button
      type="button"
      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg mr-2"
      onClick={() => setIsEditModalOpen(false)}
    >
      Cancel
    </button>
    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
    >
      Save
    </button>
  </div>
</form>

          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
