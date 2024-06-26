import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      navigate("/login");
      queryClient.setQueryData(["user"], null);
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("can't log out user now");
    },
  });
  return { logout, isLoading };
}
