import { useQuery } from "@tanstack/react-query";
import useAxiosWithInterceptors from "../Authentication/useAxiosWithInterceptors";


const useApplicationsCandidates = () => {
    const axiosInstance = useAxiosWithInterceptors();
    const {data:applycation = [],refetch}= useQuery(
        {
             queryKey:["aply"],
             queryFn: async ()=>
             {
                 const res = await axiosInstance.get('/application')
                 return res.data;
             }
        }
    )
    return [applycation,refetch]

};

export default useApplicationsCandidates;