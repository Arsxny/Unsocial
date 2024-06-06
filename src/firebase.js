// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD1ds60Eqv4dQTuJD7AleYnyHSE1p2_F2I",
  authDomain: "social-web-c9e4e.firebaseapp.com",
  projectId: "social-web-c9e4e",
  storageBucket: "social-web-c9e4e.appspot.com",
  messagingSenderId: "894146136870",
  appId: "1:894146136870:web:989c38005dc892ee6a0fe7",
  measurementId: "G-0HK41J0DTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);