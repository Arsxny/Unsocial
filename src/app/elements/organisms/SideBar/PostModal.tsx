"use client";

import React, { useState } from 'react';
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
import { useAuthStore } from '@/app/backend/AuthService';

const customBackdropStyle = {
    backgroundColor: 'rgba(108, 122, 137, 0.3)',
  };

const SpringModal = (props) => {
  const { open, handleClose } = props;

  const user = auth.currentUser;

  const [selectedImage, setSelectedImage] = useState<string>(''); ;
  const [step, setStep] = useState(1);
  const [postText, setPostText] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const fadeProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
  });

  const slideInFromRight = useSpring({
    transform: step === 2 ? 'translateX(20%)' : 'translateX(70%)',
    opacity: step === 2 ? 1 : 0,
  });

  const slideOutToLeft = useSpring({
    transform: step === 1 ? 'translateX(50%)' : 'translateX(-25%)',
    opacity: step === 1 ? 1 : 0.3,
  });

  const modalStyle: SxProps = {
    position: 'absolute',
    width: 600,
    left: 0,
    right: 0,
    top: '10%',
    margin: 'auto',
    bgcolor: '#121212',
    boxShadow: 15,
    p: 4,
    borderRadius: 5,
    maxHeight: '90vh',
    overflowY: 'auto',
    scrollbarWidth: 'none', 
    scrollbarColor: '#555 #333',
  };

  const post = async () => {
    console.log('posting');
    //create reference for new post
    const userPostsRef = dbRef(database, `/Users/${user!.uid}/posts`);
    const newPostRef = push(userPostsRef);

    try {
      if (imageFile) {
        // If image is selected, upload it to Firebase Storage
        const storageReference = storageRef(storage, `post_images/${user!.uid}/${imageFile.name}`);
        await uploadBytes(storageReference, imageFile);

        const downloadURL = await getDownloadURL(storageReference);

        // Set post in database with image
        await set(newPostRef, {
          text: postText,
          date: serverTimestamp(),
          location: downloadURL,
          user: user!.uid,
          type: 'image',
        });
      } else {
        // Set post in database without image
        await set(newPostRef, {
          text: postText,
          date: serverTimestamp(),
          user: user!.uid,
          type: 'text',
        });
      }
      handleClose();
    } catch (error) {
      console.error('Error posting:', error);
    }
  };

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
/*       onClose={handleClose} */
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        sx: customBackdropStyle,
      }}
    >
      <animated.div style={fadeProps}>
      <Box sx={modalStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <BackArrow color={'white'} style={{ cursor: 'pointer', marginRight: 10, height: 20, width: 20 }} onClick={handleClose}/>
            <p style={{ fontSize: 18, fontWeight: 'bold', margin: 0 }}>
              Create a post
            </p>
            <Button
              onClick={post}
              variant="outlined"
              sx={{
                borderColor: '#333',
                textTransform: 'none',
                borderWidth: 2,
                borderRadius: 50,
                color: 'white',
                fontSize: 15,
                marginLeft: 'auto',
                ':hover': {
                  backgroundColor: '#333',
                  borderColor: '#333',
                  borderWidth: 2
                },
              }}
            >
              Continue
            </Button>
          </div>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="Write something..."
            multiline
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            InputProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            sx={{
              marginTop: 2,
              marginBottom: 2,
              '.MuiInputBase-root': {
                color: 'white',
              },
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
            }}
          />
          {selectedImage && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
              <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: 300 }} />
            </div>
          )}
          <div style={{ display: 'inline-flex', justifyContent: 'start', alignItems: 'center', marginTop: 10, marginLeft: 5 }}>
            <Galleryicon color={'white'} style={{ cursor: 'pointer', height: 30, width: 30 }} />
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload" style={{ cursor: 'pointer', marginLeft: 10, color: 'white' }}>
              Choose an image
            </label>
          </div>
        </Box>
      </animated.div>
    </Modal>
  );
};

export default SpringModal;
