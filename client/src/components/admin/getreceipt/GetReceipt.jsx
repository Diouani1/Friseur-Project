import { useContext, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { AdminContext } from "../../../context/admin/Admin";
import { UserContext } from "../../../context/user/User";
import DatePicker from "react-datepicker";

const GetReceipt = () => {
  const { adminDispatch, employerCard, setReceiptData, setShowReceiptModal } =
    useContext(AdminContext);
  const {
    setLastComponent,
    setComponent,
    setShowError,
    setErrorMessage,
    setOnOff,
  } = useContext(UserContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState("");
  const [selectedEmployer, setSelectedEmployer] = useState("");

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  const handleEmployerChange = (e) => {
    setSelectedEmployer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedEmployer) {
      adminDispatch({
        type: "get-receipt-of-employer",
        startDate,
        endDate,
        selectedEmployer,
        setReceiptData,
        setShowReceiptModal,
        setErrorMessage,
        setShowError,
        setOnOff,
      });
      return;
    }
    // Send the selected start and end dates to the backend
    adminDispatch({
      type: "get-receipt",
      startDate,
      endDate,
      setReceiptData,
      setShowReceiptModal,
      setErrorMessage,
      setShowError,
      setOnOff,
    });
  };
  useEffect(() => setLastComponent("adminnav"), []);

  return (
    <div style={{ marginTop: "1rem", color: "darkblue" }}>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="p-4 shadow-lg rounded border border-gray-300 bg-white w-100">
          <h5 className="mb-4 text-center font-weight-bold">Get Receipt</h5>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="startDate" className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                className="form-control"
                dateFormat="yyyy-MM-dd"
                required
              />
            </Form.Group>

            <Form.Group controlId="endDate" className="mb-3">
              <Form.Label>End Date</Form.Label>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                className="form-control"
                dateFormat="yyyy-MM-dd"
                required
              />
            </Form.Group>
            <Form.Group controlId="employer" className="mb-3">
              <Form.Label>Choose Employer</Form.Label>
              <Form.Select
                value={selectedEmployer}
                onChange={handleEmployerChange}
              >
                <option value="">Select an employer</option>
                {employerCard &&
                  employerCard.map((employer) => (
                    <option value={employer._id} key={employer._id}>
                      {employer.fullName}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <div className="d-grid gap-2 ">
              <Button
                variant="outline-primary"
                type="submit"
                // className="btn btn-primary "
              >
                Get Receipts
              </Button>

              <Button
                variant="outline-secondary"
                onClick={() => {
                  setComponent("adminnav");
                  setShowError(false);
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

export default GetReceipt;
