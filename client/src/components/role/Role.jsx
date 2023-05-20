import { useContext } from "react";
import { UserContext } from "../../context/user/User";
import AdminMain from "../admin/AdminMain";
import Employer from "../employer/Employer";
import Customer from "../customer/Customer";

const Role = () => {
  const { user } = useContext(UserContext);

  if (user.role === "admin") return <AdminMain />;
  if (user.role === "employer") return <Employer />;

  return <Customer />;
};

export default Role;
