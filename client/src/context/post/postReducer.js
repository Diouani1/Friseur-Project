async function reducer(prev, action) {
  // // add new post

  if (action.type === "add-post") {
    try {
      const formData = new FormData();
      formData.append("title", action.title);
      formData.append("content", action.content);
      if (action.selectedFile) {
        formData.append("postPicture", action.selectedFile);
      }
      if (action.selectedVideo) {
        formData.append("postVideo", action.selectedVideo);
      }

      const response = await fetch(`/api/post/add-post`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        action.setOnOff(false);
        action.setUpdate(!action.update);
        action.setTitle("");
        action.setContent("");
        action.setLoading(false);
        return;
      }
      throw new Error(result.message);
    } catch (error) {
      action.setErrorMessage(error.message);
      action.setShowError(true);
      action.setLoading(false);
    }
  }

  //  updating post
  if (action.type === "update-post") {
    try {
      const data = {
        title: action.title,
        content: action.content,
        postId: action.postId,
      };

      const response = await fetch(`/api/post/update-post`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        action.setUpdate(!action.update);
        action.setUpdatePost("");
        action.setOnOff(false);
        return;
      }
      throw new Error(result.message);
    } catch (error) {
      action.setErrorMessage(error.message);
      action.setShowError(true);
    }
  }
  // updating like in post
  if (action.type === "update-likes") {
    try {
      const data = {
        id: action.post._id,
        like: action.like,
        dislike: action.dislike,
      };

      const response = await fetch(`/api/post/update-like`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        action.setUpdate(!action.update);
        action.setShowGetPostError(false);

        return;
      }
      throw new Error(result.message);
    } catch (error) {
      action.setGetPostError(error.message);
      action.setShowGetPostError(true);
    }
  }
  // updating like in comment

  if (action.type === "update-like-comment") {
    try {
      const data = {
        postId: action.postId,
        commentId: action.item._id,
        like: action.like,
        dislike: action.dislike,
      };

      const response = await fetch(`/api/post/update-like-comment`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        action.setUpdate(!action.update);
        action.setShowGetPostError(false);

        return;
      }
      throw new Error(result.message);
    } catch (error) {
      action.setGetPostError(error.message);
      action.setShowGetPostError(true);
    }
  }
  // updating like in reply comment

  if (action.type === "update-like-reply-comment") {
    try {
      const data = {
        postId: action.postId,
        commentId: action.commentId,
        replyCommentId: action.item._id,
        like: action.like,
        dislike: action.dislike,
      };

      const response = await fetch(`/api/post/update-like-reply-comment`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        action.setUpdate(!action.update);
        action.setShowGetPostError(false);

        return;
      }
      throw new Error(result.message);
    } catch (error) {
      action.setGetPostError(error.message);
      action.setShowGetPostError(true);
    }
  }

  // adding comment
  if (action.type === "add-comment") {
    try {
      const data = {
        id: action.postId,
        comment: action.newComment,
      };

      const response = await fetch(`/api/post/add-comment`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        action.setUpdate(!action.update);
        action.setNewComment("");
        action.setShowGetPostError(false);

        return;
      }
      throw new Error(result.message);
    } catch (error) {
      action.setGetPostError(error.message);
      action.setShowGetPostError(true);
    }
  }
  // adding reply comment
  if (action.type === "add-reply-comment") {
    try {
      const data = {
        postId: action.postId,
        commentId: action.commentId,
        comment: action.replyComment,
      };

      const response = await fetch(`/api/post/add-reply-comment`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        action.setUpdate(!action.update);
        action.setReplyComment("");
        action.setShowGetPostError(false);

        return;
      }
      throw new Error(result.message);
    } catch (error) {
      action.setGetPostError(error.message);
      action.setShowGetPostError(true);
    }
  }
  //  delete post

  if (action.type === "delete-post") {
    try {
      let mediaName = "";
      if (
        action.post.postPicture &&
        action.post.postPicture.fieldname === "postPicture"
      ) {
        mediaName = action.post.postPicture.filename;
      } else if (
        action.post.postVideo &&
        action.post.postVideo.fieldname === "postVideo"
      ) {
        mediaName = action.post.postVideo.filename;
      }

      const response = await fetch(`/api/post/delete-post`, {
        method: "DELETE",
        body: JSON.stringify({
          postId: action.post._id,
          mediaName: mediaName,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const result = await response.json();
      if (response.ok) {
        action.setUpdate(!action.update);
        action.setShowDeleteModal(false);
        action.setShowGetPostError(false);
        return;
      }

      throw new Error(result.message);
    } catch (error) {
      action.setGetPostError(error.message);
      action.setShowGetPostError(true);
    }
  }

  //  delete comment
  if (action.type === "delete-comment") {
    try {
      const data = {
        postId: action.postId,
        commentId: action.item._id,
      };
      const response = await fetch(`/api/post/delete-comment`, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        action.setUpdate(!action.update);
        action.setShowGetPostError(false);
        return;
      }
      throw new Error(result.message);
    } catch (error) {
      action.setGetPostError(error.message);
      action.setShowGetPostError(true);
    }
  }
  //  delete reply comment
  if (action.type === "delete-reply-comment") {
    try {
      const data = {
        postId: action.postId,
        commentId: action.commentId,
        replyCommentId: action.item._id,
      };
      const response = await fetch(`/api/post/delete-reply-comment`, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        action.setUpdate(!action.update);
        action.setShowGetPostError(false);
        return;
      }
      throw new Error(result.message);
    } catch (error) {
      action.setGetPostError(error.message);
      action.setShowGetPostError(true);
    }
  }
}
export default reducer;
