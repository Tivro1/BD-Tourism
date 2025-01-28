import { useQuery } from "@tanstack/react-query";
import useAxiosWithInterceptors from "../Authentication/useAxiosWithInterceptors";


const usePayments = () => {
   const axiosInstance = useAxiosWithInterceptors();
    const {data:totalPayment = [],refetch}= useQuery(
        {
             queryKey:["pay"],
             queryFn: async ()=>
             {
                 const res = await axiosInstance.get('/payment-history')
                 return res.data;
             }
        }
    )
    return [totalPayment,refetch]
};

export default usePayments;