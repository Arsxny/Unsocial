"use client";

import React, { useState, useContext, useRef, useEffect } from 'react';
import { Tabs, Tab, Box, Typography, Button } from '@mui/material';
import { PostType, ProfileTabType, TabComponentType, TabProps } from '../../../types';
import { ProfileTabStyles, tabStyles } from './TabStyles';
import { HeightContext } from '../../context/HeightContext';
import { ref as dbRef, get, query, orderByChild } from 'firebase/database';
import { auth, database, storage } from "@/app/firebase";
import Post from '../Post/Post';
import { useAuthStore } from '@/app/backend/AuthService';
import Masonry from '@mui/lab/Masonry';
import { getUserData } from '@/app/backend/UserDataService';
import { getFollowedUsersPosts, getUnfollowedUsersPosts } from '@/app/backend/PostService';

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
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [browsePosts, setBrowsePosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;
  const [followId, setFollowId] = useState('');

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
    const fetchFollowedUsersPosts = async () => {
      try {
        const allPosts = await getFollowedUsersPosts(currentUser!.uid);
        setPosts(allPosts);
      } catch (error) {
        console.error('Error fetching followed users posts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchFollowedUsersPosts();
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchUnfollowedUsersPosts = async () => {
      try {
        const allPosts = await getUnfollowedUsersPosts(currentUser!.uid);
        setBrowsePosts(allPosts);
      } catch (error) {
        console.error('Error fetching unfollowed users posts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUnfollowedUsersPosts();
    }
  }, [currentUser]);
  
  return (
    <Box sx={{ width: '100%', typography: 'body1',}}>
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
              centered
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
              label="Following" 
              sx={{ ...tabStyles, minWidth: 100 }}
              onMouseEnter={() => handleTabMouseEnter(0)}
              onMouseLeave={handleTabMouseLeave}
              data-index={0}
          />
          <Tab 
              disableRipple
              label="Browse" 
              sx={{ ...tabStyles, minWidth: 100 }}
              onMouseEnter={() => handleTabMouseEnter(1)}
              onMouseLeave={handleTabMouseLeave}
              data-index={1}
          />
          </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        {posts.length === 0 ? (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 50}}>
              <p>Give a follow to see what's new!</p>
            </div>
            ) : (
              <>
              {posts.map(post => (
                <Post
                  key={post.key}
                  image={post.type === 'image' ? post.location : null}
                  text={post.text}
                  date={post.date}
                  user={post.user}
                />
              ))}
              </>
          )}
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 50 }}>
              <p>Loading...</p>
            </div>
          ) : (
            <>
              {browsePosts.length === 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 50 }}>
                  <p>No posts to display.</p>
                </div>
              ) : (
                browsePosts.map(post => (
                  <Post
                    key={post.key}
                    image={post.type === 'image' ? post.location : null}
                    text={post.text}
                    date={post.date}
                    user={post.user}
                  />
                ))
              )}
            </>
          )}
      </TabPanel>
    </Box>
  );
};

  const ProfileTab: React.FC<ProfileTabType> = (props) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const tabsRef = useRef<HTMLDivElement | null>(null);
    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState(true);
  
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
        if (props.userId) {
          const userPostsRef = dbRef(database, `/Users/${props.userId}/posts`);
          const postsQuery = query(userPostsRef, orderByChild('date'));
          const snapshot = await get(postsQuery);
          if (snapshot.exists()) {
            const postsData = snapshot.val();
            const postsArray = Object.keys(postsData).map(key => ({
              key: key,
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
    
    if (props.userId) {
      fetchPosts();
    }
  }, [props.userId]);

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
            <div style={{justifyContent: 'center', alignItems: 'center'}}>
              <p>No Posts yet</p>
            </div>
            ) : (
              <>
              {posts.map(post => (
                <Post
                  key={post.key}
                  image={post.type === 'image' ? post.location : null}
                  text={post.text}
                  date={post.date}
                  user={props.userId}
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