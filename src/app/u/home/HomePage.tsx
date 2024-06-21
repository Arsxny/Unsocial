"use client";

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import styles from '@/app/u/home/HomePage.module.css';
import SearchBar from '@/app/elements/molecules/SearchBar/SearchBar';
import AppIcon from "@/app/assets/AppIcon.png";
import SideBar from '@/app/elements/organisms/SideBar/SideBar';
import {TabComponent} from '@/app/elements/molecules/TabPanel/TabPanel';
import { getUserData } from '@/app/backend/UserDataService';
import { auth} from "@/app/firebase";
import Header from '@/app/elements/organisms/Header/Header';

const HomePage: React.FC = () => {

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
          <TabComponent/>
          </main>
        </div>
      </div>
    );
  };

export default HomePage;