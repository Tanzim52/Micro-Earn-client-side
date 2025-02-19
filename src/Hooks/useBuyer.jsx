import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useBuyer = () => {
   const {user}= useAuth();
   const axiosSecure = useAxiosSecure();
   const {data: isBuyer,isLoading} = useQuery({
    queryKey: [user?.email, 'isBuyer'],
    queryFn: async ()=>{
        const res = await axiosSecure.get(`/user/buyer/${user.email}`);
        return res.data?.buyer;
    }
   });
   return [isBuyer,isLoading];
};

export default useBuyer;