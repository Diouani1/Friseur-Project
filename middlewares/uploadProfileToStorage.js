import createError from "http-errors";
import { uploadImageToFirebase } from "../firebase/index.js";

const uploadProfileToStorage = async (req, res, next) => {
  const profilePicture = req.file;
  try {
    const { fieldname, originalname, mimetype, size } = profilePicture;

    const newFileName = `${Date.now()}-${originalname}`;

    const firebasePath = await uploadImageToFirebase(profilePicture);
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
      next();
    }
  } catch (error) {
    next(createError(401, error));
  }
};

export default uploadProfileToStorage;
