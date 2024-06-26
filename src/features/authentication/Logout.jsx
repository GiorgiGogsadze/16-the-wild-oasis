import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogOut } from "./useLogout";
import Spinner from "../../ui/Spinner";

export default function Logout() {
  const { logout, isLoading: isLoggingOut } = useLogOut();
  if (isLoggingOut) return <Spinner />;
  return (
    <ButtonIcon onClick={logout}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}
