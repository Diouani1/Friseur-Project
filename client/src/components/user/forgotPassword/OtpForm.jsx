import { useState, useContext, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { UserContext } from "../../../context/user/User";
import AlertDanger from "../../alert/AlertDanger";
import AlertSuccess from "../../alert/AlertSuccess";
import AlertEmail from "../../alert/AlertEmail";

export default function () {
  const {
    data,
    otp,
    setOtp,
    setErrorMessage,
    setComponent,
    showError,
    setShowError,
    showSuccess,
    setShowSuccess,
    setSuccessMessage,
    emailAlert,
    setEmailAlert,
  } = useContext(UserContext);
  const [timerCount, setTimer] = useState(30);
  const [OTPinput, setOTPinput] = useState(["", "", "", "", ""]);
  const [disable, setDisable] = useState(true);

  // #####
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    const newOTPinput = [...OTPinput];
    newOTPinput[index] = value;
    setOTPinput(newOTPinput);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  // #####

  async function resendOTP() {
    if (!data.email) {
      setEmailAlert(true);
      return;
    }
    try {
      const resendCode = await fetch(
        `http://localhost:5000/api/user/check-email/${data.email}`
      );
      const code = await resendCode.json();
      if (code.randomInt) setOtp(code.randomInt);
      if (resendCode.ok) {
        setSuccessMessage(
          "A new OTP Code has successfully been sent to your email."
        );
        setShowError(false);
        setShowSuccess(true);
        setDisable(true);
        setTimer(30);
      } else {
        throw new Error("This email address is not registered.");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setShowSuccess(false);
      setShowError(true);
    }
  }

  function verfiyOTP() {
    setShowSuccess(false);
    if (parseInt(OTPinput.join("")) === otp) {
      setShowError(false);
      setComponent("reset-password");
      return;
    }
    setErrorMessage(
      "The code you have entered is not correct, try again or re-send the link"
    );

    setShowError(true);
    return;
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <Container className="d-flex justify-content-center align-items-center ">
      <div className="bg-white  p-5 shadow w-100 max-w-md rounded-2xl">
        {showError && <AlertDanger />}
        {showSuccess && <AlertSuccess />}
        {emailAlert && <AlertEmail />}
        <div className="text-center">
          <h2>Email Verification</h2>
          <p>We have sent a code to your email {data.email}</p>
        </div>
        <Form>
          <Row className="justify-content-center mb-4">
            {OTPinput.map((value, index) => (
              <Col xs={2} key={index} className="mx-1 p-0">
                <Form.Control
                  type="text"
                  maxLength="1"
                  className="text-center"
                  value={value}
                  placeholder="0"
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  ref={(ref) => inputRefs.current.push(ref)}
                />
              </Col>
            ))}
          </Row>
          <div className="d-flex flex-column align-items-center">
            <Button variant="primary" onClick={verfiyOTP}>
              Verify Account
            </Button>
            <div className="my-3 text-center">
              {disable ? (
                <p className="text-muted">Resend OTP in {timerCount}s</p>
              ) : (
                <Button variant="link" onClick={resendOTP}>
                  Resend OTP
                </Button>
              )}
            </div>
          </div>
        </Form>
      </div>
    </Container>
  );
}
