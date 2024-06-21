"use client";

import React, { useEffect, useRef, useState, useContext } from 'react';
import styles from './profile.module.css';
import SearchBar from '@/app/elements/molecules/SearchBar/SearchBar';
import AppIcon from "@/app/assets/AppIcon.png";
import SideBar from '@/app/elements/organisms/SideBar/SideBar';
import { getUserData } from '@/app/backend/UserDataService';
import { auth} from "@/app/firebase";
import Header from '@/app/elements/organisms/Header/Header';
import { HeightContext } from '@/app/elements/context/HeightContext';
import OptionIcon from '@/app/assets/OptionIcon.svg'
import { ProfileTab } from '@/app/elements/molecules/TabPanel/TabPanel';
import { useAuthStore } from '@/app/backend/AuthService';

const ProfilePage: React.FC = () => {

  const user = auth.currentUser;

  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUserdata = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userdata = await getUserData(user.uid);
          setProfileImage(userdata.profileImage ?? '');
          setUsername(userdata.username);
          setName(userdata.name);
        }
      } catch (error) {
        console.error('Error fetching following posts:', error);
      }
    };

    fetchUserdata();
  }, [user]);

    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
            <SideBar profileImage={profileImage} username={username} name={name}/>
          <main className={styles.main}>
            <div className={styles.profileInfo}>
                <div className={styles.profileDetails}>
                  <img src={profileImage} className={styles.profileImage} />
                  <div className={styles.userInfo}>
                      <p className={styles.name}>{name}</p>
                      <p className={styles.userName}>@{username}</p>
                  </div>
                </div>
              <button className={styles.edit}>
                <p className={styles.editText}>Edit profile</p>
                <div className={styles.optionIcon}><OptionIcon/></div>
              </button>
            </div>
            <button className={styles.followInfo}>
              <p className={styles.followCount}> 116 <span className={styles.followText}>Following</span></p>
              <p className={styles.followCount}> 37.9K <span className={styles.followText}>Followers</span></p>
            </button>
            <ProfileTab />
          </main>
        </div>
      </div>
    );
  };

export default ProfilePage;