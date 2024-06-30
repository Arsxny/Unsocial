"use client";
import React, {useState, useEffect, useContext} from "react";
import { SideBarData } from "./SideBarData";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import styles from "./sideBar.module.css"
/* import { SideBarType } from "@/app/types"; */
import SendIcon from "@/app/assets/SendIcon.svg";
import PostIcon from "@/app/assets/PostIcon.svg";
import { signOutFirebase } from "@/app/backend/AuthService";
import { HeightContext } from "../../context/HeightContext";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Button } from "@mui/material";
import { Modal } from "@mui/material";
import { useSpring, animated } from "react-spring";
import SpringModal from "./PostModal";
import { auth } from "@/app/firebase";
import { getUserData } from "@/app/backend/UserDataService";

const SideBar: React.FC = () => {

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
    
    const [activeLink, setActiveLink] = useState('');
    const pathname = usePathname()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setActiveLink(pathname);
    }, [pathname]);

    useEffect(() => {
        console.log("is it open?", open);
    }, [open]);

    const heightContext = useContext(HeightContext);

    if (!heightContext) {
        return null;
    }
    
    const { height } = heightContext;

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
            width: 250,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 250, boxSizing: 'border-box', backgroundColor: '#121212',  top: height + 1, bottom: 0, paddingLeft: 5  },
            }}
        >
            <div className={styles.profileInfo}>
                <img src={profileImage} className={styles.profileImage} />
                <div className={styles.userInfo}>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.userName}>@{username}</p>
                </div>
            </div>
            <ul className={styles.sideBarList}>
                {SideBarData.map((val, key) => {
                    const isActive = activeLink === val.link;
                    return (
                        <li key={key}>
                            <Link 
                                href={val.link} 
                                className={`${styles.link} ${isActive ? styles.activeLink : ''}`} 
                                onClick={() => setActiveLink(val.link)}>
                                    <div className={`${styles.icon} ${isActive ? styles.activeIcon : ''}`}>{val.icon}</div>
                                    <div className={`${styles.title} ${isActive ? styles.activeTitle : ''}`}>{val.title}</div>
                            </Link>
                        </li>
                    );
                })}
                <button className={styles.postLink} onClick={handleOpen}>
                    <div className={styles.postIcon}>
                        <PostIcon />
                    </div>
                    <div className={styles.postText}>Create</div>
                </button>
                <SpringModal open={open} handleClose={handleClose} />
            </ul>
            <Link href="/u/start" onClick={signOutFirebase} className={styles.logOutLink}>
                <div className={styles.logOutIcon}>
                    <SendIcon />
                </div>
                <div className={styles.logOutText}>Log out</div>
            </Link>
        </Drawer>
    );
};

export default SideBar;