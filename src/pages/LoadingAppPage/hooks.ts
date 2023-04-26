import { useNavigate } from "react-router-dom";
import { useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { getCalendarsService } from "../../services/google";
import { useLogout } from "../../hooks";

type UseCheckIsAuth = () => void;

const useCheckIsAuth: UseCheckIsAuth = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();

  useInitialisedDeskproAppClient((client) => {
    getCalendarsService(client)
      .then(() => navigate("/home"))
      .catch(logout)
  }, [navigate, logout]);
};

export { useCheckIsAuth };
