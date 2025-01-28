import { useQuery } from "@tanstack/react-query";
import useAxiosWithInterceptors from "../Authentication/useAxiosWithInterceptors";


const useBooking = () => {
    const axiosInstance = useAxiosWithInterceptors();

    const {data:bookig=[],refetch}=useQuery(
        {
             queryKey:['bookin'],
             queryFn: async()=>
             {
                 const res = await axiosInstance('/mybooking');
                 return res.data;
             }
        }
    )
    return [bookig,refetch]
};

export default useBooking;