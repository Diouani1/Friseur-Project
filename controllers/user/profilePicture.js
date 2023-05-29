import User from "../../models/User.js";
import creatErr from "http-errors";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: "friseur-jalouka",
  keyFilename: "./google_credentials.json",
});

const bucketName = "profile-jalouka-bucket";
const bucket = storage.bucket(bucketName);

const profilePicture = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    const file = bucket.file(user.imgProfile.filename);
    const fileStream = file.createReadStream();

    fileStream.pipe(res);
  } catch (error) {
    next(creatErr(404, error));
  }
};

export { profilePicture };
