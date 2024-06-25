import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const QuestionContainer = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const QuestionTitle = styled.h3`
  color: #555;
  margin-bottom: 10px;
`;

const OptionsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const OptionItem = styled.li`
  margin-bottom: 5px;
  ${({ isCorrect }) =>
    isCorrect &&
    `
    font-weight: bold;
    color: green;
  `}
`;

const PrintButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  background-color: #007bff;
  &:hover {
    background-color: #0056b3;
  }
`;

const VerDetalles = () => {
  const [quizData, setQuizData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuizData() {
      try {
        const response = await fetch('http://localhost:8000/quiz');
        if (!response.ok) {
          throw new Error('Error fetching quiz data');
        }
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setError(error.message);
      }
    }

    fetchQuizData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
        <p>Por favor, verifica la conexión con el backend y asegúrate de que el servidor esté en funcionamiento.</p>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Quiz</Title>
      <PrintButton onClick={handlePrint}>Imprimir</PrintButton>
      {quizData.length === 0 ? (
        <p>Cargando...</p>
      ) : (
        quizData.map((questionData, index) => (
          <QuestionContainer key={index}>
            <QuestionTitle>
              {index + 1}. {questionData.question}
            </QuestionTitle>
            <OptionsList>
              {questionData.options.map((option, idx) => (
                <OptionItem key={idx} isCorrect={idx === questionData.answer}>
                  {option}
                </OptionItem>
              ))}
            </OptionsList>
          </QuestionContainer>
        ))
      )}
    </Container>
  );
};

export default VerDetalles;
