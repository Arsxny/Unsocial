import { auth, database, storage } from "@/app/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref as dbRef, update, get } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const getPostData = async (uid: string) => {
    
};

export {getPostData};