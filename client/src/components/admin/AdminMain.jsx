import { useContext, useEffect } from "react";
import AdminNav from "./adminnav/AdminNav";
import AddEmployer from "./addemployer/AddEmployer";
import { UserContext } from "../../context/user/User";
import RemoveEmployer from "./removeemployer/RemoveEmployer";
import GetReceipt from "./getreceipt/GetReceipt";
import ModalReceipt from "./modal/ModalReceipt";
import AddPostForm from "../post/addpost/AddPostForm";
import UpdatePost from "../post/addpost/update/UpdatePost";
import { PostContext } from "../../context/post/Post";

const AdminMain = () => {
  const { component, setComponent } = useContext(UserContext);
  const { updatePost } = useContext(PostContext);
  useEffect(
    () => (updatePost ? setComponent("update-post") : setComponent("adminnav")),
    []
  );

  return (
    <div className="">
      <ModalReceipt />
      {component === "adminnav" ? <AdminNav /> : null}
      {component === "addemployer" ? <AddEmployer /> : null}
      {component === "removeemployer" ? <RemoveEmployer /> : null}
      {component === "getreceipt" ? <GetReceipt /> : null}
      {component === "addnewpost" ? <AddPostForm /> : null}
      {component === "update-post" ? <UpdatePost /> : null}
    </div>
  );
};

export default AdminMain;
