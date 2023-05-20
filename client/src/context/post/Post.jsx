import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import reducer from "./postReducer";
export const PostContext = createContext();

function Post({ children }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [state, postDispatch] = useReducer(reducer, {});
  const [posts, setPosts] = useState([]);
  const [getPostError, setGetPostError] = useState("");
  const [showGetPostError, setShowGetPostError] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatePost, setUpdatePost] = useState("");

  useEffect(() => {
    fetch("/api/post/get-all-post")
      .then((response) => response.json())
      .then((result) => {
        if (Array.isArray(result)) {
          setPosts(result);
          return;
        }
        throw new Error(result.message);
      })
      .catch((error) => {
        setGetPostError(error.message);
        setShowGetPostError(true);
      });
  }, [update]);
  return (
    <PostContext.Provider
      value={{
        postDispatch,
        title,
        setTitle,
        content,
        setContent,
        posts,
        setPosts,
        showGetPostError,
        setShowGetPostError,
        getPostError,
        setGetPostError,
        update,
        setUpdate,
        updatePost,
        setUpdatePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
export default Post;
