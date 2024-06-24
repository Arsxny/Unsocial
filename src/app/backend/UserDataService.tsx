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

            // Count followers and following
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
      // Update current user's following list
      const userFollowingRef = dbRef(database, `Users/${currentUserId}/following`);
      await update(userFollowingRef, {
        [otherUserId]: true
      });
  
      // Optionally, update other user's followers list
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
      // Remove otherUserId from current user's following list
      const userFollowingRef = dbRef(database, `Users/${currentUserId}/following/${otherUserId}`);
      await set(userFollowingRef, null);
  
      // Optionally, remove currentUserId from other user's followers list
      const otherUserFollowersRef = dbRef(database, `Users/${otherUserId}/followers/${currentUserId}`);
      await set(otherUserFollowersRef, null);
  
      console.log(`User ${currentUserId} unfollowed user ${otherUserId}`);
    } catch (error) {
      console.error('Error unfollowing user:', error);
      throw error;
    }
  };

export {updateUserData, getUserData, followUser, unfollowUser};