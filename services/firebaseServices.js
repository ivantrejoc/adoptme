import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export const setNewPet = async (data) => {
  try {
    const newPetRef = doc(collection(db, "pets"));
    await setDoc(newPetRef, data);
    return { id: newPetRef.id, ...data };
  } catch (error) {
    throw new Error(`Error creating new pet: ${error.message}`);
  }
};

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

export const createNewChat = async (userData, ownerData) => {
  const userEmail = userData.email;
  const ownerEmail = ownerData.email;
  const userName = userData.name;
  const ownerName = ownerData.name;
  const userImageUrl = userData.imageUrl;
  const ownerImageUrl = ownerData.imageUrl;
  const docId1 = `${userEmail}_${ownerEmail}`;
  const docId2 = `${ownerEmail}_${userEmail}`;
  const queryData = query(
    collection(db, "chats"),
    where("id", "in", [docId1, docId2])
  );

  const querySnapshot = await getDocs(queryData);
  const documents = querySnapshot.docs.map((doc) => doc.data());
  const document = documents[0];

  if (!documents.length) {
    const chatData = {
      id: docId1,
      users: [
        {
          email: userEmail,
          name: userName,
          imageUrl: userImageUrl
        },
        {
          email: ownerEmail,
          name: ownerName,
          imageUrl: ownerImageUrl
        }
      ]
    };
    try {
      const chatRef = doc(db, "chats", docId1);
      await setDoc(chatRef, chatData);
      const newDocument = await getDoc(chatRef);
      const newDocData = newDocument.data();
      return newDocData;
    } catch (error) {
      console.error(`Error creating chat: ${error}`);
      return Promise.reject(error.message);
    }
  } else {
    return document;
  }
};

export const getDocumentDetails = async (id) => {
  try {
    const docRef = doc(db, "chats", id);
    const docSnapshot = await getDoc(docRef);
    if (!docSnapshot) {
      throw new Error("Something went wrong", error);
    }
    const document = docSnapshot.data();
    return document;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};
