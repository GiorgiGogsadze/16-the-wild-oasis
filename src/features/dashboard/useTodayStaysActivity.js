import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayStaysActivity() {
  const {
    isLoading: todayActivityLoading,
    data: todayActivity,
    error: todayActivityError,
  } = useQuery({
    queryFn: () => getStaysTodayActivity(),
    queryKey: ["today-activity"],
  });

  return { todayActivityLoading, todayActivity, todayActivityError };
}
