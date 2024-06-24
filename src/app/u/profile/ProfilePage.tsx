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

  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    const fetchUserdata = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userdata = await getUserData(user.uid);
          setProfileImage(userdata.profileImage ?? '');
          setUsername(userdata.username);
          setName(userdata.name);
          setFollowersCount(userdata.followersCount);
          setFollowingCount(userdata.followingCount);
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
            <SideBar/>
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
              <p className={styles.followCount}> {followingCount} <span className={styles.followText}>Following</span></p>
              <p className={styles.followCount}> {followersCount} <span className={styles.followText}>Followers</span></p>
            </button>
            <ProfileTab userId={user?.uid}/>
          </main>
        </div>
      </div>
    );
  };

export default ProfilePage;