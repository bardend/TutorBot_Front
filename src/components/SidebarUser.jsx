import { styled } from '@mui/material/styles';
import userPhoto from '../assets/images/userPhoto.png';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const SidebarContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '210px', // Ancho fijo
  height: '100vh',
  backgroundColor: theme.palette.background.paper,
  alignItems: 'center',
  fontFamily: 'Popins, sans-serif',
  paddingLeft: '0',
  boxSizing: 'border-box',
  position: 'sticky',
  top: '0', // Para fijar en la parte superior
  zIndex: '1000', // Asegura que esté por encima de otros contenidos al hacer scroll
  
}));

const UserPhoto = styled(Box)(({ theme }) => ({
  width: '200px',
  height: '10rem',
  padding: theme.spacing(2, 0),
  display: 'flex',
  justifyContent: 'center',
}));

const Image = styled('img')({
  width: '70%',
  borderRadius: '50%',
});

const UserName = styled(Typography)({
  color: '#fff',
  fontSize: '1.7rem',
  marginBottom: '20px',
  width: '100%',
  textAlign: 'left',
  padding: '0px 3.5rem',
});

const ActiveUserEmail = styled(Typography)({
  color: '#fff',
  fontSize: '1rem',
  marginBottom: '1rem',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  padding: '0px 10px',
  flexDirection: 'row',
  gap: '5px',
});

const Circle = styled(Box)({
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  backgroundColor: '#50CE4D',
  marginRight: '5px',
});

const SidebarOptions = styled('div')({
  background: 'linear-gradient(180deg, rgba(168,174,227,1) 0%, rgba(56,71,199,1) 56%, rgba(89,93,133,1) 100%)',
  flexGrow: 1,
  width: '100%',
  boxSizing: 'border-box',
  paddingTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  paddingLeft: '1rem',
  borderRadius: '30px 30px 0 0',
  gap: '10px',
  fontSize: '1.3rem',
  margin: 0,
});

const Option = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  alignContent: 'center',
  padding: theme.spacing(1, 2.5),
  color: 'white',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
}));

const IconWrapper = styled(Box)({
  marginRight: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

import PropTypes from 'prop-types';



const SidebarUser = ({ name, email }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };
  return (
    <SidebarContainer>
      <UserPhoto>
        <Image src={userPhoto} alt="User Photo" />
      </UserPhoto>
      <SidebarOptions>
        <UserName>{name}</UserName>
        <ActiveUserEmail>
          <Circle />
          {email}
        </ActiveUserEmail>
        <Link to='/history'>
          <Option>
            <IconWrapper><LibraryBooksIcon /></IconWrapper>Historial
          </Option>
        </Link>
        <Link to='/settings'>
          <Option>
            <IconWrapper><SettingsIcon /></IconWrapper>Configuración
          </Option>
        </Link>
        <Option onClick={handleLogout}>
          <IconWrapper><ExitToAppIcon /></IconWrapper>Salir
        </Option>
      </SidebarOptions>
    </SidebarContainer>
  );
};

SidebarUser.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default SidebarUser;