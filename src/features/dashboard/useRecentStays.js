import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getConfirmedStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last") ? 7 : +searchParams.get("last");
  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isLoading: recentStaysLoading,
    data: confirmedRecentStays,
    error: recentStaysError,
  } = useQuery({
    queryFn: () => getConfirmedStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  return { recentStaysLoading, confirmedRecentStays, recentStaysError };
}
