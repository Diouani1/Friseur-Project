import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import reducer from "./adminReducer";

export const AdminContext = createContext();

function Admin({ children }) {
  const [employer, setEmployer] = useState({
    fullName: "",
    userName: "",
    email: "",
    role: "employer",
    telephone: "",
  });
  const [services] = useState([
    { name: "Haircut", price: "20" },
    { name: "Shave", price: "15" },
    { name: "Beard Trim", price: "10" },
    { name: "Haircut", price: "20" },
    { name: "Shave", price: "15" },
    { name: "Beard Trim", price: "10" },
    { name: "Haircut", price: "20" },
    { name: "Shave", price: "15" },
    { name: "Beard Trim", price: "10" },
  ]);
  const [worker, setWorker] = useState("");
  const [state, adminDispatch] = useReducer(reducer, {});
  const [employerCard, setEmployerCard] = useState([]);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [receiptData, setReceiptData] = useState("");
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // get all employer from data base
  useEffect(() => {
    fetch("/api/admin/get-all-employer")
      .then((response) => response.json())
      .then((result) => setEmployerCard(result))
      .catch((error) => {
        setErrorMessage(error.message);
        setShowError(true);
      });
  }, []);

  return (
    <AdminContext.Provider
      value={{
        adminDispatch,
        employer,
        setEmployer,
        show,
        setShow,
        employerCard,
        setEmployerCard,
        modalShow,
        setModalShow,
        services,
        worker,
        setWorker,
        selectedEmployer,
        setSelectedEmployer,
        receiptData,
        setReceiptData,
        showReceiptModal,
        setShowReceiptModal,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export default Admin;
