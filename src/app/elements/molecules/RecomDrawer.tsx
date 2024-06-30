import React, { useEffect, useState, useContext } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from '@mui/material';
import { getUnfollowedUsers } from '@/app/backend/UserDataService';
import { auth } from '@/app/firebase';
import { HeightContext } from '../context/HeightContext';
import { ArrowBack } from '@mui/icons-material';

const RecommendationsDrawer: React.FC<{ open: boolean, toggleDrawer: () => void }> = ({ open, toggleDrawer }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUnfollowedUsers = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const unfollowedUsers = await getUnfollowedUsers(currentUser.uid);
        setUsers(unfollowedUsers);
      }
    };

    fetchUnfollowedUsers();
  }, []);

  const heightContext = useContext(HeightContext);

  if (!heightContext) {
      return null;
  }

  const { height } = heightContext;
  
  return (
    <Drawer
      variant="persistent"
      open={open}
      anchor="right"
      sx={{ width: 80, flexShrink: 0, '& .MuiDrawer-paper': { width: 300, color: 'white', backgroundColor: 'black', top: height + 1, boxSizing: 'border-box', flexShrink: 0, borderLeftColor: '#333', borderLeftWidth: 0.25} }}
    >
    <IconButton onClick={toggleDrawer} sx={{ color: 'black', alignSelf: 'start', transform: 'rotate(180deg)', marginTop: 4, width: 40, height: 40, backgroundColor: 'white', marginLeft: 2,
                '&:hover': {
                  backgroundColor: 'gray',
                }}}>
        <ArrowBack />
      </IconButton>
      <List>
        <ListItem>
          <ListItemText primary="Recommendations" primaryTypographyProps={{ fontWeight: 'bold', fontSize: 22, color: 'white', marginBottom: -1 }}/>
        </ListItem>
        {users.map(user => (
          <ListItem key={user.uid} button>
            <ListItemAvatar>
              <Avatar src={user.profileImage} />
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={`@${user.username}`}  secondaryTypographyProps={{color: '#A3A3A3'}}/>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default RecommendationsDrawer;
