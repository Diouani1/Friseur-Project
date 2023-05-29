import User from "../../models/User.js";
import creatErr from "http-errors";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: "friseur-jalouka",
  keyFilename: "./google_credentials.json",
});

const bucketName = "profile-jalouka-bucket";
const bucket = storage.bucket(bucketName);

const updateProfilePicture = async (req, res, next) => {
  if (!req.files["profilePicture"]) {
    next(creatErr(401, "please select the file"));
    return;
  }
  const oldProfilePicture = req.body.oldProfilePicture;

  if (oldProfilePicture) {
    const file = bucket.file(oldProfilePicture);
    await file.delete();
  }
  try {
    const updateImg = await User.findOneAndUpdate(
      { _id: req.userId },
      { imgProfile: req.uploadedFileData },
      { new: true }
    );

    res.send(updateImg);
  } catch (error) {
    next(creatErr(401, error));
  }
};
export { updateProfilePicture };
