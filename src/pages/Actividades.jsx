import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/NavbarEbooks';

const ContainerCustom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100vw;
    background-color: var(--secondary-color);
    padding-top: 5rem;
    margin: 0;
`;

const ActividadesContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    background-color: white;
    padding: 2rem;
    margin-top: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Actividades = () => {
    return (
        <ContainerCustom>
            <Navbar page="Regresar" route="/principalmenu" />
            <ActividadesContent>
                <h2>Mis Actividades</h2>
                <p>Aquí puedes ver y gestionar tus actividades recientes.</p>
                {/* Aquí puedes agregar más contenido, como una lista de actividades */}
            </ActividadesContent>
        </ContainerCustom>
    );
};

export default Actividades;