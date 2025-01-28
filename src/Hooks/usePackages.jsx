import { useQuery } from "@tanstack/react-query";
import useAxiosWithInterceptors from "../Authentication/useAxiosWithInterceptors";



const usePackages = () => {
    const axiosInstance = useAxiosWithInterceptors();

    const {data: packages=[]}=useQuery(
        {
             queryKey:["offer"],
             queryFn: async()=>
             {
                 const res = await axiosInstance.get('/packages');
                 
                 return res.data;
             }
        }
    )
    
     return[packages]
};

export default usePackages;