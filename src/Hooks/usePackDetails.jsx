import { useQuery } from "@tanstack/react-query";
import useAxiosWithInterceptors from "../Authentication/useAxiosWithInterceptors";


const usePackDetails = () => {
    const axiosInstance = useAxiosWithInterceptors();
    const {data:packDetails = [],refetch}= useQuery(
        {
             queryKey:["details"],
             queryFn: async ()=>
             {
                 const res = await axiosInstance.get('/pack-details')
                 return res.data;
             }
        }
    )
    return [packDetails,refetch]

};

export default usePackDetails;