import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export const getSliders = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "sliders"));
    if (!querySnapshot) {
      throw new Error("Something went wrong", error);
    }
    const sliders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    return sliders;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export const getCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "categories"));
    if (!querySnapshot) {
      throw new Error("Something went wrong", error);
    }
    const categories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    return categories;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};
