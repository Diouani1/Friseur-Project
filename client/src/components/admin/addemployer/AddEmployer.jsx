import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { UserContext } from "../../../context/user/User";
import { AdminContext } from "../../../context/admin/Admin";
import AlertSuccess from "../../alert/AlertSuccess";

const AddEmployer = () => {
  const {
    setComponent,
    setErrorMessage,
    setSuccessMessage,
    showSuccess,
    setShowSuccess,
    setShowError,
    setLastComponent,
  } = useContext(UserContext);
  const {
    adminDispatch,
    employer,
    setEmployer,
    employerCard,
    setEmployerCard,
  } = useContext(AdminContext);
  // storing data from input of user
  const handlChange = (e) => {
    setEmployer({ ...employer, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(employer);
    adminDispatch({
      type: "addemployer",
      employer,
      setErrorMessage,
      setSuccessMessage,
      setShowSuccess,
      setShowError,
      employerCard,
      setEmployerCard,
    });
  };
  useEffect(() => setLastComponent("adminnav"), []);
  return (
    <div style={{ marginTop: "1rem", color: "darkblue" }}>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="p-4 shadow-lg rounded border border-gray-300 bg-white w-100">
          <h5 className="mb-4 text-center font-weight-bold">
            Add new Employer
          </h5>
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
                  value={employer.fullName}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter full name"
                  name="userName"
                  onChange={handlChange}
                  value={employer.userName}
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
                  value={employer.email}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  required
                  name="role"
                  value={employer.role}
                  onChange={handlChange}
                >
                  <option value="employer">Employer</option>
                  <option value="admin">Admin</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Telephone</Form.Label>
                <Form.Control
                  required
                  pattern="[0-9]*"
                  type="tel"
                  name="telephone"
                  placeholder="Enter telephone number"
                  value={employer.telephone}
                  onChange={(e) =>
                    setEmployer({
                      ...employer,
                      [e.target.name]: e.target.value.replace(/\D/, ""),
                    })
                  }
                />
              </Form.Group>

              <div className="d-grid gap-2 ">
                <Button type="submit" variant="outline-primary">
                  Submit
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setComponent("adminnav");
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
    </div>
  );
};

export default AddEmployer;
