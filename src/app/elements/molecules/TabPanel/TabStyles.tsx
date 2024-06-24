import { SxProps } from '@mui/system';

export const tabStyles: SxProps = {
  fontSize: 17,
  textTransform: "none",
  color: '#A3A3A3',
  paddingInline: 8,
  '&.Mui-selected': {
    color: 'white',
  },
  '&:hover': {
    transition: 'background-color 0.3s ease',
  },
  '&.Mui-selected:hover': {
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

