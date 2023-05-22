import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/user/User";
import { PostContext } from "../../context/post/Post";
import UpdatePost from "../post/addpost/update/UpdatePost";
import AddPostForm from "../post/addpost/AddPostForm";
import EmployerNav from "./employernav/EmployerNav";

const EmployerMain = () => {
  const { component, setComponent } = useContext(UserContext);
  const { updatePost } = useContext(PostContext);
  useEffect(
    () =>
      updatePost ? setComponent("update-post") : setComponent("employer-nav"),
    []
  );
  return (
    <div>
      {component === "employer-nav" ? <EmployerNav /> : null}
      {component === "add-post" ? <AddPostForm /> : null}
      {component === "booked-appointment" ? <EmployerNav /> : null}
      {component === "update-post" ? <UpdatePost /> : null}
    </div>
  );
};

export default EmployerMain;
