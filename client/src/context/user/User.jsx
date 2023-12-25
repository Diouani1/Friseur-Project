import { createContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import reducer from "./userReducer";

export const UserContext = createContext();

const existUser =
  JSON.parse(localStorage.getItem("user")) ||
  JSON.parse(sessionStorage.getItem("user")) ||
  null;

function User({ children }) {
  const [user, setUser] = useState(existUser);
  const [data, setData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [warnedMessage, setWarnedMessage] = useState("");
  const [modeType, setModeType] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const navigate = useNavigate();
  const [otp, setOtp] = useState();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWarned, setShowWarned] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [state, userDispatch] = useReducer(reducer, {});
  const [emailAlert, setEmailAlert] = useState(false);
  const [onOff, setOnOff] = useState(false);
  const [component, setComponent] = useState("");
  const [lastComponet, setLastComponent] = useState("");
  const [showDeleteAcountModal, setShowDeleteAcountModal] = useState(false);

  // this is temporal
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        data,
        setData,
        modeType,
        setModeType,
        userDispatch,
        state,
        showPassword,
        setShowPassword,
        showRepeatPassword,
        setShowRepeatPassword,
        rememberMe,
        setRememberMe,
        navigate,
        errorMessage,
        setErrorMessage,
        otp,
        setOtp,
        component,
        setComponent,
        showError,
        setShowError,
        showSuccess,
        setShowSuccess,
        successMessage,
        setSuccessMessage,
        emailAlert,
        setEmailAlert,
        onOff,
        setOnOff,
        warnedMessage,
        setWarnedMessage,
        showWarned,
        setShowWarned,
        profilePicture,
        setProfilePicture,
        profilePictureUrl,
        setProfilePictureUrl,
        lastComponet,
        setLastComponent,
        showAppointmentModal,
        setShowAppointmentModal,
        showDeleteAcountModal,
        setShowDeleteAcountModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export default User;
