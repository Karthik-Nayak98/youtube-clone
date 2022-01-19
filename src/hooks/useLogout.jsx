import { useContext } from "react";
import { useGoogleLogout } from "react-google-login";
import { AuthContext } from "../context/authcontext";

const handleLogout = (setUser, _response) => {
  sessionStorage.clear();
  setUser({});
};

const handleFailure = () => {
  console.log("Failed to logout");
};

export const useLogout = () => {
  const { setUser } = useContext(AuthContext);
  return useGoogleLogout({
    clientId: process.env.REACT_APP_YOUTUBE_CLIENT_ID,
    onLogoutSuccess: response => {
      handleLogout(setUser, response);
    },
    onFailure: handleFailure,
    cookiePolicy: "single_host_origin",
  });
};
