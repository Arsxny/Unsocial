import { ref as dbRef, get, query, orderByChild } from 'firebase/database';
import { auth, database, storage } from "@/app/firebase";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getUserData } from './UserDataService';
import { PostType } from '../types';

const getPostData = async (uid: string) => {
    try {
          const userPostsRef = dbRef(database, `/Users/${uid}/posts`);
          const postsQuery = query(userPostsRef, orderByChild('date'));
          const snapshot = await get(postsQuery);
          if (snapshot.exists()) {
            const postsData = snapshot.val();
            const postsArray = Object.keys(postsData).map(key => ({
              key: key,
              ...postsData[key],
            }));
            return postsArray
          }
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
};

const getFollowedUsersPosts = async (currentUserId: string) => {
    try {
        const currentUserData = await getUserData(currentUserId);
        const following = currentUserData.following ? Object.keys(currentUserData.following) : [];
        let allPosts: PostType[] = [];

        for (const followedUserId of following) {
            const userPostsRef = dbRef(database, `/Users/${followedUserId}/posts`);
            const postsQuery = query(userPostsRef, orderByChild('date'));
            const snapshot = await get(postsQuery);
            if (snapshot.exists()) {
                const postsData = snapshot.val();
                const postsArray = Object.keys(postsData).map(key => ({
                    key: key,
                    ...postsData[key],
                    date: new Date(postsData[key].date)
                }));
                allPosts = [...allPosts, ...postsArray];
            }
        }
        // Sort all posts by date in descending order
        allPosts.sort((a, b) => b.date.getTime() - a.date.getTime());
        return allPosts;
    } catch (error) {
        console.error('Error fetching followed users posts:', error);
        throw error;
    }
};

const getUnfollowedUsersPosts = async (currentUserId: string) => {
    try {
        const currentUserData = await getUserData(currentUserId);
        const following = currentUserData.following ? Object.keys(currentUserData.following) : [];
        const usersRef = dbRef(database, '/Users');
        const snapshot = await get(usersRef);
        let allPosts: PostType[] = [];

        if (snapshot.exists()) {
            const usersData = snapshot.val();
            const unfollowedUsers = Object.keys(usersData).filter(userId => userId !== currentUserId && !following.includes(userId));

            for (const userId of unfollowedUsers) {
                const userPostsRef = dbRef(database, `/Users/${userId}/posts`);
                const postsQuery = query(userPostsRef, orderByChild('date'));
                const postsSnapshot = await get(postsQuery);
                if (postsSnapshot.exists()) {
                    const postsData = postsSnapshot.val();
                    const postsArray = Object.keys(postsData).map(key => ({
                        key: key,
                        ...postsData[key],
                        date: new Date(postsData[key].date)
                    }));
                    allPosts = [...allPosts, ...postsArray];
                }
            }

            // Sort all posts by date in descending order
            allPosts.sort((a, b) => b.date.getTime() - a.date.getTime());
        }

        return allPosts;
    } catch (error) {
        console.error('Error fetching unfollowed users posts:', error);
        throw error;
    }
};

export {getPostData, getFollowedUsersPosts, getUnfollowedUsersPosts};