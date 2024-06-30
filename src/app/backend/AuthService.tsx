
import { auth, storage } from "@/app/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateUserData } from "./UserDataService";
import { AuthType } from "../types";
import { create } from "zustand";


const useAuthStore = create<AuthType>((set, get) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
}));

const createUserAccount = async (
  email: string,
  password: string,
  name: string,
  username: string,
  imageFile: File
 ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", userCredential.user);
      const user = userCredential.user;

      if (user && imageFile) {
        const storageReference = storageRef(storage, `profile_images/${user.uid}/${imageFile.name}`);
        await uploadBytes(storageReference, imageFile);
  
        const downloadURL = await getDownloadURL(storageReference);
        
        updateUserData(user.uid, {
          name: name,
          username: username,
          profileImage: downloadURL
        });
      }

    console.log("User created and data updated:", user);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error; 
  };
}

const signOutFirebase = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}


export {createUserAccount, signIn, signOutFirebase, useAuthStore};