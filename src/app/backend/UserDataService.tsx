import { auth, database, storage } from "@/app/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref as dbRef, update, get } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const updateUserData = async (uid, userData) => {
    const userRef = dbRef(database, `Users/${uid}`);
    await update(userRef, userData);
  };

const getUserData = async (uid: string) => {
    try {
        const userRef = dbRef(database, `Users/${uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
        return snapshot.val();
        } else {
        throw new Error("User data not found");
        }
    } catch (error) {
        console.error("Error getting user data:", error);
        throw error;
    }
};

export {updateUserData, getUserData};