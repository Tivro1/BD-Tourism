import { useQuery } from "@tanstack/react-query";
import useAxiosWithInterceptors from "../Authentication/useAxiosWithInterceptors";


const useStories = () => {
   const axioIntace = useAxiosWithInterceptors();
    const {data:story=[] , refetch}=useQuery(
        {
             queryKey:['stories'],
             queryFn:async()=>
             {
                  const res = await axioIntace.get('/stories');
                  return res.data;
             }
        }
    )
     return [story, refetch]
};

export default useStories;