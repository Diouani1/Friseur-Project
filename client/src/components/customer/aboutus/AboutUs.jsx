import { useContext } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "../../../context/user/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faPhone as solidPhone,
  faEnvelope as solidEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const AboutUs = () => {
  const { setComponent, setShowError } = useContext(UserContext);
  const handleWhatsappClick = () => {
    // Replace 'YOUR_PHONE_NUMBER' with the actual phone number
    const phoneNumber = "YOUR_PHONE_NUMBER";
    window.location.href = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
  };

  const handlePhoneClick = () => {
    // Replace 'YOUR_PHONE_NUMBER' with the actual phone number
    const phoneNumber = "YOUR_PHONE_NUMBER";
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = () => {
    // Replace 'YOUR_EMAIL_ADDRESS' with the actual email address
    const emailAddress = "YOUR_EMAIL_ADDRESS";
    window.location.href = `mailto:${emailAddress}`;
  };
  const handleAddressClick = () => {
    const encodedAddress = encodeURIComponent("usedomer strasse berlin");
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapUrl, "_blank");
  };
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="p-4 shadow-lg rounded border border-gray-300 bg-white w-100">
          <h5
            style={{ color: "darkblue" }}
            className="mb-4 text-center font-weight-bold"
          >
            About us
          </h5>

          <div>
            <p className="text-dark" style={{ hyphens: "auto" }}>
              Welcome to our barbershop, where timeless style meets exceptional
              service. With over 10 years of experience, our team of skilled
              barbers is dedicated to providing you with the finest grooming
              experience imaginable.
            </p>
            <h6>Contact us</h6>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                gap: "1rem",
                flexDirection: "column",
              }}
            >
              <div className="d-flex">
                <Button variant="outline-success" onClick={handleWhatsappClick}>
                  <FontAwesomeIcon icon={faWhatsapp} />
                </Button>
                <Button variant="outline-link" onClick={handleWhatsappClick}>
                  01521779988456
                </Button>
              </div>
              <div className="d-flex">
                <Button variant="outline-primary" onClick={handlePhoneClick}>
                  <FontAwesomeIcon icon={solidPhone} />
                </Button>
                <Button variant="outline-link" onClick={handlePhoneClick}>
                  030254866697778
                </Button>
              </div>
              <div className="d-flex">
                <Button variant="outline-dark" onClick={handleEmailClick}>
                  <FontAwesomeIcon icon={solidEnvelope} />
                </Button>
                <Button variant="outline-link" onClick={handleEmailClick}>
                  barber-shop@gmail.com
                </Button>
              </div>
            </div>
            <div className="my-4">
              <h6>Adrress</h6>
              <div className="d-flex">
                <Button variant="outline-dark" onClick={handleAddressClick}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </Button>
                <Button variant="outline-link" onClick={handleAddressClick}>
                  barber-shope str. 33, 13345 Berlin
                </Button>
              </div>
            </div>
          </div>
          <div className="d-grid gap-2  mt-4">
            <Button
              variant="outline-light"
              onClick={() => {
                setComponent("customer-nav");
                setShowError(false);
              }}
              style={{
                borderBottom: "2px solid #ced4da",
                borderLeft: "2px solid #ced4da",
                color: "black",
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
