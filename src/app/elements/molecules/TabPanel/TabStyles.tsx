import { SxProps } from '@mui/system';

export const tabStyles: SxProps = {
  fontSize: 18,
  textTransform: "none",
  color: '#A3A3A3',
  paddingInline: 10,
  '&.Mui-selected': {
    color: 'white',
  },
  '&:hover': {
    backgroundColor: '#333',
    transition: 'background-color 0.3s ease',
  },
  '&.Mui-selected:hover': {
    backgroundColor: '#333',
  },
};

export const ProfileTabStyles: SxProps = {
  fontSize: 17,
  textTransform: "none",
  color: '#A3A3A3',
  paddingInline: 5,
  '&.Mui-selected': {
    color: 'white',
  },
  '&:hover': {
    transition: 'background-color 0.3s ease',
  },
  '&.Mui-selected:hover': {
  },
};

