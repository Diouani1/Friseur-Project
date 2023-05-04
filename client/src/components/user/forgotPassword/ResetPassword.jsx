import React, { useContext, useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { UserContext } from "../../../context/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AlertDanger from "../alert/AlertDanger";

function ResetPassword() {
  const {
    setComponent,
    data,
    setErrorMessage,
    userDispatch,
    showError,
    setShowError,
    setShowSuccess,
  } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const changePassword = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setErrorMessage(
        "The new password and the repeated one should be the same"
      );
      setShowError(true);

      return;
    }
    setShowError(false);
    setShowSuccess(false);
    userDispatch({
      type: "resetPassword",
      data,
      setComponent,
      setErrorMessage,
      password,
    });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleRepeatPasswordVisibility = () =>
    setShowRepeatPassword(!showRepeatPassword);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="p-4 shadow-lg rounded border border-gray-300 bg-white w-100">
        <h2 className="mb-4 text-center font-weight-bold">Change Password</h2>
        {showError && <AlertDanger />}
        <Form onSubmit={changePassword}>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <InputGroup>
              <Form.Control
                required
                className="position-relative rounded-end "
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <Form.Label>Repeat New Password</Form.Label>
            <InputGroup>
              <Form.Control
                required
                className="position-relative rounded-end "
                type={showRepeatPassword ? "text" : "password"}
                placeholder="Repeat password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
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
          <Form.Group controlId="formAcceptTerms">
            <Form.Check
              type="checkbox"
              label={
                <>
                  I accept the{" "}
                  <a to="/" className="text-primary-600">
                    Terms and Conditions
                  </a>
                </>
              }
              required
            />
          </Form.Group>
          <Button variant="primary" className="mb-3" onClick={changePassword}>
            Reset Password
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default ResetPassword;
