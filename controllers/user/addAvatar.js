import User from "../../models/User.js";
import creatErr from "http-errors";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: "friseur-jalouka",
  keyFilename: "./google_credentials.json",
});

const bucketName = "profile-jalouka-bucket";
const bucket = storage.bucket(bucketName);

const addAvatar = async (req, res, next) => {
  const oldProfilePicture = req.body.oldProfilePicture;

  try {
    if (oldProfilePicture) {
      const file = bucket.file(oldProfilePicture);
      await file.delete();
    }
    const updateUser = await User.findOneAndUpdate(
      { _id: req.userId },
      {
        imgProfile: {
          fieldname: "avatar",
          originalname: "avatar",
          mimetype: "image/jng",
          filename: "avatar.jpg",
          path: "gs://profile-jalouka-bucket/avatar.jpg",
          size: 0,
        },
      },
      { new: true }
    );

    res.send(updateUser);
  } catch (error) {
    next(creatErr(401, error));
  }
};
export { addAvatar };
