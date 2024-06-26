import React, { useState, useEffect } from 'react';
import { 
  Typography, Grid, Paper, Avatar, Button, LinearProgress, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Card, CardContent, Divider
} from '@mui/material';
import { 
  Email, LibraryBooks, Star, AccessTime, TrendingUp, EmojiEvents, SentimentVeryDissatisfied
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ProfileContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

const ProfileHeader = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginRight: theme.spacing(3),
}));

const ProfileInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
}));

const StatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const IconText = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  '& > svg': {
    marginRight: theme.spacing(1),
  },
}));

const ProgressSection = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const MiPerfil = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null); // State to hold the user ID

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.user_id) {
      setUserId(user.user_id); // Set the user ID for fetching profile
    }
  }, []);

  // Fetch profile data based on userId
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return; // Exit if userId is not defined yet

      try {
        console.log(`Fetching profile for user ID: ${userId}`);
        const response = await fetch(`http://localhost:8000/${userId}/profile`);
        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(`Error fetching user profile: ${errorDetails}`);
        }
        const data = await response.json();
        console.log("Profile data:", data);
        setProfile(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError(error.message);
      }
    };

    fetchProfile();
  }, [userId]);

  // Función para determinar el color y el ícono basado en la puntuación
  const getScoreStyles = (score) => {
    let color = '#4CAF50'; // Verde por defecto para puntajes altos
    let icon = <Star />; // Icono por defecto para puntajes altos

    if (score < 10) {
      color = '#F44336'; // Rojo para puntajes bajos
      icon = <SentimentVeryDissatisfied />; // Icono de carita triste para puntajes bajos
    }

    return { color, icon };
  };

  // Renderizado condicional en caso de error
  if (error) {
    return <div>{error}</div>;
  }

  // Renderizado condicional mientras se carga el perfil
  if (!profile) {
    return <div>Loading...</div>;
  }

  // Extracción de datos del perfil y estadísticas
  const { name, email, total_exams, average_score } = profile;
  const stats = {
    totalQuizzes: 50, // Ejemplo de datos estáticos para estadísticas
    averageScore: average_score ? parseFloat(average_score).toFixed(2) : 0, // Puntuación promedio
    totalTime: '30h 45m', // Ejemplo de datos estáticos para estadísticas
    lastActive: '20 min atrás', // Ejemplo de datos estáticos para estadísticas
    completionRate: 75, // Ejemplo de datos estáticos para estadísticas
    ranking: 15, // Ejemplo de datos estáticos para estadísticas
    badges: 8, // Ejemplo de datos estáticos para estadísticas
    streak: 7, // Ejemplo de datos estáticos para estadísticas
  };

  // Determina el estilo de la puntuación
  const { color, icon } = getScoreStyles(stats.averageScore);

  // JSX del componente MiPerfil
  return (
    <ProfileContainer>
      <ProfileHeader elevation={3}>
        <ProfileAvatar src="/default-avatar.png" alt={name} />
        <ProfileInfo>
          <Typography variant="h4" gutterBottom>{name}</Typography>
          <IconText>
            <Email /> <Typography variant="body1">{email}</Typography>
          </IconText>
          <Button variant="contained" color="primary" sx={{ mt: 2, alignSelf: 'flex-start' }}>
            Editar Perfil
          </Button>
        </ProfileInfo>
      </ProfileHeader>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatsCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>Cuestionarios</Typography>
              <Typography variant="h3">{stats.totalQuizzes}</Typography>
              <IconText>
                <LibraryBooks />
                <Typography variant="body2">Total completados</Typography>
              </IconText>
            </CardContent>
          </StatsCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <StatsCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>Puntuación 20</Typography>
              <Typography variant="h3" style={{ color }}>{stats.averageScore}</Typography>
              <IconText>
                {icon}
                <Typography variant="body2">Promedio general</Typography>
              </IconText>
            </CardContent>
          </StatsCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <StatsCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>Tiempo de Estudio</Typography>
              <Typography variant="h3">{stats.totalTime}</Typography>
              <IconText>
                <AccessTime />
                <Typography variant="body2">Última actividad: {stats.lastActive}</Typography>
              </IconText>
            </CardContent>
          </StatsCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <StatsCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>Ranking</Typography>
              <Typography variant="h3">#{stats.ranking}</Typography>
              <IconText>
                <TrendingUp />
                <Typography variant="body2">Entre todos los usuarios</Typography>
              </IconText>
            </CardContent>
          </StatsCard>
        </Grid>
      </Grid>

      <ProgressSection>
        <Typography variant="h6" gutterBottom>Progreso General</Typography>
        <LinearProgress 
          variant="determinate" 
          value={stats.completionRate} 
          sx={{ height: 10, borderRadius: 5, mb: 1 }} 
        />
        <Typography variant="body2" align="right">
          {stats.completionRate}% Completado
        </Typography>
      </ProgressSection>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Logros</Typography>
              <Divider sx={{ mb: 2 }} />
              <IconText>
                <EmojiEvents />
                <Typography variant="body1">{stats.badges} Insignias obtenidas</Typography>
              </IconText>
              <IconText>
                <TrendingUp />
                <Typography variant="body1">Racha actual: {stats.streak} días</Typography>
              </IconText>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Actividad Reciente</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Actividad</TableCell>
                      <TableCell align="right">Puntuación</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Aquí puedes mapear los datos de `recentActivity` como lo hiciste anteriormente */}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ProfileContainer>
  );
};

export default MiPerfil;
