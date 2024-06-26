import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EBook from './pages/EBook';
import PrincipalMenu from './pages/PrincipalMenu';
import Chatbot from './pages/Chatbot';
import Quiz from './pages/Quiz';
import Historial from './pages/Historial';
import Register from './pages/Register';
import CreateQuiz from './pages/CreateQuiz';
import Score from './pages/Score';
import Login from './pages/Login';
import VerDetalles from './pages/VerDetalles'; // Importa la página VerDetalles
import Settings from './pages/Settings'; // Importa el componente de Configuración

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ebook" element={<EBook />} />
        <Route path="/principalmenu" element={<PrincipalMenu />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/history" element={<Historial />} />
        <Route path="/history/:questionnaireId/ver-detalles" element={<VerDetalles />} />
        <Route path="/createquiz" element={<CreateQuiz />} />
        <Route path="/score" element={<Score />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/settings" element={<Settings />} /> {/* Ruta para Configuración */}
      </Routes>
    </Router>
  );
}

export default App;
