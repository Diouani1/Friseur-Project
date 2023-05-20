import React, { useContext, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../../../../context/user/User";
import AlertSuccess from "../../../alert/AlertSuccess";

const ChangeName = () => {
  const {
    setComponent,
    user,
    setUser,
    userDispatch,
    setErrorMessage,
    setSuccessMessage,
    showSuccess,
    setShowSuccess,
    setShowError,
    setLastComponent,
  } = useContext(UserContext);

  const [changeName, setChangeName] = useState({
    fullName: user.fullName,
    userName: user.userName,
  });
  // storing data from input of user
  const handlChange = (e) => {
    setChangeName({ ...changeName, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    userDispatch({
      type: "changeNames",
      changeName,
      setUser,
      setErrorMessage,
      setSuccessMessage,
      setShowSuccess,
      setShowError,
    });
  };
  useEffect(() => setLastComponent("multi"), []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="p-4 shadow-lg rounded border border-gray-300 bg-white ">
        {showSuccess ? (
          <AlertSuccess />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter full name"
                name="fullName"
                onChange={handlChange}
                value={changeName.fullName}
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
                value={changeName.userName}
              />
            </Form.Group>
            <div className="d-grid gap-2 ">
              <Button type="submit" className="btn btn-primary ">
                Submit Change
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
};

export default ChangeName;
