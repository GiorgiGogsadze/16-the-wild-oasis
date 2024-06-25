import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = +searchParams.get("page") || 1;
  const filterValue = searchParams.get("status") || "all";
  const filterBy =
    filterValue === "all" || !filterValue
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  const sortValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortValue.split("-");
  const sortBy = { field, direction };

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filterBy, sortBy, page],
    queryFn: () => getBookings({ filterBy, sortBy, page }),
    // refetchInterval: 5000,
  });

  // PRE_FETCHING
  if (page * PAGE_SIZE < count) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterBy, sortBy, page + 1],
      queryFn: () => getBookings({ filterBy, sortBy, page: page + 1 }),
    });
  }

  if (page !== 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterBy, sortBy, page - 1],
      queryFn: () => getBookings({ filterBy, sortBy, page: page - 1 }),
    });
  }
  return { isLoading, bookings, count, error };
}
