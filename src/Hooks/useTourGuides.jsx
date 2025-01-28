import { useQuery } from "@tanstack/react-query";
import useAxiosWithInterceptors from "../Authentication/useAxiosWithInterceptors";


const useTourGuides = () => {
    const axiosInstance = useAxiosWithInterceptors();
     const {data: gudies=[]}=useQuery(
        {
             queryKey:["tourGuide"],
             queryFn:async()=>
             {
                 const res = await axiosInstance.get('/guides');
                 console.log(res);
                 return res.data;
             }
        }
     )
     return[gudies];
};

export default useTourGuides;