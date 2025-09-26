import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = null,
    isLoading: roleLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !authLoading && !!user?.email, // only run if auth is ready and email exists
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/${encodeURIComponent(user.email)}/role`
      );
      return res.data.role;
    },
    retry: false, // prevent infinite retries if something fails
  });

  return { role, roleLoading: authLoading || roleLoading, refetch, error };
};

export default useUserRole;
