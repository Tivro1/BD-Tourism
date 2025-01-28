import { useQuery } from "@tanstack/react-query";
import useAxiosWithInterceptors from "../Authentication/useAxiosWithInterceptors";


const useUser = () => {
    
    const axiosInstance = useAxiosWithInterceptors();
        // TanStack Query -->
const {refetch,data: users=[]}=useQuery(
    {
        queryKey: ["user"],
        queryFn: async ()=> 
        {
             const res = await axiosInstance.get('/users');
             return res.data;
        }
    }
);

return [users,refetch];

};

export default useUser;