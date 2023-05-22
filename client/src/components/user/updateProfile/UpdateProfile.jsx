import { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import ChangeProfilePicture from "./changeProfilePicture/ChangeProfilePicture";
import { UserContext } from "../../../context/user/User";
import ChangePassword from "./changePassword/ChangePassword";
import ChangeName from "./changeName/ChangeName";
const UpdateProfile = () => {
  const { component, setComponent, user, setShowDeleteAcountModal } =
    useContext(UserContext);

  const handleClick = (componentName) => {
    setComponent(componentName);
  };

  useEffect(() => setComponent("multi"), []);

  return (
    <div style={{ marginTop: "1rem" }}>
      {component === "multi" ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="p-4 shadow-lg rounded border border-gray-300 bg-white w-100">
            <div className="d-grid gap-4 ">
              <Button
                variant="outline-link"
                onClick={() => handleClick("updatepicture")}
                style={{ borderBottom: "2px solid", borderLeft: "2px solid" }}
              >
                Change Picture
              </Button>
              <Button
                variant="outline-link"
                onClick={() => handleClick("changepassword")}
                style={{ borderBottom: "2px solid", borderLeft: "2px solid" }}
              >
                Change Password
              </Button>
              <Button
                variant="outline-link"
                onClick={() => handleClick("change-username")}
                style={{ borderBottom: "2px solid", borderLeft: "2px solid" }}
              >
                Change UserName
              </Button>
              {user && user.role === "user" ? (
                <Button
                  variant="outline-link"
                  onClick={() => setShowDeleteAcountModal(true)}
                  style={{
                    borderBottom: "2px solid",
                    borderLeft: "2px solid",
                  }}
                >
                  Delete Acount
                </Button>
              ) : null}
            </div>
          </div>
        </div>
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
      {component === "change-username" ? (
        <div>
          <ChangeName />
        </div>
      ) : null}
    </div>
  );
};

export default UpdateProfile;
