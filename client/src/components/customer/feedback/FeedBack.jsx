import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../../../context/user/User";

const FeedBack = () => {
  const { setComponent, setShowError } = useContext(UserContext);
  const [feedBack, setFeedBack] = useState("");

  const handleFeedBack = (e) => {
    e.preventDefault();
  };
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="p-4 shadow-lg rounded border border-gray-300 bg-white w-100">
          <h5
            style={{ color: "darkblue" }}
            className="mb-4 text-center font-weight-bold"
          >
            Feed Back
          </h5>
          <Form onSubmit={handleFeedBack}>
            <Form.Group controlId="formContent" className="mb-3">
              <Form.Label>Your openion is important</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter content"
                value={feedBack}
                onChange={(e) => setFeedBack(e.target.value)}
              />
            </Form.Group>
            <div className="d-grid gap-4 ">
              <Button
                type="submit"
                variant="outline-dark"
                style={{
                  borderBottom: "2px solid #ced4da",
                  borderLeft: "2px solid #ced4da",
                  borderTop: "none",
                  borderRight: "none",
                }}
              >
                Submit
              </Button>
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
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FeedBack;
