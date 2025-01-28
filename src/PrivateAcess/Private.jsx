import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const Private = ({children}) => {

   const {user,loading}=useContext(AuthContext);
   const location = useLocation();
   if(loading)
       {
            return <span className="loading loading-ring loading-lg"></span>
       }
   if(user)
   {
        return children;
   }
   return (
       <div>
            <Navigate to="/loging" state={{from: location}} replace></Navigate>
       </div>
   );
   
};

export default Private;