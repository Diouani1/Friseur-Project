import createError from "http-errors";
import { uploadPostToFirebase } from "../firebase/index.js";

const uploadPostToStorage = async (req, res, next) => {
  const postPicture = req.files["postPicture"];
  const postVideo = req.files["postVideo"];
  try {
    if (postPicture || postVideo) {
      const postName = postPicture ? postPicture : postVideo;

      const { fieldname, originalname, mimetype, size } = postName[0];

      const newFileName = `${Date.now()}-${originalname}`;

      const firebasePath = await uploadPostToFirebase(postName[0]);
      if (firebasePath) {
        const data = {
          fieldname,
          originalname,
          mimetype,
          filename: newFileName,
          path: firebasePath,
          size,
        };

        req.uploadedFileData = data;
      }
      next();
    } else {
      next();
    }
  } catch (error) {
    next(createError(401, error));
  }
};

export default uploadPostToStorage;
