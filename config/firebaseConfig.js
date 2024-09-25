// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "adoptme-9bfb3.firebaseapp.com",
  projectId: "adoptme-9bfb3",
  storageBucket: "adoptme-9bfb3.appspot.com",
  messagingSenderId: "661965394866",
  appId: "1:661965394866:web:02f74b078b89f8fcef4aab",
  measurementId: "G-BV9MGDPNEC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
