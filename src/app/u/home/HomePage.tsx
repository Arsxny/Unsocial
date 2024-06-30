"use client";

import React, { useState } from 'react';
import styles from '@/app/u/home/HomePage.module.css';
import SideBar from '@/app/elements/organisms/SideBar/SideBar';
import {TabComponent} from '@/app/elements/molecules/TabPanel/TabPanel';
import Header from '@/app/elements/organisms/Header/Header';
import RecommendationsDrawer from '@/app/elements/molecules/RecomDrawer';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { HeightProvider } from '@/app/elements/context/HeightContext';

const HomePage: React.FC = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

    return (
      <HeightProvider>
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
        <SideBar />
          <main className={styles.main} style={{ flexGrow: 1, marginRight: drawerOpen ? 220 : 0 }}>
          <TabComponent/>
          </main>
            <IconButton 
              onClick={toggleDrawer}
              sx={{
                position: 'fixed',
                top: 85,
                right: 20,
                backgroundColor: 'white',
                '&:hover': {
                  backgroundColor: 'gray',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <RecommendationsDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
        </div>
      </div>
      </HeightProvider>
    );
  };

export default HomePage;