import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useWorker = () => {
   const {user}= useAuth();
   const axiosSecure = useAxiosSecure();
   const {data: isWorker,isLoading} = useQuery({
    queryKey: [user?.email, 'isWorker'],
    queryFn: async ()=>{
        const res = await axiosSecure.get(`/user/worker/${user.email}`);
        return res.data?.worker;
    }
   });
   return [isWorker,isLoading];
};

export default useWorker;