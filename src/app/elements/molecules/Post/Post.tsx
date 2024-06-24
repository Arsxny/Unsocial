"use client";

import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from 'react-spring';
import { Button, SxProps, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import BackArrow from '@/app/assets/BackArrow.svg';
import Galleryicon from '@/app/assets/GalleryIcon.svg';
import { auth, database, storage } from '@/app/firebase';
import { ref as dbRef, set, push, serverTimestamp } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "@/app/elements/molecules/Post/post.module.css";
import { getUserData } from '@/app/backend/UserDataService';
import TruncatedText from '../TruncateText';
import {ButtonBase} from '@mui/material';
import { format } from 'date-fns';
import Link from 'next/link';

import UpvoteIcon from '@/app/assets/UpvoteIcon.svg'
import { PostType } from '@/app/types';

const Post: React.FC<PostType> = ({ image, text, date, user }) => {

    const [profileImage, setProfileImage] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const currentUser = auth.currentUser;
    
    useEffect(() => {
        const fetchUserdata = async () => {
          try {
            if (user) {
              const userdata = await getUserData(user);
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

    const toggleExpansion = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <ButtonBase 
        onClick={toggleExpansion}
        sx={{
          textAlign: 'start',  
          borderRadius: 10, 
          padding: 1, 
          width: '100%', 
          paddingLeft: 5, 
          paddingRight: 5,
          borderBottom: '1px solid #333'
        }}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Link
              href={{
                  pathname: user !== currentUser?.uid ? `/u/${username}` : null,
                  query: { otherUserId: user }
              }}
              passHref
              className={styles.profileInfo}
            >
              <img src={profileImage} className={styles.profileImage} alt="Profile" />
              <div className={styles.userInfo}>
                <div className={styles.name}>{name}</div>
                <div className={styles.userName}>@{username}</div>
              </div>
              </Link>
            <div className={styles.date}>{format(new Date(date), 'MMMM dd')}</div>
          </div>
            <div style={{display: text.length >= 100 ? 'flex' : 'initial', justifyContent: text.length >= 100 ? 'space-between' : 'initial'}}>
                <div className={styles.postText}>
                  <TruncatedText text={text} wordLimit={50} isExpanded={isExpanded}/>
                </div>
                {image && <img src={image} className={styles.postImage} alt="Post" />}
            </div>
        </div>
        </ButtonBase>
    );
};

export default Post;
