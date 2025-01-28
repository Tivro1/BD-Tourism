import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import useAxiosWithInterceptors from "../Authentication/useAxiosWithInterceptors";
import { AuthContext } from "../AuthProvider/AuthProvider";


const useAdmin = () => {
   const {user}=useContext(AuthContext);
   const axiosInstance = useAxiosWithInterceptors();
//TankStack
const {data:isAdmin,isLoading:isAdminLoading} = useQuery({
    queryKey:[user?.email, 'isAdmin'],
    queryFn: async ()=>
    {
         const res = await axiosInstance.get(`/admin/${user.email}`);
         console.log(res);
         return res.data?.admin;
    } 
})
return [isAdmin,isAdminLoading];



};

export default useAdmin;