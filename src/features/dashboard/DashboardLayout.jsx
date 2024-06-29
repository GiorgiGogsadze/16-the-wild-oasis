import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import { useTodayStaysActivity } from "./useTodayStaysActivity";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
  @media (max-width: 56.25em) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto 34rem 34rem auto;
  }
`;

export default function DashboardLayout() {
  const {
    numDays,
    recentBookingsLoading,
    recentBookings,
    recentBookingsError,
  } = useRecentBookings();
  const { recentStaysLoading, confirmedRecentStays, recentStaysError } =
    useRecentStays();
  const { todayActivityLoading, todayActivity, todayActivityError } =
    useTodayStaysActivity();
  const {
    isLoading: isLoadingCabins,
    cabins,
    error: cabinsError,
  } = useCabins();

  if (
    recentBookingsLoading ||
    recentStaysLoading ||
    todayActivityLoading ||
    isLoadingCabins
  )
    return <Spinner />;

  // console.log("bookigns: ", recentBookings);
  // console.log("stays: ", confirmedRecentStays);
  // console.log("today: ", todayActivity);

  const statError = recentStaysError || recentBookingsError || cabinsError;

  return (
    <StyledDashboardLayout>
      {!statError && (
        <Stats
          bookings={recentBookings}
          confirmedStays={confirmedRecentStays}
          numDays={numDays}
          cabinCount={cabins.length}
        />
      )}
      {!todayActivityError && <TodayActivity activities={todayActivity} />}
      {!recentStaysError && <DurationChart stays={confirmedRecentStays} />}
      {!recentBookingsError && (
        <SalesChart bookings={recentBookings} numDays={numDays} />
      )}
    </StyledDashboardLayout>
  );
}
