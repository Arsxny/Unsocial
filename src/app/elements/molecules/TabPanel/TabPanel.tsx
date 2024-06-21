"use client";

import React, { useState, useContext, useRef, useEffect } from 'react';
import { Tabs, Tab, Box, Typography, Button } from '@mui/material';
import { TabComponentType, TabProps } from '../../../types';
import { ProfileTabStyles, tabStyles } from './TabStyles';
import { HeightContext } from '../../context/HeightContext';
import { ref as dbRef, get, query, orderByChild } from 'firebase/database';
import { auth, database, storage } from "@/app/firebase";
import Post from '../Post/Post';
import { useAuthStore } from '@/app/backend/AuthService';
import Masonry from '@mui/lab/Masonry';

const TabPanel = (props: TabProps) =>  {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{}}>
            {children}
          </Box>
        )}
      </div>
    );
  }

const TabComponent: React.FC= () => {
    const [tabIndex, setTabIndex] = useState(0);
  
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabIndex(newValue);
    };

    const heightContext = useContext(HeightContext);

    if (!heightContext) {
        return null;
    }

    const { height } = heightContext;
  
    return (
      <Box sx={{ width: '100%', typography: 'body1', marginTop: 3, }}>
        <Box sx={{ borderBottomWidth: 0.25, borderColor: '#333', position: 'sticky', top: height + 1, backgroundColor: '#000000'}}>
            <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                centered
                role="navigation"
                TabIndicatorProps={{ hidden: true }}
            >
            <Tab 
                disableRipple
                label="Browse" 
                sx={tabStyles}/>
            <Tab 
                disableRipple
                label="Following" 
                sx={tabStyles}/>
            </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0}>
          Browse shit
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          See Following Posts
        </TabPanel>
      </Box>
    );
  };

  const ProfileTab: React.FC= () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const tabsRef = useRef<HTMLDivElement | null>(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = auth.currentUser;
  
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabIndex(newValue);
      setHoverIndex(null);
    };

    const heightContext = useContext(HeightContext);

    if (!heightContext) {
        return null;
    }

    const { height } = heightContext;

    const handleTabMouseEnter = (index: number) => {
      setHoverIndex(index);
    };
  
    const handleTabMouseLeave = () => {
      setHoverIndex(null);
    };

    useEffect(() => {
      const updateIndicatorStyle = () => {
        const tabsNode = tabsRef.current;
        if (tabsNode) {
          const activeIndex = hoverIndex !== null ? hoverIndex : tabIndex;
          const activeTab = tabsNode.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement;
  
          if (activeTab) {
            const tabRect = activeTab.getBoundingClientRect();
            const tabsRect = tabsNode.getBoundingClientRect();
  
            setIndicatorStyle({
              width: tabRect.width,
              left: tabRect.left - tabsRect.left,
            });
          }
        }
      };
  
      updateIndicatorStyle();
    }, [tabIndex, hoverIndex]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userPostsRef = dbRef(database, `/Users/${user.uid}/posts`);
          const postsQuery = query(userPostsRef, orderByChild('date'));
          const snapshot = await get(postsQuery);
          if (snapshot.exists()) {
            const postsData = snapshot.val();
            const postsArray = Object.keys(postsData).map(key => ({
              id: key,
              ...postsData[key],
            }));
            setPosts(postsArray);
            console.log('Fetching posts');
          } else {
            setPosts([]);
          }
        }
      } catch (error) {
        console.error('Error fetching user posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchPosts();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

    return (
      <Box sx={{ width: '100%', typography: 'body1', marginTop: 3,}}>
        <Box 
          sx={{ 
            position: 'sticky', 
            top: height + 1, 
            zIndex: 1000, 
            borderBottom: 1, 
            borderColor: '#333', 
            backgroundColor: 'black'
          }} 
          ref={tabsRef}>
            <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                role="navigation"
                TabIndicatorProps={{
                  style: {
                    ...indicatorStyle,
                    backgroundColor: 'white',
                    transition: 'left 0.3s ease, width 0.3s ease',
                  }
                }}
            >
            <Tab 
                disableRipple
                label="Posts" 
                sx={{ ...ProfileTabStyles, minWidth: 100 }}
                onMouseEnter={() => handleTabMouseEnter(0)}
                onMouseLeave={handleTabMouseLeave}
                data-index={0}
            />
            <Tab 
                disableRipple
                label="Saved" 
                sx={{ ...ProfileTabStyles, minWidth: 100 }}
                onMouseEnter={() => handleTabMouseEnter(1)}
                onMouseLeave={handleTabMouseLeave}
                data-index={1}
            />
            </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0}>
          {posts.length === 0 ? (
            <div>
              <p>No Posts yet</p>
            </div>
            ) : (
              <>
              {posts.map(post => (
                <Post
                  key={post.id}
                  image={post.type === 'image' ? post.location : null}
                  text={post.text}
                  date={post.date}
                  user={user}
                />
              ))}
              </>
          )}
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          Nothing saved here
        </TabPanel>
      </Box>
    );
  };
  
  export {TabComponent, ProfileTab};