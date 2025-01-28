import { useQuery } from "@tanstack/react-query";
import useAxiosWithInterceptors from "../Authentication/useAxiosWithInterceptors";


const usePlacesData = () => {
   const axiosInstance = useAxiosWithInterceptors();
    const {data:tourSpots = [],refetch}= useQuery(
        {
             queryKey:["spots"],
             queryFn: async ()=>
             {
                 const res = await axiosInstance.get('/places')
                 return res.data;
             }
        }
    )
    return [tourSpots,refetch]
};

export default usePlacesData;