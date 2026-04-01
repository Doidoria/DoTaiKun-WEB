import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDa8CyM6tG...",
  authDomain: "dotaikun-web.firebaseapp.com",
  projectId: "dotaikun-web",
  storageBucket: "dotaikun-web.firebasestorage.app",
  messagingSenderId: "425060034009",
  appId: "1:425060034009:web:248e74f1958a1ad179a5c8",
  measurementId: "G-FQLHXJJ9FK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);