
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatapp-91401.firebaseapp.com",
  projectId: "chatapp-91401",
  storageBucket: "chatapp-91401.appspot.com",
  messagingSenderId: "252720231325",
  appId: "1:252720231325:web:8790be5dae23792e51b574"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();