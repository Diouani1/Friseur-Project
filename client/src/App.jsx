import "./App.css";
import React, { useContext } from "react";
import NavBar from "./components/navbar/NavBar";
import Reception from "./components/admin/reception/Reception";
import { UserContext } from "./context/user/User";
import { PostContext } from "./context/post/Post";
import GetPost from "./components/post/getpost/GetPost";
import AlertPostError from "./components/alert/AlertPostError";
import AppointmentModal from "./components/appointmentcomponent/AppointmentModal";
import DeleteAccount from "./components/customer/modal/DeleteAccountModale";

const App = () => {
  const { posts } = useContext(PostContext);
  const { user } = useContext(UserContext);
  if (user) {
    if (user.reception) return <Reception />;

    return (
      <div className="app hide-scrollbar">
        <NavBar />
        <AlertPostError />
        <AppointmentModal />
        <DeleteAccount />

        <div style={{ marginTop: "5rem" }}>
          {posts && posts.map((post) => <GetPost key={post._id} post={post} />)}
        </div>
      </div>
    );
  }
  return (
    <div className="app">
      <NavBar />
      <AlertPostError />

      <div style={{ marginTop: "5rem" }}>
        {posts.map((post) => (
          <GetPost key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default App;
