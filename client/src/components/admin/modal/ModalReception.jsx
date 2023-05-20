import React, { useContext, useState } from "react";
import { Button, Form, Modal, InputGroup } from "react-bootstrap";
import { AdminContext } from "../../../context/admin/Admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../context/user/User";
import AlertDanger from "../../alert/AlertDanger";

function ModalReception() {
  const { show, setShow, adminDispatch } = useContext(AdminContext);
  const { showError, setErrorMessage, setShowError, user, setUser } =
    useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleReceptionModel = () => {
    adminDispatch({
      type: "reception",
      password,
      setShow,
      setErrorMessage,
      setShowError,
      user,
      setUser,
    });
  };

  return (
    <>
      <Modal show={show}>
        {showError && <AlertDanger />}
        <Modal.Header>
          <Modal.Title>Change The Component</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Admin Password</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  className="position-relative rounded-end "
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoFocus
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="outline-dark" onClick={handleReceptionModel}>
            {user.reception ? "Leave The Reception" : "Go To Reception"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalReception;
