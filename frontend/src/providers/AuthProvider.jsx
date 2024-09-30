import { message } from "antd";
import { getCurrentUser } from "../apiEndpoints/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/userSlice";
import { setLoader } from "../store/loaderSlice";
import ClipLoader from "react-spinners/ClipLoader";

const AuthProvider = ({ children, allowedRoles = [] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.user);
  const { isProcessing } = useSelector((state) => state.loader);
  // console.log(user);
  const currentUser = async () => {
    try {
      dispatch(setLoader(true));
      // console.log("current token", token);
      const response = await getCurrentUser();

      if (response.isSuccess) {
        // console.log("provider", response);
        message.success(response.message);
        // Store user data in Redux store
        dispatch(setUser(response.currentUser));
      }
      // if(user.role)
      if (!allowedRoles.includes(response.currentUser.role)) {
        message.error("Admin can't place booking");
        navigate("/booking");
        return;
      }

      if (user === null || !token) {
        {
          // Invalid token or user not found
          localStorage.removeItem("token");
          dispatch(setUser(null));
          navigate("/login");

          throw new Error("Uaunthorized");
        }
      }
      dispatch(setLoader(false));
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    if (token) {
      currentUser();
    } else {
      navigate("/login");
      message.error("Unauthorized");
      dispatch(setLoader(false)); // Make sure to stop the loader
    }
  }, [token]);

  // Render nothing (or a spinner) while the authentication is processing
  if (isProcessing) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <ClipLoader size={100} />
      </div>
    );
  }
  return <section>{children}</section>;
};

export default AuthProvider;
