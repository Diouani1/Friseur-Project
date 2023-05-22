import React, { useContext, useEffect } from "react";
import CustomerNav from "./customernav/CustomerNav";
import { UserContext } from "../../context/user/User";
import AboutUs from "./aboutus/AboutUs";
import Employers from "./employers/Employers";
import SocialMedia from "./socialmedia/SocialMedia";
import UserAppointment from "./userappointment/UserAppointment";
import FeedBack from "./feedback/FeedBack";
import CardInfo from "./employers/card/CardInfo";

const CustomerMain = () => {
  const { setComponent, component } = useContext(UserContext);

  useEffect(() => setComponent("customer-nav"), []);
  return (
    <div>
      {component === "customer-nav" ? <CustomerNav /> : null}
      {component === "about-us" ? <AboutUs /> : null}
      {component === "appointment" ? <UserAppointment /> : null}
      {component === "employer" ? <Employers /> : null}
      {component === "following-us" ? <SocialMedia /> : null}
      {component === "feed-back" ? <FeedBack /> : null}
      {component === "employer-card" ? <CardInfo /> : null}
    </div>
  );
};

export default CustomerMain;
