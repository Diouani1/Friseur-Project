import { useContext } from "react";
import { UserContext } from "../../context/user/User";
import AdminMain from "../admin/AdminMain";
import EmployerMain from "../employer/EmployerMain";
import CustomerMain from "../customer/CustomerMain";

const Role = () => {
  const { user } = useContext(UserContext);

  if (user.role === "admin") return <AdminMain />;
  if (user.role === "employer") return <EmployerMain />;

  return <CustomerMain />;
};

export default Role;
