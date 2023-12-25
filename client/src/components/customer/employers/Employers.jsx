import { useContext } from "react";
import { Button, Image } from "react-bootstrap";
import { UserContext } from "../../../context/user/User";
import { AdminContext } from "../../../context/admin/Admin";
import Avatar from "../../../assets/avatar.jpg";

const Employers = () => {
  const { setComponent, setShowError } = useContext(UserContext);
  const { employerCard, setSelectedEmployer } = useContext(AdminContext);
  const handleClikedEmployer = (employer) => {
    setSelectedEmployer(employer);
    setComponent("employer-card");
  };

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="p-4 shadow-lg rounded border border-gray-300 bg-white w-100">
          <h5
            style={{ color: "darkblue" }}
            className="mb-4 text-center font-weight-bold"
          >
            Employers
          </h5>
          <div>
            {employerCard &&
              employerCard.map((employer) => (
                <div className="d-flex" key={employer._id}>
                  {console.log("first :", employer)}
                  <Button
                    variant="outline-light"
                    style={{ color: "black" }}
                    onClick={() => handleClikedEmployer(employer)}
                  >
                    <Image
                      src={
                        employer.imgProfile.path
                          ? employer.imgProfile.path
                          : Avatar
                      }
                      style={{ width: "3rem", borderRadius: "50%" }}
                    />
                  </Button>
                  <Button
                    variant="outline-link"
                    onClick={() => handleClikedEmployer(employer)}
                  >
                    {employer.userName}
                  </Button>
                </div>
              ))}
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

export default Employers;
