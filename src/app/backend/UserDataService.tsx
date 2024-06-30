import { auth, database, storage } from "@/app/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref as dbRef, update, get, set } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const updateUserData = async (uid, userData) => {
    const userRef = dbRef(database, `Users/${uid}`);
    await update(userRef, userData);
  };

const getUserData = async (uid: string) => {
    try {
        const userRef = dbRef(database, `Users/${uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            const userData = snapshot.val();

            const followersCount = userData.followers ? Object.keys(userData.followers).length : 0;
            const followingCount = userData.following ? Object.keys(userData.following).length : 0;

            return { ...userData, followersCount, followingCount };
        } else {
        throw new Error("User data not found");
        }
    } catch (error) {
        console.error("Error getting user data:", error);
        throw error;
    }
};

const followUser = async (currentUserId, otherUserId) => {
    try {
      const userFollowingRef = dbRef(database, `Users/${currentUserId}/following`);
      await update(userFollowingRef, {
        [otherUserId]: true
      });
  
      const otherUserFollowersRef = dbRef(database, `Users/${otherUserId}/followers`);
      await update(otherUserFollowersRef, {
        [currentUserId]: true
      });
  
      console.log(`User ${currentUserId} followed user ${otherUserId}`);
    } catch (error) {
      console.error('Error following user:', error);
      throw error;
    }
  };

  const unfollowUser = async (currentUserId, otherUserId) => {
    try {
      const userFollowingRef = dbRef(database, `Users/${currentUserId}/following/${otherUserId}`);
      await set(userFollowingRef, null);
  
      const otherUserFollowersRef = dbRef(database, `Users/${otherUserId}/followers/${currentUserId}`);
      await set(otherUserFollowersRef, null);
  
      console.log(`User ${currentUserId} unfollowed user ${otherUserId}`);
    } catch (error) {
      console.error('Error unfollowing user:', error);
      throw error;
    }
  };

  const getUnfollowedUsers = async (currentUserId) => {
    try {
      const usersRef = dbRef(database, 'Users');
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const allUsers = snapshot.val();
        const unfollowedUsers = Object.keys(allUsers).filter(uid => uid !== currentUserId && !allUsers[currentUserId].following?.[uid]);
        return unfollowedUsers.map(uid => ({ uid, ...allUsers[uid] }));
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching unfollowed users:', error);
      throw error;
    }
  };

export {updateUserData, getUserData, followUser, unfollowUser, getUnfollowedUsers};