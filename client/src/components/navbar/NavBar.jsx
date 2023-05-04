import "./navbar.css";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../../context/User";
import { useContext } from "react";
import Main from "../main/Main";
import VerfiyOTP from "../user/forgotPassword/OtpForm";
import Recovered from "../user/forgotPassword/Recovered";
import ResetPassword from "../user/forgotPassword/ResetPassword";
import SingUser from "../user/SignUser";
const NavBar = () => {
  const { user, component, onOff, setOnOff, navigate } =
    useContext(UserContext);

  function toggleOffOn() {
    setOnOff(!onOff);
    navigate("/");
  }
  const NewPasswordComponent = () => {
    if (component === "verfi-password") return <VerfiyOTP />;
    if (component === "recoved-password") return <Recovered />;
    if (component === "reset-password") return <ResetPassword />;
    return <VerfiyOTP />;
  };
  return (
    <div className="gb-nav">
      <Navbar
        expand={false}
        className="p-2 mb-1 bg bg-nav  "
        style={{ width: "100%", margin: "0" }}
      >
        <Container fluid>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-false`}
            onClick={toggleOffOn}
            style={{ color: "black", backgroundColor: "white" }}
          />

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-false`}
            aria-labelledby={`offcanvasNavbarLabel-expand-false`}
            placement="start"
            show={onOff}
            onHide={toggleOffOn}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav>
                <div className="">
                  {!user ? (
                    <Routes>
                      <Route path="/" element={<SingUser />} />
                      <Route
                        path="/forgot-password"
                        element={<NewPasswordComponent />}
                      />
                    </Routes>
                  ) : (
                    <Main />
                  )}
                </div>
              </Nav>
              <Nav></Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <div className="">
            <Button>Log out</Button>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
