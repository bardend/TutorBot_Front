import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/NavbarEbooks';
import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarUser from '../components/SidebarUser'


const PageLayout = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const ContainerEbook = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--secondary-color);
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;
  margin-right: 400px; // Aumentado para el Sidebar más ancho
`;

const Sidebar = styled.div`
  width: 400px; // Aumentado el ancho
  background-image: url('https://example.com/path-to-your-background-image.jpg'); // Reemplaza con tu URL de imagen
  background-size: cover;
  background-position: center;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  color: white; // Cambiado a blanco para contrastar con el fondo
  text-shadow: 1px 1px 3px rgba(0,0,0,0.8); // Sombra para mejorar la legibilidad
`;

const SidebarTitle = styled.h2`
  color: white;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const SidebarContent = styled.div`
  font-size: 16px;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6); // Fondo semitransparente para mejorar la legibilidad
  padding: 20px;
  border-radius: 10px;
`;

const LanguageGif = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 600px;
  padding: 10px;
  margin: 20px auto;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: block;
`;

const LanguageContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const LanguageTitle = styled.h2`
  color: #333;
  margin-bottom: 15px;
  font-size: 24px;
  text-align: center;
`;

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(180px, 1fr));
  gap: 10px;
  justify-items: center;
`;

const BookLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #333;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.3s;
  background-color: ${props => props.recommended ? '#ffeb3b' : 'white'};
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 180px;
  text-align: center;

  &:hover {
    background-color: ${props => props.recommended ? '#fdd835' : '#f5f5f5'};
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const BookTitle = styled.p`
  font-weight: bold;
  text-align: center;
  font-size: 14px;
  margin: 5px 0;
`;

const RecommendedBadge = styled.span`
  background-color: #4caf50;
  color: white;
  padding: 3px 8px;
  border-radius: 20px;
  font-size: 0.7rem;
  margin-top: 5px;
`;

const books = [
  { id: 1, title: "Python básico", language: "Python", level: "Principiante", url: "https://example.com/python-beginners", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", recommendedFor: [0, 3] },
  { id: 2, title: "Python intermedio", language: "Python", level: "Intermedio", url: "https://example.com/python-intermediate", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", recommendedFor: [4, 7] },
  { id: 3, title: "Python avanzado", language: "Python", level: "Avanzado", url: "https://example.com/python-advanced", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", recommendedFor: [8, 10] },
  { id: 4, title: "Java básico", language: "Java", level: "Principiante", url: "https://example.com/java-basics", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", recommendedFor: [0, 3] },
  { id: 5, title: "Java intermedio", language: "Java", level: "Intermedio", url: "https://example.com/java-intermediate", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", recommendedFor: [4, 7] },
  { id: 6, title: "Java avanzado", language: "Java", level: "Avanzado", url: "https://example.com/java-advanced", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", recommendedFor: [8, 10] },
  { id: 7, title: "JavaScript básico", language: "JavaScript", level: "Principiante", url: "https://example.com/js-fundamentals", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", recommendedFor: [0, 3] },
  { id: 8, title: "JavaScript avanzado", language: "JavaScript", level: "Avanzado", url: "https://example.com/js-advanced", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", recommendedFor: [4, 10] },
  { id: 9, title: "C++ básico", language: "C++", level: "Principiante", url: "https://example.com/cpp-basics", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", recommendedFor: [0, 5] },
  { id: 10, title: "C++ avanzado", language: "C++", level: "Avanzado", url: "https://example.com/cpp-advanced", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", recommendedFor: [6, 10] },
];

const EBook = ({ userAverage = 5 }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const booksByLanguage = filteredBooks.reduce((acc, book) => {
    if (!acc[book.language]) {
      acc[book.language] = [];
    }
    acc[book.language].push(book);
    return acc;
  }, {});

  const getRecommendedBook = (books, average) => {
    return books.find(book => 
      average >= book.recommendedFor[0] && average <= book.recommendedFor[1]
    );
  };

  const languageTips = {
    Python: {
      tip: "Python es conocido por su simplicidad y legibilidad. Empieza con los conceptos básicos como variables, bucles y funciones antes de avanzar a temas más complejos.",
      gif: "https://media.giphy.com/media/coxQHKASG60HrHtvkt/giphy.gif"
    },
    Java: {
      tip: "Java es un lenguaje versátil usado en muchos entornos. Enfócate en entender la programación orientada a objetos y la sintaxis específica de Java.",
      gif: "https://media.giphy.com/media/l3vRc1zy8NBqe342I/giphy.gif"
    },
    JavaScript: {
      tip: "JavaScript es esencial para el desarrollo web. Comienza con los fundamentos y luego explora sus capacidades para manipular el DOM y crear interactividad en páginas web.",
      gif: "https://media.giphy.com/media/ln7z2eWriiQAllfVcn/giphy.gif"
    },
    "C++": {
      tip: "C++ es poderoso pero puede ser complejo. Asegúrate de entender bien los punteros y la gestión de memoria. La práctica constante es clave.",
      gif: "https://media.giphy.com/media/Ri2TUcKlaOcaDBxFpY/giphy.gif"
    }
  };
  const [user, setUser] = useState({})

  const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user)
    }, [navigate]);

  return (
    <PageLayout>
      <SidebarUser email={user.email} name={user.name}/>
      <ContainerEbook>
        <Navbar page='' route="/principalmenu"/>
        <SearchBar 
          type="text" 
          placeholder="Buscar libros o lenguajes..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {Object.entries(booksByLanguage).map(([language, languageBooks]) => {
          const recommendedBook = getRecommendedBook(languageBooks, userAverage);
          return (
            <LanguageContainer key={language} onClick={() => setSelectedLanguage(language)}>
              <LanguageTitle>{language}</LanguageTitle>
              <BookGrid>
                {languageBooks.map(book => (
                  <BookLink 
                    key={book.id} 
                    href={book.url} 
                    target='_blank'
                    rel="noopener noreferrer"
                    recommended={book.id === recommendedBook?.id}
                  >
                    <BookImage src={book.image} alt={`${book.language} logo`} />
                    <BookTitle>{`${book.language} ${book.level}`}</BookTitle>
                    {book.id === recommendedBook?.id && (
                      <RecommendedBadge>Recomendado</RecommendedBadge>
                    )}
                  </BookLink>
                ))}
              </BookGrid>
            </LanguageContainer>
          );
        })}
      </ContainerEbook>
      <Sidebar>
        <SidebarTitle>
          {selectedLanguage ? `Consejos para ${selectedLanguage}` : "Selecciona un lenguaje"}
        </SidebarTitle>
        <SidebarContent>
          {selectedLanguage ? (
            <>
              <LanguageGif src={languageTips[selectedLanguage].gif} alt={`${selectedLanguage} animation`} />
              <p>{languageTips[selectedLanguage].tip}</p>
            </>
          ) : (
            "Haz clic en un lenguaje para ver consejos de aprendizaje y una animación."
          )}
        </SidebarContent>
      </Sidebar>
    </PageLayout>
  );
};

export default EBook;