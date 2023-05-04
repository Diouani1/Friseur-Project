import { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import ChangeProfilePicture from "./changeProfilePicture/ChangeProfilePicture";
import { UserContext } from "../../../context/User";
import ChangePassword from "./changePassword/ChangePassword";
const UpdateProfile = () => {
  const { component, setComponent } = useContext(UserContext);
  //   const [component, setActiveComponent] = useState("multi");

  const handleClick = (componentName) => {
    setComponent(componentName);
  };

  const handleCancel = () => {
    setComponent("multi");
  };
  useEffect(() => setComponent("multi"), []);

  return (
    <div style={{ marginTop: "1rem" }}>
      {component === "multi" ? (
        <ButtonGroup className="d-flex flex-column justify-content-center align-items-start">
          <Button variant="link" onClick={() => handleClick("updatepicture")}>
            Change Picture
          </Button>
          <Button variant="link" onClick={() => handleClick("changepassword")}>
            Change Password
          </Button>
          <Button variant="link" onClick={() => handleClick("component3")}>
            Change UserName
          </Button>
        </ButtonGroup>
      ) : null}
      {component === "updatepicture" ? (
        <div>
          <ChangeProfilePicture />
        </div>
      ) : null}
      {component === "changepassword" ? (
        <div>
          <ChangePassword />
        </div>
      ) : null}
      {component === "component3" ? (
        <div>
          <h2>Component 3</h2>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default UpdateProfile;
