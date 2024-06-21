"use client";

import React, { useContext, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import styles from './header.module.css';
import SearchBar from '@/app/elements/molecules/SearchBar/SearchBar';
import AppIcon from "@/app/assets/unsocialLogo.png";
import SideBar from '@/app/elements/organisms/SideBar/SideBar';
import {TabComponent} from '@/app/elements/molecules/TabPanel/TabPanel';
import { getUserData } from '@/app/backend/UserDataService';
import { auth} from "@/app/firebase"
import { HeightContext } from '../../context/HeightContext';
import { ref as dbRef, get } from 'firebase/database'
import { database } from '@/app/firebase';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
    const heightContext = useContext(HeightContext);
    const [searchResults, setSearchResults] = useState([]);

    const router = useRouter();
    const currentUser = auth.currentUser;

    if (!heightContext) {
        return null;
    }

    const { ref } = heightContext;

    const searchUsers = async (query) => {
        if (!query) {
          setSearchResults([]);
          return;
        }
    
        try {
          const userRef = dbRef(database, 'Users');
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const users = snapshot.val();
            const results = Object.keys(users)
              .map((uid) => users[uid])
              .filter(
                (user) =>
                    user.uid !== currentUser!.uid &&
                    (user.name.toLowerCase().includes(query.toLowerCase()) ||
                      user.username.toLowerCase().includes(query.toLowerCase()))
                );
            setSearchResults(results);
          }
        } catch (error) {
          console.error('Error searching users:', error);
        }
      };

      return (
        <>
          <header className={styles.header} ref={ref}>
            <div className={styles.left}>
              <img src={AppIcon.src} alt="Icon" className={styles.appIcon} />
              <p className={styles.appTitle}>Unsocial</p>
            </div>
            <div className={styles.center}>
              <SearchBar onSearch={(query) => searchUsers(query)} />
              {searchResults.length > 0 && (
                <div className={styles.searchResults}>
                  {searchResults.map((user) => (
                    <button key={user.uid} className={styles.userItem} onClick={() => router.push(`/u/@${user.username}`)}>
                      <img src={user.profileImage} alt="Profile" className={styles.userImage} />
                      <div className={styles.userInfo}>
                        <div className={styles.name}>{user.name}</div>
                        <div className={styles.username}>@{user.username}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.right}></div>
          </header>
          </>
      );
    };

export default Header;