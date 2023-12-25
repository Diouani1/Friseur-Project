import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import dotenv from "dotenv";
dotenv.config();

const app = initializeApp({
  apiKey: process.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.PUBLIC_FIREBASE_MEASUREMENT_ID,
});
const storage = getStorage(app, process.env.PUBLIC_FIREBASE_STORAGE_URL);

export const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);
  return `${getFile.originalname}-${timeStamp}-${randomStringValue}`;
};

export const uploadImageToFirebase = async (file) => {
  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `profile-pictures/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file.buffer, {
    contentType: file.mimetype,
  });

  await uploadImage;
  const downloadUrl = await getDownloadURL(storageReference);

  return downloadUrl;
};

export const uploadPostToFirebase = async (file) => {
  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `post-media/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file.buffer, {
    contentType: file.mimetype,
  });

  await uploadImage;
  const downloadUrl = await getDownloadURL(storageReference);

  return downloadUrl;
};

export const deleteImageFromFirebase = async (imageUrl) => {
  const storageRef = ref(storage, imageUrl);

  try {
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};
