import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore";
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

export const getPetsByCategory = async (category) => {
  try {
    const queryPets = query(
      collection(db, "pets"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(queryPets);
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

export const getUserFavorites = async (email) => {
  try {
    const queryFavorites = query(
      collection(db, "userFavPets"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(queryFavorites);
    if (!querySnapshot) {
      throw new Error("Something went wrong", error);
    }
    const document = querySnapshot.docs[0];
    const docData = document.data();
    const userFavorites = docData.favorites;
    return userFavorites;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export const updateUserFavorites = async (data) => {
  try {
    const { email, newFavorites } = data;

    const queryData = query(
      collection(db, "userFavPets"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(queryData);
    if (!querySnapshot) {
      throw new Error("Document not found");
    }
    const docRef = querySnapshot.docs[0].ref;

    const newFavArray = newFavorites.map((favorite) => ({
      name: favorite.name,
      image: favorite.image,
      breed: favorite.breed,
      age: favorite.age
    }));

    await updateDoc(docRef, {
      favorites: newFavArray
    });
    return Promise.resolve(true);
  } catch (error) {
    console.error(error);
    return Promise.reject(error.message);
  }
};
