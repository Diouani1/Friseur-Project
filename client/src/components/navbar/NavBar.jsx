import "./navbar.css";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../../context/user/User";
import { useContext } from "react";
import Main from "../main/Main";
import VerfiyOTP from "../user/forgotPassword/OtpForm";
import Recovered from "../user/forgotPassword/Recovered";
import ResetPassword from "../user/forgotPassword/ResetPassword";
import SingUser from "../user/SignUser";
import { AdminContext } from "../../context/admin/Admin";
const NavBar = () => {
  const {
    user,
    setUser,
    component,
    onOff,
    setOnOff,
    navigate,
    setShowAppointmentModal,
  } = useContext(UserContext);
  const { show, setShow } = useContext(AdminContext);
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
  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    setUser(null);
  };

  return (
    <div className="gb-nav">
      <Navbar
        fixed="top"
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
            <Offcanvas.Body className="d-flex flex-column justify-content-between">
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
              <Nav>
                {user && (
                  <Button
                    variant="outline-dark"
                    style={{
                      borderTop: "none",
                      borderRight: "none",
                      marginTop: "1.5rem",
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <div className="">
            {!user ? (
              <Button variant="outline-light">Login</Button>
            ) : user.role === "admin" ? (
              <Button variant="outline-light" onClick={() => setShow(true)}>
                Go to Reception
              </Button>
            ) : user.role === "user" ? (
              <Button
                variant="outline-light"
                onClick={() => setShowAppointmentModal(true)}
              >
                Book Appointment
              </Button>
            ) : user.role === "employer" ? (
              <Button
                variant="outline-light"
                onClick={() => setShowAppointmentModal(true)}
              >
                Check Appointment
              </Button>
            ) : null}
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
