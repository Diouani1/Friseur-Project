import User from "../../models/User.js";
import creatErr from "http-errors";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: "./google_credentials.json",
});

const bucketName = process.env.BUCKET_NAME_PROFILE;
const bucket = storage.bucket(bucketName);

const authorPicture = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.params.username });

    const file = bucket.file(user.imgProfile.filename);
    const fileStream = file.createReadStream();

    fileStream.pipe(res);
  } catch (error) {
    next(creatErr(404, error));
  }
};
export { authorPicture };
