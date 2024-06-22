"use client";

import React, { useEffect, useRef, useState, useContext } from 'react';
import styles from './other.module.css';
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
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const OtherUserPage: React.FC = () => {

  const user = auth.currentUser;
  const searchParams = useSearchParams();
  const router = useRouter();

  const otherUserId  = searchParams.get("otherUserId");

  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUserdata = async () => {
      try {
        if (otherUserId) {
          const userdata = await getUserData(otherUserId);
          setProfileImage(userdata.profileImage ?? '');
          setUsername(userdata.username);
          setName(userdata.name);
        }
      } catch (error) {
        console.error('Error fetching following posts:', error);
      }
    };

    fetchUserdata();
  }, [otherUserId]);

    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
            <SideBar />
          <main className={styles.main}>
            <div className={styles.profileInfo}>
                <div className={styles.profileDetails}>
                  <img src={profileImage} className={styles.profileImage} />
                  <div className={styles.userInfo}>
                      <p className={styles.name}>{name}</p>
                      <p className={styles.userName}>@{username}</p>
                        <button className={styles.followButton}>
                          <p className={styles.followButtonText}>Follow</p>
                        </button>
                  </div>
                </div>
            </div>
            <button className={styles.followInfo}>
              <p className={styles.followCount}> 116 <span className={styles.followText}>Following</span></p>
              <p className={styles.followCount}> 37.9K <span className={styles.followText}>Followers</span></p>
            </button>
            <ProfileTab userId={otherUserId}/>
          </main>
        </div>
      </div>
    );
  };

export default OtherUserPage;