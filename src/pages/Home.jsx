/* eslint-disable react-refresh/only-export-components */

import styled from 'styled-components'
import logo from '../assets/images/logoTutorBot.png'
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom';
import  { useEffect } from 'react';


const ContainerHome = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  backgroundColor: 'var(--primary-color)',
  padding: '0',
  margin: '0',
  gap: '20px',
})

const Image = styled('img')({
  height: '40vmin',
  pointerEvents: 'visibleFill',
})

const Title = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100px',
  width: '250px',
  backgroundColor: 'var(--secondary-color)',
  color: 'var(--quaternary-color)'
})

const ButtonHome = styled('button')({
  backgroundColor: 'var(--secondary-color)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const user = localStorage.getItem('user');
    if (user) {
        navigate('/principalmenu');
    }
  }, [navigate]);


  return (
    <ContainerHome>
      <Image src={logo} alt='logo tutor bot'/>
      <Title>
        <Typography variant='h3' sx={{fontFamily: 'Lily Script One'}}>Tutor Bot</Typography>
      </Title>
      <Link to = "/login">
      <ButtonHome >
        <Typography variant='h5'>Get Started</Typography>
      </ButtonHome>
      </Link>
      
    </ContainerHome>
  )
}

export default Home