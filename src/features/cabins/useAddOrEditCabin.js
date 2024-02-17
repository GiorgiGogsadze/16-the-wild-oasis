import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrEditCabin as addOrEditCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useAddOrEditCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isUplodaing, mutate: addOrEditCabin } = useMutation({
    mutationFn: ({ newCabin, id, editImageUrl }) =>
      addOrEditCabinApi(newCabin, id, editImageUrl),
    onSuccess: () => {
      toast.success(`done successfully`);
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUplodaing, addOrEditCabin };
}
