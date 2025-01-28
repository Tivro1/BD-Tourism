
import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import background from '../assets/background.jpg';

const Register = () => {
const {createUser}=useContext(AuthContext);
    const imageApi = import.meta.env.VITE_IMAGE_API_KEY;
    const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageApi}`;
    const navigate = useNavigate();
   
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit =async (data) => {
    console.log(data.profilePicture[0]); 
    console.log(data);
    createUser(data.email,data.password);
    const imageFile = {image: data.profilePicture[0]}
    const res=  await axios.post(imageHostingApi,imageFile,{
          headers:{
              'Content-Type':'multipart/form-data'
          }
      })
     console.log(res);
      if(res.data.status === 200)
        {    const usersData = {
            name:data.name,
            email:data.email,
            image:res?.data?.data.display_url

            
       };
           axios.post('https://tourserver-woad.vercel.app/user-tour',usersData)
            .then(res=>
            {
                if(res.data.acknowledged)
                {
                 Swal.fire({
                     title: `${data.name} added`,
                     icon: "success",
                     draggable: true
                   });
                   navigate('/');
                   reset();
                }
            }
            )
        }
  };

  return (
    <div  style={{
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }} className="mt-[-15px] w-full h-[800px]   pt-[55px]">
    <div 
    className="max-w-md mx-auto mt-[100px] p-5 border rounded-lg shadow-lg ">
      <h2 className="text-2xl font-bold mb-5 text-center">Create an Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block mb-2  text-xl font-bold" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            className={`w-full p-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded`}
            placeholder="Enter your full name"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" },
            })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block mb-2 text-xl font-bold" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className={`w-full p-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded`}
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block mb-2 text-xl font-bold" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`w-full p-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded`}
            placeholder="Enter a strong password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
              },
            })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* File Input Field */}
        <div className="mb-4">
          <label className="block mb-2 text-xl font-bold" htmlFor="profilePicture">
            Profile Picture
          </label>
          <input
            id="profilePicture"
            type="file"
            className={`w-full p-2 border ${
              errors.profilePicture ? "border-red-500" : "border-gray-300"
            } rounded`}
            {...register("profilePicture", {
              required: "Profile picture is required",
            })}
          />
          {errors.profilePicture && (
            <p className="text-red-500 text-sm">{errors.profilePicture.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-[#b8db9a] text-white font-bold rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
    </div>
  );
};

export default Register;
