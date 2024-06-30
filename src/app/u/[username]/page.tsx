"use client";

import React, { useEffect, useRef, useState, useContext } from 'react';
import styles from './other.module.css';
import SearchBar from '@/app/elements/molecules/SearchBar/SearchBar';
import AppIcon from "@/app/assets/AppIcon.png";
import SideBar from '@/app/elements/organisms/SideBar/SideBar';
import { getUserData, followUser, unfollowUser } from '@/app/backend/UserDataService';
import { auth} from "@/app/firebase";
import Header from '@/app/elements/organisms/Header/Header';
import { HeightContext, HeightProvider } from '@/app/elements/context/HeightContext';
import OptionIcon from '@/app/assets/OptionIcon.svg'
import { ProfileTab } from '@/app/elements/molecules/TabPanel/TabPanel';
import { useAuthStore } from '@/app/backend/AuthService';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RecommendationsDrawer from '@/app/elements/molecules/RecomDrawer';

const OtherUserPage: React.FC = () => {

  const currentUser = auth.currentUser;
  const searchParams = useSearchParams();
  const router = useRouter();

  const otherUserId  = searchParams.get("otherUserId");

  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    const fetchUserdata = async () => {
      try {
        if (otherUserId) {
          const userdata = await getUserData(otherUserId);
          setProfileImage(userdata.profileImage ?? '');
          setUsername(userdata.username);
          setName(userdata.name);
          setFollowersCount(userdata.followersCount);
          setFollowingCount(userdata.followingCount);

          // Check if the current user is following the other user
          const currentUserData = await getUserData(currentUser!.uid);
          if (currentUserData.following && currentUserData.following[otherUserId]) {
            setIsFollowing(true);
          }
        }
      } catch (error) {
        console.error('Error fetching following posts:', error);
      }
    };

    fetchUserdata();
  }, [otherUserId]);

  const handleFollow = async () => {
    try {
      await followUser(currentUser!.uid, otherUserId);
      setIsFollowing(true);
      setFollowersCount(followersCount + 1);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(currentUser!.uid, otherUserId);
      setIsFollowing(false);
      setFollowersCount(followersCount - 1); 
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const handleFollowButtonClick = async () => {
    if (isFollowing) {
      await handleUnfollow();
    } else {
      await handleFollow();
    }
  };

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
              <div className={styles.profileInfo}>
                  <div className={styles.profileDetails}>
                    <img src={profileImage} className={styles.profileImage} />
                    <div className={styles.userInfo}>
                        <p className={styles.name}>{name}</p>
                        <p className={styles.userName}>@{username}</p>
                          <button className={styles.followButton} onClick={handleFollowButtonClick}>
                            <p className={styles.followButtonText}>{isFollowing ? 'Following' : 'Follow'}</p>
                          </button>
                    </div>
                  </div>
              </div>
              <button className={styles.followInfo}>
                <p className={styles.followCount}> {followingCount} <span className={styles.followText}>Following</span></p>
                <p className={styles.followCount}> {followersCount} <span className={styles.followText}>Followers</span></p>
              </button>
              <ProfileTab userId={otherUserId}/>
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

export default OtherUserPage;