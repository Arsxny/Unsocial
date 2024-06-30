"use client";
import React, {ChangeEvent, FormEvent, useState} from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/u/auth/auth.module.css";
import { createUserAccount } from "@/app/backend/AuthService";
import Loader from "@/app/assets/loader.svg";
import { animated } from "react-spring";
import PlusIcon from "@/app/assets/PlusIcon.svg";

const ProfileInfo: React.FC = (props) => {

    const {slideInFromRight, email, password, step} = props;

    const [usernameFocused, setUsernameFocused] = useState(false);
    const [nameFocused, setNameFocused] = useState(false);

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageURI, setImageURI] = useState<string>(''); 
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');

    const [error, setError] = useState('');

    const [showLoader, setShowLoader] = useState(false);

    const router = useRouter();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (file) {
          setImageFile(file);
          setImageURI(URL.createObjectURL(file));
        }
    };

    const signUp = async (e: FormEvent) => {
        e.preventDefault();
        
        setError('');
        setShowLoader(true);

        try {
          if (imageFile) {
            await createUserAccount(email, password, name, userName, imageFile);
            router.push("/u/home");
          } else {
            throw new Error('Please select an image.');
          }
          setShowLoader(false);
        } catch (error) {
          setError("Error creating user account.");
          console.error("Error:", error);
        }
      };

    return (
        <animated.div className={`${styles.formBox} ${step === 1 ? 'pointer-events-none' : ''}`} style={slideInFromRight}>
        <div className={styles.titleContainer}>
            <h1>Setup your Profile</h1>
        </div>
        <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={signUp}
          >
            <div className={styles.imageContainer}>
                <button className={styles.imageButton} type="button">
                {imageURI ? (
                    <img src={imageURI} alt="Uploaded" className={styles.uploadedImage} />
                ) : (
                    <PlusIcon height={35} width={35} />
                )}
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className={styles.fileInput}
                />
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className={styles.fileInput}
                />
                </button>
            </div>
        <div className={styles.inputContainer}>
        <label 
            className={`${styles.inputLabel} ${nameFocused ? styles.focused : ""}`}
            htmlFor="Name"
        >
          Name
        </label>
        <input
          onFocus={() => setNameFocused(true)}
          onBlur={(e) => setNameFocused(e.target.value !== "")}
          className={styles.inputBox}
          type="Name"
          name="Name"
          id="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputContainer}>
        <label 
          className={`${styles.inputLabel} ${usernameFocused ? styles.focused : ""}`}
          htmlFor="Username"
        >
          Username
        </label>
        <input
          onFocus={() => setUsernameFocused(true)}
          onBlur={(e) => setUsernameFocused(e.target.value !== "")}
          className={styles.inputBox}
          type="Username"
          name="Username"
          id="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>
      <div className={styles.submitStyle}>
        <button 
          disabled={showLoader}
          className={styles.inputButton} 
          type="submit" 
          value={'Finish'}> 
          {!showLoader ? "Finish" : <Loader className={styles.spinner} />}
        </button>
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
    );
};

export default ProfileInfo; 