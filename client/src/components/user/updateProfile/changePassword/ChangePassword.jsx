import { useContext, useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { UserContext } from "../../../../context/user/User";
import AlertSuccess from "../../../alert/AlertSuccess";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
function ChangePassword() {
  const {
    user,
    showSuccess,
    setErrorMessage,
    userDispatch,
    setShowPassword,
    showPassword,
    setShowRepeatPassword,
    showRepeatPassword,
    setShowError,
    setShowSuccess,
    setSuccessMessage,
    setComponent,
    setLastComponent,
  } = useContext(UserContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== repeatNewPassword) {
      setErrorMessage("The new password and repeat new one should be the same");
      setShowSuccess(false);
      setShowError(true);
      return;
    }
    userDispatch({
      type: "changePassword",
      oldPassword,
      newPassword,
      setShowError,
      setShowSuccess,
      setSuccessMessage,
      setErrorMessage,
      user,
    });
  };
  //  showing the hidden passwords
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleNewPasswordVisibility = () =>
    setShowNewPassword(!showNewPassword);
  const toggleRepeatPasswordVisibility = () =>
    setShowRepeatPassword(!showRepeatPassword);
  useEffect(() => setLastComponent("multi"), []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="p-4 shadow-lg rounded border border-gray-300 bg-white ">
        {showSuccess ? (
          <AlertSuccess />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  className="position-relative rounded-end "
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}
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
              <Form.Label>New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  className="position-relative rounded-end "
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
                <FontAwesomeIcon
                  icon={showNewPassword ? faEyeSlash : faEye}
                  onClick={toggleNewPasswordVisibility}
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
                  placeholder="Password"
                  name="password"
                  value={repeatNewPassword}
                  onChange={(event) => setRepeatNewPassword(event.target.value)}
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
              <Button type="submit" className="btn btn-primary ">
                Change Password
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setComponent("multi");
                  setShowError(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}
export default ChangePassword;
