import "./singuser.css";
import { useContext } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { UserContext } from "../../context/user/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AlertDanger from "../alert/AlertDanger";

const SingUser = () => {
  const {
    data,
    setData,
    modeType,
    setModeType,
    userDispatch,
    showPassword,
    setShowPassword,
    showRepeatPassword,
    setShowRepeatPassword,
    rememberMe,
    setRememberMe,
    navigate,
    setUser,
    setErrorMessage,
    setOtp,
    setComponent,
    showError,
    setShowError,
  } = useContext(UserContext);
  const changeMode = () => {
    setModeType(modeType === "login" ? "register" : "login");
    setShowPassword(false);
    setShowRepeatPassword(false);
    setData({ ...data, password: "" });
    setShowError(false);
  };
  // storing data from input of user
  const handlChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // sending user data to backend to register
  const handleRegister = (e) => {
    e.preventDefault();
    if (data.password !== data.repeatPassword) {
      setErrorMessage("The password and repeated one should be the same");
      setShowError(true);
      return;
    }
    userDispatch({
      type: "register",
      data,
      setModeType,
      setData,
      setErrorMessage,
      setShowError,
    });
  };
  // sending user data to back end to login
  const handleLogIn = (e) => {
    e.preventDefault();
    userDispatch({
      type: "login",
      data,
      setUser,
      setErrorMessage,
      setShowError,
      rememberMe,
    });
  };
  // sending email to backend to recover the forgotten password
  const handleForgotPassword = (event) => {
    // forgot password logic here
    event.preventDefault();
    userDispatch({
      type: "forgotPassword",
      data,
      setErrorMessage,
      setShowError,
      setOtp,
      setComponent,
      navigate,
    });
  };
  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };
  //  showing the hidden passwords
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleRepeatPasswordVisibility = () =>
    setShowRepeatPassword(!showRepeatPassword);
  if (modeType === "login") {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="p-4 shadow-lg rounded border border-gray-300 bg-white w-100">
          <Form
            onSubmit={handleLogIn}
            className="Auth-form bg-primary-dark p-3 rounded"
          >
            <div className="Auth-form-content">
              {showError && <AlertDanger />}
              <h3 className="Auth-form-title text-center mb-3">Log In</h3>
              <div className="text-center mb-3">
                Not registered yet?
                <span
                  className="link-primary"
                  onClick={changeMode}
                  style={{ cursor: "pointer", margin: "1rem" }}
                >
                  Register
                </span>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={data.email}
                  onChange={handlChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    required
                    className="position-relative rounded-end "
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    onChange={handlChange}
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    onClick={togglePasswordVisibility}
                    className="position-absolute top-50 end-0 translate-middle-y pe-2 psw-vs"
                    style={{ cursor: "pointer" }}
                    aria-label="Toggle password visibility"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3 d-flex align-items-center">
                <Form.Check
                  type="checkbox"
                  id="remember-me-checkbox"
                  label="Remember me"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                />
                <span
                  className="ms-4 link-primary"
                  // onClick={() => navigate("/forgot-password")}
                  onClick={() => {
                    setShowError(false);
                    setModeType("password");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Forgot password?
                </span>
              </Form.Group>

              <div className="d-grid gap-2 ">
                <Button type="submit" variant="outline-primary">
                  Login
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  } else if (modeType === "register") {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center ">
        <div className="p-4 shadow-lg rounded border border-gray-300 bg-white w-100">
          <Form
            onSubmit={handleRegister}
            className="Auth-form bg-primary-dark p-3 rounded"
          >
            <div className="Auth-form-content">
              {showError && <AlertDanger />}

              <h3 className="Auth-form-title text-center mb-3">Register</h3>
              <div className="text-center mb-3">
                Already registered?
                <span
                  className="link-primary"
                  onClick={changeMode}
                  style={{ cursor: "pointer", margin: "1rem" }}
                >
                  LogIn
                </span>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter full name"
                  name="fullName"
                  onChange={handlChange}
                  value={data.fullName}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter username"
                  name="userName"
                  onChange={handlChange}
                  value={data.userName}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handlChange}
                  value={data.email}
                />
              </Form.Group>
              <Form.Group className="mb-3 rounded-end">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    required
                    className="position-relative rounded-end "
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    onChange={handlChange}
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    onClick={togglePasswordVisibility}
                    className="position-absolute top-50 end-0 translate-middle-y pe-2 psw-vs"
                    style={{ cursor: "pointer" }}
                    aria-label="Toggle password visibility"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Repeat Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    required
                    className="position-relative rounded-end "
                    type={showRepeatPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    name="repeatPassword"
                    onChange={handlChange}
                  />
                  <FontAwesomeIcon
                    icon={showRepeatPassword ? faEyeSlash : faEye}
                    onClick={toggleRepeatPasswordVisibility}
                    className="position-absolute top-50 end-0 translate-middle-y pe-2 psw-vs"
                    style={{ cursor: "pointer" }}
                    aria-label="Toggle password visibility"
                  />
                </InputGroup>
              </Form.Group>
              <div className="d-grid gap-2 ">
                <Button type="submit" variant="outline-primary">
                  Register
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="p-4 shadow-lg rounded border border-gray-300 bg-white w-100">
        <Form
          onSubmit={handleForgotPassword}
          className="Auth-form bg-primary-dark p-3 rounded"
        >
          <div className="Auth-form-content">
            {showError && <AlertDanger />}

            <h3 className="Auth-form-title text-center mb-3">
              Recover Password
            </h3>
            <div className="text-center mb-3">
              do you want to cancel this?
              <span
                className="link-primary"
                onClick={changeMode}
                style={{ cursor: "pointer", margin: "1rem" }}
              >
                LogIn
              </span>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handlChange}
                value={data.email}
              />
            </Form.Group>
            <div className="d-grid gap-2 ">
              <Button type="submit" variant="outline-primary">
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SingUser;
