// src/services/firebase.js

import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAY47oqq0P74U42Hpnm5mbBEzXd7cHGWvk",
  authDomain: "fi-insight.firebaseapp.com",
  projectId: "fi-insight",
  storageBucket: "fi-insight.appspot.com",
  messagingSenderId: "159038814466",
  appId: "1:159038814466:web:00f8a96570817a61402a1b",
  measurementId: "G-JRZKKMJQ62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
