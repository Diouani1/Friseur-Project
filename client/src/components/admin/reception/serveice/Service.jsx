import "./service.css";
import React, { useContext, useState } from "react";
import { Container, ListGroup, Modal, Button } from "react-bootstrap";
import { AdminContext } from "../../../../context/admin/Admin";
import { UserContext } from "../../../../context/user/User";
import AlertDanger from "../../../alert/AlertDanger";

const Service = () => {
  const { modalShow, setModalShow, services, worker, adminDispatch } =
    useContext(AdminContext);
  const {
    setSuccessMessage,
    setShowSuccess,
    setErrorMessage,
    setShowError,
    showError,
  } = useContext(UserContext);
  const [selectedService, setSelectedService] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleServiceClick = (service) => {
    setSelectedService([...selectedService, service]);
  };
  const handleTotalePrice = () =>
    setTotalPrice(
      selectedService.reduce((total, s) => total + parseInt(s.price), 0)
    );
  const handleCancelerButton = () => {
    setModalShow(false);
    setTotalPrice(0);
    setSelectedService([]);
  };
  const handleSubmit = () => {
    adminDispatch({
      type: "receipt",
      worker,
      selectedService,
      totalPrice,
      setModalShow,
      setSuccessMessage,
      setShowSuccess,
      setErrorMessage,
      setShowError,
      setSelectedService,
      setTotalPrice,
    });
  };

  return (
    <Modal
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {showError && <AlertDanger />}
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {worker.fullName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <ListGroup
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            {services.map((service, index) => (
              <Button
                variant="outline-info"
                key={index}
                active={selectedService.includes(service)}
                onClick={() => handleServiceClick(service)}
                className={`list-group-item ${
                  selectedService.includes(service) ? "clicked" : ""
                } d-flex justify-content-between`}
              >
                <span> {service.name}</span>
                <span>{service.price} € </span>
              </Button>
            ))}

            <div className="d-flex justify-content-between">
              <Button variant="outline-primary" onClick={handleTotalePrice}>
                Total Price
              </Button>
              {totalPrice ? (
                <Button variant="outline-danger" size="lg" disabled>
                  {totalPrice}€
                </Button>
              ) : null}
            </div>
          </ListGroup>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          style={{ marginRight: "auto" }}
          onClick={handleCancelerButton}
        >
          Cancel
        </Button>
        {totalPrice ? (
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
};

export default Service;
