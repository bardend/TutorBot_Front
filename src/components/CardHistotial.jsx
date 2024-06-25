import { Card } from "@mui/material"
import styled from "styled-components"
import QuizIcon from '@mui/icons-material/Quiz';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import axios from 'axios'

const CardCustom = styled(Card)({
    backgroundColor:'#D9D9D9',
    width: '300px',
    height: '70px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '1rem'
})
const CardHistotial = ({topic, score, questionarie_id}) => {
  CardHistotial.propTypes = {
    topic: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    questionarie_id: PropTypes.number.isRequired
  };

  const handleClick = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_REACT_API_URL}/api/v1/questionnaires/delete/${questionarie_id}`);

      if (response.status === 200) {
        window.location.reload();
      } else {
        console.error('Error al obtener los cuestionarios');
      }
  } catch (error) {
      console.error('Error:', error);
  }
  }


  return (
    <CardCustom>
        <QuizIcon sx={{fontSize: '40px'}}/>
        <h3>{topic}</h3>
        <h3>{score}</h3>
        
        <button type="button" onClick={handleClick}>
        <DeleteIcon  sx={{fontSize: '20px'}}/>
        </button>
    </CardCustom>
  )
}

export default CardHistotial
