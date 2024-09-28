import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  deleteDoc,
  where
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { createURL } from "expo-linking";

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
    if (querySnapshot.docs.length === 0) {
      return [];
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
    const { userEmail, newFavorites } = data;

    const queryData = query(
      collection(db, "userFavPets"),
      where("email", "==", userEmail)
    );

    const newFavArray = newFavorites.map((favorite) => ({
      about: favorite.about,
      address: favorite.address,
      age: favorite.age,
      breed: favorite.breed,
      gender: favorite.gender,
      category: favorite.category,
      email: favorite.email,
      imageUrl: favorite.imageUrl,
      name: favorite.name,
      owner: favorite.owner,
      ownerImageUrl: favorite.ownerImageUrl,
      weight: favorite.weight
    }));

    const querySnapshot = await getDocs(queryData);

    if (querySnapshot.docs.length === 0) {
      const docRef = doc(collection(db, "userFavPets"));
      await setDoc(docRef, {
        email: userEmail,
        favorites: newFavArray
      });
    } else {
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        favorites: newFavArray
      });
    }
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
      ],
      userIds: [userEmail, ownerEmail]
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

export const getChatDetails = async (id) => {
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

export const getChatMessages = async (chatId) => {
  try {
    const messagesRef = collection(db, "chats", chatId, "messages");
    const docsSnapshot = await getDocs(messagesRef);
    const messages = docsSnapshot.docs.map((doc) => doc.data());
    return messages;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export const setNewMessage = async (chatId, message) => {
  try {
    const messagesRef = collection(db, "chats", chatId, "messages");
    const setMessage = await addDoc(messagesRef, message);
    if (setMessage.id) {
      return Promise.resolve("Message saved: ", setMessage.id);
    } else {
      return Promise.reject("Error saving message");
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error.message);
  }
};

export const getUserChats = async (userEmail) => {
  try {
    const userChatsQuery = query(
      collection(db, "chats"),
      where("userIds", "array-contains", userEmail)
    );
    const userChatsSnapshot = await getDocs(userChatsQuery);
    const userChats = userChatsSnapshot.docs.map((doc) => doc.data());

    return userChats;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export const getUserPets = async (userEmail) => {
  try {
    const userPetsQuery = query(
      collection(db, "pets"),
      where("email", "==", userEmail)
    );
    const userPetsSnapshot = await getDocs(userPetsQuery);
    const userPets = userPetsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
    return userPets;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export const deleteUserPost = async (id) => {
  try {
    const postRef = doc(db, "pets", id);
    await deleteDoc(postRef);
    return Promise.resolve("Post deleted");
  } catch (error) {
    console.error(error.message);
    return Promise.reject(error.message);
  }
};
