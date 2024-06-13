"use client";
import React, {FormEvent, useState} from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/u/auth/auth.module.css";
import Link from "next/link";
import Loader from "@/app/assets/loader.svg";
import {signIn} from "@/app/backend/AuthService"

const LoginPage: React.FC = (props) => {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showLoader, setShowLoader] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState('');

  const router = useRouter();

  const Login = async(e: FormEvent) => {
    e.preventDefault();
    setError('');
    setShowLoader(true);

    try {
        await signIn(email, password);
        setShowLoader(false);
        router.push("/u/home")
    } catch (error) {
      setError("Error creating user account.");
      console.error("Error:", error);
    }
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.formBox}>
        <div className={styles.titleContainer}>
            <h1>Create an account</h1>
        </div>
      <form
        onSubmit={Login}
        className="space-y-4 md:space-y-6"
        action="#">
        <div className={styles.inputContainer}>
          <label 
            className={`${styles.inputLabel} ${emailFocused ? styles.focused : ""}`}
            htmlFor="email"
          >
            Email address
          </label>
          <input
            onFocus={() => setEmailFocused(true)}
            onBlur={(e) => setEmailFocused(e.target.value !== "")}
            className={styles.inputBox}
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label 
            className={`${styles.inputLabel} ${passwordFocused ? styles.focused : ""}`}
            htmlFor="password"
          >
            Password
          </label>
          <input
            onFocus={() => setPasswordFocused(true)}
            onBlur={(e) => setPasswordFocused(e.target.value !== "")}
            className={styles.inputBox}
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.submitStyle}>
          <button 
            disabled={showLoader}
            className={styles.inputButton} 
            type="submit" 
            value={'Sign in'}> 
            {!showLoader ? "Sign in" : <Loader className={styles.spinner} />}
          </button>
          <p className={styles.authText}>
          Don't have an account?{" "}
          <Link
            href="/u/auth/signup"
            className={styles.authLink}
          >
            Sign up
          </Link>
        </p>
        </div>
        {error && (
          <div
            className={styles.alert}
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
      </form>
    </div>
  </main>
  )
}

export default LoginPage;