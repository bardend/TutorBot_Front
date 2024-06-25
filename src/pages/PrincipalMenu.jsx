
import PrincipalMenuOptions from '../components/PrincipalMenuOptions'
import SidebarUser from '../components/SidebarUser'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import  { useEffect, useState } from 'react';


const ContainerMenuPrincipal = styled('div')({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'var(--secondary-color)',
    padding: '0',
    margin: '0',
})

const PrincipalMenu = () => {

  const [user, setUser] = useState({})

  const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            navigate('/principalmenu');
        }
        setUser(user)
    }, [navigate]);

  return (
    <>
        <ContainerMenuPrincipal>
            <SidebarUser email={user.email} name={user.name}/>
            <PrincipalMenuOptions/>
        </ContainerMenuPrincipal>
    </>
    

  )
}

export default PrincipalMenu