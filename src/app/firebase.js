// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD1ds60Eqv4dQTuJD7AleYnyHSE1p2_F2I",
  authDomain: "social-web-c9e4e.firebaseapp.com",
  projectId: "social-web-c9e4e",
  storageBucket: "social-web-c9e4e.appspot.com",
  messagingSenderId: "894146136870",
  appId: "1:894146136870:web:989c38005dc892ee6a0fe7",
  measurementId: "G-0HK41J0DTE",
  databaseURL: "https://social-web-c9e4e-default-rtdb.firebaseio.com/",
  storageBucket: "gs://social-web-c9e4e.appspot.com"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  if (typeof window !== 'undefined') {
    getAnalytics(app); 
  }
} else {
  app = getApps()[0];
}

const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { auth, database, storage, onAuthStateChanged };
