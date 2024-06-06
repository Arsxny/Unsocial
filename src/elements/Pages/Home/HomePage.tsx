"use client";

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import styles from './HomePage.module.css';
import SearchBar from '@/elements/molecules/SearchBar';
import AppIcon from "@/assets/AppIcon.png";
import SideBar from '@/elements/organisms/SideBar/SideBar';
import TabComponent from '@/elements/molecules/TabPanel';

const HomePage: React.FC = () => {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
        setHeight(ref.current.clientHeight);
    }
}, []); // Empty dependency array to ensure this effect runs only once after the initial render

console.log(height);

    return (
      <div className={styles.container}>
        <header className={styles.header} ref={ref}>
        <img src={AppIcon.src} alt="Icon" className={styles.appIcon} />
{/*         <div className={styles.headerOptions}>
          <nav className={styles.nav}>
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
          </nav> */}
          <SearchBar />
{/*         </div> */}
        </header>
        <div className={styles.content}>
            <SideBar headerHeight={height}/>
          <main className={styles.main}>
          <TabComponent headerHeight={height}/>
          </main>
        </div>
      </div>
    );
  };

export default HomePage;