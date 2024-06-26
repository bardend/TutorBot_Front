import { useState, useEffect } from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';

const InputContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '49%',
    padding: '1rem',
    margin:'0',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    position: 'fixed',
    bottom: '0',
    gap: '1rem',
    alignSelf: 'flex-end',
    borderRadius: '10px',
});

const InputUserChat = ({ onSendMessage, activateMicrophone }) => {
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/');
    }
    setUser(user);
  }, [navigate]);

  const handleSendMessage = async (message) => {
    if (message.trim()) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/v1/bot/ask`, {
          question: message,
          name: user.name
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.status === 200) {
          console.log('Respuesta recibida:', response.data);
          onSendMessage({type:'user', text: message}, {type:'bot', text: response.data.res});
        } else {
          onSendMessage({type:'user', text: message});
          console.error('Error al crear el quiz');
        }
      } catch (error) {
        console.error('Error:', error);
      }
      setNewMessage('');
    }
  };

  const handleMicrophoneClick = async () => {
    try {
      const transcript = await activateMicrophone();
      if (transcript) {
        setNewMessage(transcript);
        handleSendMessage(transcript);
      }
    } catch (error) {
      console.error('Error al activar el micrófono:', error);
    }
  };

  return (
    <InputContainer>
      <TextField 
        variant="outlined"
        fullWidth
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Escribe tu mensaje..."
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage(newMessage);
          }
        }}
      />
      <Button variant="contained" color="primary" onClick={() => handleSendMessage(newMessage)}>
        Enviar
      </Button>
      <IconButton color="primary" onClick={handleMicrophoneClick}>
        <MicIcon />
      </IconButton>
    </InputContainer>
  );
};

export default InputUserChat;