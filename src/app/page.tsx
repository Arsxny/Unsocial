"use client";
import React, {useEffect} from "react";
import StartPage from "@/app/u/start/StartPage";
import { useAuthStore } from "./backend/AuthService";
import { auth, onAuthStateChanged } from "./firebase";
import HomePage from "./u/home/HomePage";

export default function Main() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed: ", currentUser);
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [setUser]);

  if (user) {
    return <HomePage />;
  } else {
    return <StartPage />;
  }
}