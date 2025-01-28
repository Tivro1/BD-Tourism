import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import useAxiosWithInterceptors from "../Authentication/useAxiosWithInterceptors";
import { AuthContext } from "../AuthProvider/AuthProvider";


const useGuide = () => {
   const {user}=useContext(AuthContext);
   const axiosInstance = useAxiosWithInterceptors();
//TankStack
const {data:isGuide,isLoading:isGuideLoading} = useQuery({
    queryKey:[user?.email, 'isguide'],
    queryFn: async ()=>
    {
         const res = await axiosInstance.get(`/guide/${user.email}`);
         console.log(res.data);
         return res.data?.guide;
    } 
})
return [isGuide,isGuideLoading];



};

export default useGuide;