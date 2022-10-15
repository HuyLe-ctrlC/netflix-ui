// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmkoIO5PKFAHfGfyA8wYbj8nqpQR88Few",
  authDomain: "react-netflix-clone-c6486.firebaseapp.com",
  projectId: "react-netflix-clone-c6486",
  storageBucket: "react-netflix-clone-c6486.appspot.com",
  messagingSenderId: "137758363601",
  appId: "1:137758363601:web:96ef6771f9c9a1db599af0",
  measurementId: "G-1KLY701C17",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
