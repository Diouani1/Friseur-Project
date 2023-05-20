import React, { useContext } from "react";
import { Button, Modal, Card, ListGroup } from "react-bootstrap";
import { AdminContext } from "../../../context/admin/Admin";

const ModalReceipt = () => {
  const { showReceiptModal, setShowReceiptModal, receiptData } =
    useContext(AdminContext);
  const handleClose = () => setShowReceiptModal(false);
  return (
    <div>
      <Modal
        show={showReceiptModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Receipts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="p-4 shadow-lg rounded border border-gray-300 bg-white w-100">
              {receiptData &&
                receiptData.map((item, index) => (
                  <Card key={item._id} className="mb-3">
                    <Card.Header>Order # {index + 1}</Card.Header>
                    <Card.Body>
                      <ListGroup>
                        {item.services.map((service, i) => (
                          <ListGroup.Item
                            key={i}
                            className="d-flex justify-content-between"
                          >
                            <span> {service.name}</span>
                            <span>{service.price} € </span>
                          </ListGroup.Item>
                        ))}
                        <ListGroup.Item className="d-flex justify-content-between">
                          <span>Total Price</span>
                          <span style={{ color: "blue" }}>
                            {item.totalePrice} €
                          </span>
                        </ListGroup.Item>
                      </ListGroup>
                      {item.employer && (
                        <Card.Footer>
                          <h6> {item.fullName.toUpperCase()}</h6>
                        </Card.Footer>
                      )}
                    </Card.Body>
                  </Card>
                ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowReceiptModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalReceipt;
