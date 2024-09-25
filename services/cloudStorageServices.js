import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebaseConfig";

export const uploadImage = async (image) => {
  try {
    const response = await fetch(image);
    const blobImage = await response.blob();
    const storageRef = ref(storage, "/pets-images/" + Date.now() + ".jpg");

    const snapshot = await uploadBytes(storageRef, blobImage);
    console.log("File uploaded successfully:");

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
