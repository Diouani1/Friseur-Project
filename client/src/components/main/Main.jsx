import "./main.css";
import React from "react";
import UserProfile from "../user/profile/UserProfile";
import UpdateProfile from "../user/updateProfile/UpdateProfile";
import { Route, Routes } from "react-router-dom";
import Role from "../role/Role";
import ModalReception from "../admin/modal/ModalReception";

const Main = () => {
  return (
    <div className="main">
      <UserProfile />
      <ModalReception />
      <Routes>
        <Route path="/" element={<Role />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
      </Routes>
    </div>
  );
};

export default Main;
