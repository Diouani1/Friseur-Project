import { Storage } from "@google-cloud/storage";
import createError from "http-errors";

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: "./google_credentials.json",
});

const bucketName = process.env.BUCKET_NAME_PROFILE;
const bucket = storage.bucket(bucketName);

const uploadProfileToStorage = async (req, res, next) => {
  const profilePicture = req.files["profilePicture"];
  try {
    if (profilePicture) {
      const { fieldname, originalname, mimetype, buffer, size } =
        profilePicture[0];

      const newFileName = `${Date.now()}-${originalname}`;
      const fileUpload = bucket.file(newFileName);

      await fileUpload.save(buffer, {
        metadata: {
          contentType: mimetype,
        },
      });

      const filePath = `gs://${bucketName}/${newFileName}`;
      const data = {
        fieldname,
        originalname,
        mimetype,
        filename: newFileName,
        path: filePath,
        size,
      };

      req.uploadedFileData = data;
      next();
    } else {
      next();
    }
  } catch (error) {
    next(createError(401, error));
  }
};

export default uploadProfileToStorage;
