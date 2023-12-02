// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_API_KEY}`,
  authDomain: "blog-app-projec.firebaseapp.com",
  projectId: "blog-app-projec",
  storageBucket: "blog-app-projec.appspot.com",
  messagingSenderId: "756016360609",
  appId: "1:756016360609:web:f0fde055aa235ef6f314e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Authentication Config
export const auth = getAuth(app);

// Data Base
export const db = getFirestore(app);

//Storage
export const storage = getStorage(app);


//Google
export const provider = new GoogleAuthProvider();