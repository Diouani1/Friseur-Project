import mongoose from "mongoose";

const { Schema, model } = mongoose;

const pictureSchema = new Schema(
  {
    fieldname: { type: String, required: true },
    originalname: { type: String, required: true },
    mimetype: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
  },
  { _id: false }
);
const videoSchema = new Schema(
  {
    fieldname: { type: String, required: true },
    originalname: { type: String, required: true },
    mimetype: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
  },
  { _id: false }
);
const replyCommentSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "user" },
    comment: { type: String, required: true, trim: true },
    likeReply: [{ type: Schema.Types.ObjectId, ref: "user" }],
    dislikeReply: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

const commentSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "user" },
    comment: { type: String, required: true, trim: true },
    likeComment: [{ type: Schema.Types.ObjectId, ref: "user" }],
    dislikeComment: [{ type: Schema.Types.ObjectId, ref: "user" }],
    replyComments: [{ type: replyCommentSchema }],
  },
  { timestamps: true }
);

const PostSchema = new Schema(
  {
    title: { type: String },
    content: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: "user" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "user" }],
    comments: [{ type: commentSchema }],
    postPicture: { type: pictureSchema },
    postVideo: { type: videoSchema },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    toJSON: {
      transform: function (doc, data) {
        delete data.__v;
        return data;
      },
    },
    timestamps: true,
  }
);

// Define a static method to update the likes and dislikes
PostSchema.statics.updateLikes = async function (
  postId,
  userId,
  liked,
  disliked
) {
  const update = {};
  if (liked) {
    update.$addToSet = { likes: userId };
    update.$pull = { dislikes: userId };
  } else if (disliked) {
    update.$addToSet = { dislikes: userId };
    update.$pull = { likes: userId };
  } else {
    update.$pull = { likes: userId, dislikes: userId };
  }
  const updatedPost = await this.findOneAndUpdate({ _id: postId }, update, {
    new: true,
  });
  return updatedPost;
};
// Define a static method to update the likescoment and dislikescoment

PostSchema.statics.updateLikesComment = async function (
  postId,
  commentId,
  userId,
  liked,
  disliked
) {
  const update = {};
  if (liked) {
    update.$addToSet = { "comments.$[comment].likeComment": userId };
    update.$pull = { "comments.$[comment].dislikeComment": userId };
  } else if (disliked) {
    update.$addToSet = { "comments.$[comment].dislikeComment": userId };
    update.$pull = { "comments.$[comment].likeComment": userId };
  } else {
    update.$pull = {
      "comments.$[comment].likeComment": userId,
      "comments.$[comment].dislikeComment": userId,
    };
  }

  const options = {
    arrayFilters: [{ "comment._id": { $eq: commentId } }],
    new: true,
  };

  const updatedPost = await this.findOneAndUpdate(
    { _id: postId },
    update,
    options
  );
  return updatedPost;
};

// Define a static method to update the likes and dislikes of reply comments
PostSchema.statics.updateLikesReplyComment = async function (
  postId,
  commentId,
  replyCommentId,
  userId,
  liked,
  disliked
) {
  const update = {};
  if (liked) {
    update.$addToSet = {
      "comments.$[comment].replyComments.$[replyComment].likeReply": userId,
    };
    update.$pull = {
      "comments.$[comment].replyComments.$[replyComment].dislikeReply": userId,
    };
  } else if (disliked) {
    update.$addToSet = {
      "comments.$[comment].replyComments.$[replyComment].dislikeReply": userId,
    };
    update.$pull = {
      "comments.$[comment].replyComments.$[replyComment].likeReply": userId,
    };
  } else {
    update.$pull = {
      "comments.$[comment].replyComments.$[replyComment].likeReply": userId,
      "comments.$[comment].replyComments.$[replyComment].dislikeReply": userId,
    };
  }

  const options = {
    arrayFilters: [
      { "comment._id": { $eq: commentId } },
      { "replyComment._id": { $eq: replyCommentId } },
    ],
    new: true,
  };

  const updatedPost = await this.findOneAndUpdate(
    { _id: postId },
    update,
    options
  );
  return updatedPost;
};

const Post = model("post", PostSchema);

export default Post;
