import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Navbar from '../components/NavbarEbooks';
import SidebarUser from '../components/SidebarUser'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ContainerCustom = styled.div`
    display: flex;
    flex-direction: row;
    justifyContent: 'flex-start',
    align-items: flex-start;
    height: 100vh;
    width: 100vw;
    background-color: var(--secondary-color);
`;

const HistorialContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: var(--secondary-color);
    padding: 5rem;
    margin: 0;
    gap: 20px;
`;

const TableContainer = styled.table`
    width: 80%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const TableHeader = styled.th`
    background-color: var(--primary-color);
    color: white;
    padding: 10px;
`;

const TableCell = styled.td`
    border: 1px solid var(--primary-color);
    padding: 10px;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const SearchBar = styled.input`
    padding: 10px;
    width: 60%;
    margin-bottom: 20px;
    font-size: 16px;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
`;

const Historial = () => {
    const [questionnaires, setQuestionnaires] = useState([]);
    const [filteredQuestionnaires, setFilteredQuestionnaires] = useState([]);
    const [user, setUser] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/');
        }
        setUser(user);
    }, [navigate]);

    useEffect(() => {
        const fetchQuestionnaires = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/v1/questionnaires/all/${user.user_id}`);
                if (response.status === 200) {
                    setQuestionnaires(response.data.questionnaires);
                    setFilteredQuestionnaires(response.data.questionnaires);
                } else {
                    console.error('Error al obtener los cuestionarios');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (user.user_id) {
            fetchQuestionnaires();
        }
    }, [user.user_id]);

    useEffect(() => {
        const filtered = questionnaires.filter(questionnaire =>
            questionnaire.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredQuestionnaires(filtered);
    }, [searchTerm, questionnaires]);

    const handleVerDetalles = (questionnaireId) => {
        // Abre una nueva ventana al hacer clic en Ver Detalles
        window.open(`/history/${questionnaireId}/ver-detalles`, '_blank');
    };

    return (
        <ContainerCustom>
            <SidebarUser email={user.email} name={user.name}/>
            <HistorialContent>
                <Navbar page="Regresar" route="/principalmenu" />
                <h2>Exámenes recientes</h2>
                <SearchBar
                    type="text"
                    placeholder="Buscar exámenes por título..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <TableContainer>
                    <thead>
                        <TableRow>
                            <TableHeader>Título</TableHeader>
                            <TableHeader>Puntuación</TableHeader>
                            <TableHeader>Acciones</TableHeader>
                        </TableRow>
                    </thead>
                    <tbody>
                        {filteredQuestionnaires.map(questionnaire => (
                            <TableRow key={questionnaire.id}>
                                <TableCell>{questionnaire.title}</TableCell>
                                <TableCell>{questionnaire.score}</TableCell>
                                <TableCell>
                                    <Link to={`/history/${questionnaire.id}/ver-detalles`} onClick={() => handleVerDetalles(questionnaire.id)}>
                                        Ver Detalles
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </TableContainer>
            </HistorialContent>
        </ContainerCustom>
    );
};

export default Historial;
