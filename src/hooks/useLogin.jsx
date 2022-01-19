import { useContext } from "react";
import { useGoogleLogin } from "react-google-login";
import { AuthContext } from "../context/authcontext";

const handleLogin = (setUser, response) => {
  console.log(response);
  const userObj = {
    accessToken: response?.accessToken,
    name: response?.profileObj.name,
    image: response?.profileObj.imageUrl,
  };
  sessionStorage.setItem("accessToken", response?.accessToken);
  sessionStorage.setItem("name", response?.profileObj.name);
  sessionStorage.setItem("image", response?.profileObj.imageUrl);
  setUser(userObj);
};

const handleFailure = () => {
  console.log("failed to login");
};

export const useLogin = () => {
  const { setUser } = useContext(AuthContext);
  return useGoogleLogin({
    clientId: process.env.REACT_APP_YOUTUBE_CLIENT_ID,
    onSuccess: response => {
      handleLogin(setUser, response);
    },
    onFailure: handleFailure,
    cookiePolicy: "single_host_origin",
  });
};
