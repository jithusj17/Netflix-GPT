// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBn0W0inuy6LjBUsa0Bz_xHw51s-88I8As",
  authDomain: "netflix-gpt-73d7c.firebaseapp.com",
  projectId: "netflix-gpt-73d7c",
  storageBucket: "netflix-gpt-73d7c.firebasestorage.app",
  messagingSenderId: "930709501805",
  appId: "1:930709501805:web:59136111554877ae2a8c64",
  measurementId: "G-FGW756LPF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(); 