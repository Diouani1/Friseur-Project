import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { UserContext } from "../../../context/User";

function AlertEmail() {
  const { navigate, setEmailAlert, setModeType } = useContext(UserContext);

  const handleAlert = () => {
    setModeType("password");
    navigate("/");
    setEmailAlert(false);
  };
  return (
    <>
      <Alert
        //    show={show}
        variant="warning"
      >
        <Alert.Heading>The email is not exist!</Alert.Heading>
        <p></p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={handleAlert} variant="outline-warning">
            Add your email
          </Button>
        </div>
      </Alert>
    </>
  );
}

export default AlertEmail;
