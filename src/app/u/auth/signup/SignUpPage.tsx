"use client";
import React, {FormEvent, useState} from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/u/auth/auth.module.css";
import { createUserAccount } from "@/app/backend/AuthService";
import Link from "next/link";
import Loader from "@/app/assets/loader.svg";
import { useSpring, animated } from "react-spring";
import ProfileInfo from "../info/ProfileInfo";

const SingUpPage: React.FC = () => {
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [conFocused, setConFocused] = useState(false);
    const [showLoader, setShowLoader] = useState(false)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState("");
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);
    const [isValid, setValid] = useState(true);

    const router = useRouter();

    const checkData = async (e: FormEvent) => {
      e.preventDefault();
      
      setError('');
      setValid(true);
      setShowLoader(true);
      setTimeout(() => setShowLoader(false), 1000);
  
      if (!email) {
        setError('Email required *');
        setValid(false);
        return;
      } else if (!password) {
        setError('Password required *');
        setValid(false);
        return;
      } else if (password.trim() && password.length < 6) {
        setError('Weak password, minimum 6 characters');
        setValid(false);
        return;
      } else if (password !== confirmation) {
        setError("Passwords don't match");
        return;
      }
  
      try {
        setStep(2);
      } catch (error) {
        setError("Error creating user account.");
        console.error("Error:", error);
      }
    };

    const slideInFromRight = useSpring({
      transform: step === 2 ? 'translateX(20%)' : 'translateX(70%)',
      opacity: step === 2 ? 1 : 0,
    });
  
    const slideOutToLeft = useSpring({
      transform: step === 1 ? 'translateX(50%)' : 'translateX(-25%)',
      opacity: step === 1 ? 1 : 0.3,
    });
  
    return (
      <main className={styles.mainContainer}>
        <animated.div className={`${styles.formBox} ${step === 2 ? 'pointer-events-none' : ''}`} style={slideOutToLeft}>
        <div className={styles.titleContainer}>
            <h1>Create an account</h1>
        </div>
        <form
            onSubmit={checkData}
            className="space-y-4 md:space-y-6"
            action="#"
          >
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
      <div className={styles.inputContainer}>
        <label 
          className={`${styles.inputLabel} ${conFocused ? styles.focused : ""}`}
          htmlFor="cofirm-password"
        >
          Confirm password
        </label>
        <input
          onFocus={() => setConFocused(true)}
          onBlur={(e) => setConFocused(e.target.value !== "")}
          className={styles.inputBox}
          type="password"
          name="confirm-password"
          id="confirm-password"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          required
        />
      </div>
      <div className={styles.submitStyle}>
        <button 
          className={styles.inputButton} 
          type="submit" 
          value={'Continue'}> 
          {!showLoader ? "Continue" : <Loader className={styles.spinner} />}
        </button>
        <p className={styles.authText}>
        Already have an account?{" "}
        <Link
          href="/u/auth/login"
          className={styles.authLink}
        >
          Sign in
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
    </animated.div>
    <ProfileInfo slideInFromRight={slideInFromRight} email={email} password={password} step={step}/>
  </main>
  )
}

export default SingUpPage;