import React, { useContext } from "react";
import ModalReception from "../modal/ModalReception";
import ReceptionNavBar from "./receptionheader/ReceptionHeader";
import EmployerCard from "./employercard/EmployerCard";
import Service from "./serveice/Service";
import AppointmentModal from "../../appointmentcomponent/AppointmentModal";
const Reception = () => {
  return (
    <>
      <ReceptionNavBar />
      <EmployerCard />
      {/* modal and alert */}
      <ModalReception />
      <Service />
      <AppointmentModal />
    </>
  );
};

export default Reception;
