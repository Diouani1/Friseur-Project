import { useContext } from "react";
import { UserContext } from "../../context/User";
import Admin from "../admin/Admin";
import Employer from "../employer/Employer";
import Customer from "../customer/Customer";

const Role = () => {
  const { user } = useContext(UserContext);

  if (user.role === "admin") return <Admin />;
  if (user.role === "employer") return <Employer />;

  return <Customer />;
};

export default Role;
