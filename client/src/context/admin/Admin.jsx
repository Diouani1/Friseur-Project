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
    { id: 1, name: "Haircut", price: "20" },
    { id: 2, name: "Shave", price: "15" },
    { id: 3, name: "Beard Trim", price: "10" },
    { id: 4, name: "Wash Hair", price: "25" },
    { id: 5, name: "Facial Massage", price: "30" },
    { id: 6, name: "Hair Styling", price: "25" },
    { id: 7, name: "Hot Towel Treatment", price: "15" },
    { id: 8, name: "Head Shave", price: "18" },
    { id: 9, name: "Neck Trim", price: "8" },
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
        console.log(error);
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
