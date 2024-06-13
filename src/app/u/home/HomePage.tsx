"use client";

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import styles from '@/app/u/home/HomePage.module.css';
import SearchBar from '@/app/elements/molecules/SearchBar';
import AppIcon from "@/app/assets/AppIcon.png";
import SideBar from '@/app/elements/organisms/SideBar/SideBar';
import TabComponent from '@/app/elements/molecules/TabPanel';
import { getUserData } from '@/app/backend/UserDataService';
import { auth} from "@/app/firebase"

const HomePage: React.FC = () => {
  const [height, setHeight] = useState(0);

  const user = auth.currentUser;

  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
        setHeight(ref.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    const fetchUserdata = async () => {
      try {
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
        <header className={styles.header} ref={ref}>
        <img src={AppIcon.src} alt="Icon" className={styles.appIcon} />
          <SearchBar />
        </header>
        <div className={styles.content}>
            <SideBar headerHeight={height} profileImage={profileImage} username={username} name={name}/>
          <main className={styles.main}>
          <TabComponent headerHeight={height}/>
          </main>
        </div>
      </div>
    );
  };

export default HomePage;