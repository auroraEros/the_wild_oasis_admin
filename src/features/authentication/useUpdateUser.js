import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("your account successfully updated!");
      queryClient.invalidateQueries(["user"]);
    },
    onError: () => toast.error("Your account failed to be updated"),
  });

  return {isUpdating,updateUser}
}
