import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useUser from "../../Hooks/useUser";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosWithInterceptors from "../../Authentication/useAxiosWithInterceptors";

const UserProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const axiosInstance = useAxiosWithInterceptors();
    const { user } = useContext(AuthContext);
    const [users] = useUser();
    
    const profile = users.filter(res => res.email === user.email && res.name !== 'Admin');
    const { message } = location.state || {};
    const [showMessage, setShowMessage] = useState(message);

    useEffect(() => {
        if (showMessage) {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Welcome To Your Profile",
                showConfirmButton: false,
                timer: 1500
            });

            setShowMessage(false);
        }
    }, [showMessage]);

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        role: "", 
    });

    const handleModal = (res) => {
        setOpen(!open);
        setFormData({
            name: res.name,
            image: res.image,
            role: res.role,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async () => {
        const patchData = { 
            name: formData.name, 
            email: user.email, 
            role: 'normal', 
            image: formData.image 
        };

        try {
            const res = await axiosInstance.patch('/user-edite', patchData);
            if (res.data) {
                Swal.fire({
                    title: "Edited Successfully!",
                    icon: "success",
                    draggable: true
                });
            }
        } catch (error) {
            console.error("Error occurred while editing:", error);
            Swal.fire({
                title: "There was an error!",
                icon: "error",
                text: error.message,
                draggable: true
            });
        }
        setOpen(false);
    };

    const handleTourGuideApply = () => {
        navigate("/dashboard/join-as-guide");
    };

    return (
        <div className="mt-[84px] p-8 bg-gray-50">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to Your Profile</h2>
                {profile.map((res, index) => (
                    <div key={index} className="flex items-center space-x-6">
                        <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
                            <img src={res.image} alt="User Image" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-medium text-gray-700">{res.name}</h3>
                            <p className="text-gray-600">{res.role === 'admin' ? "Role: Admin" : "Role: Normal"}</p>
                        </div>
                        <div className="flex space-x-4">
                            <button 
                                onClick={() => handleModal(res)} 
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                            >
                                Edit Profile
                            </button>
                            <button 
                                onClick={()=>handleTourGuideApply()} 
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                Apply For Tour Guide
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {open && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 w-[350px] rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Your Information</h3>
                        <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 mt-2 border border-gray-300 rounded"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="image" className="block text-gray-700">Image URL</label>
                                <input
                                    type="text"
                                    id="image"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    className="w-full p-2 mt-2 border border-gray-300 rounded"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="role" className="block text-gray-700">Role</label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    value={formData.role || "Normal"}
                                    disabled
                                    className="w-full p-2 mt-2 border border-gray-300 rounded"
                                />
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
