import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import background from '../assets/background.jpg';
import useAxiosWithInterceptors from "./useAxiosWithInterceptors";
import useUser from "../Hooks/useUser";
import { NavLink, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { signIn, googleVerify,user } = useContext(AuthContext);
  const axiosInstance = useAxiosWithInterceptors();
  const [,refetch]=useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password);
    navigate('/')
    Swal.fire({
      title: "Logged In Successfully",
      icon: "success",
      draggable: true,
    });
  };

  const handleGoogleLogin = async () => {
 
    try {
      await googleVerify()
      
      .then(result=>
      {
        navigate('/')
           const userInfo = {
              email:result.user?.email,
              name:result.user?.displayName,
              image:result.user?.photoURL

           }
           axiosInstance.post('/user-tour',userInfo)
      .then(res =>
      {
        refetch();
          Swal.fire({
              title: "Google Loging Success",
              icon: "success",
              draggable: true
            });
         
      }
      )
        
      
      // navigate(from, {replace:true});
      }
      )
      
      
  } catch (err) {
      // setError(err.message || 'Google sign-in failed.');
      console.log(err);
  }
  };
 console.log(user);
  return (
    <div style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} className="mt-[-15px] w-full h-[800px]  pt-[120px]">
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-5 text-center">Log In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <div className="mb-4">
          <label className="block mb-2  text-xl font-bold" htmlFor="email">
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
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
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
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Log In
        </button>
      </form>

      {/* Google Login Button */}
      <div className="mt-4">
        <button
          onClick={handleGoogleLogin}
          className="w-full p-3 bg-red-500 text-white font-bold rounded hover:bg-red-600 flex justify-center "
        >
          <FaGoogle></FaGoogle>
        </button>
      </div> 
      <div>
         <button className="p-2 bg-[#b8db9a] rounded-md mt-2 text-xl font-bold text-black">
              <NavLink to='/reg'>Click For SignUp</NavLink>
         </button>
      </div>
    </div>
    </div>
  );
};

export default Login;
