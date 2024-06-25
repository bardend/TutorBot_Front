import React from 'react';
import { 
  Typography, Grid, Paper, Avatar, Button, LinearProgress, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Card, CardContent, Divider
} from '@mui/material';
import { 
  Email, CalendarToday, LibraryBooks, Star, 
  AccessTime, TrendingUp, EmojiEvents
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
  const user = JSON.parse(localStorage.getItem('user')) || {
    name: 'Usuario Ejemplo',
    email: 'usuario@ejemplo.com',
    photoURL: '/default-avatar.png'
  };

  const stats = {
    totalQuizzes: 50,
    averageScore: 85,
    totalTime: '30h 45m',
    lastActive: '20 min atraz',
    completionRate: 75,
    ranking: 15,
    badges: 8,
    streak: 7,
  };

  const recentActivity = [
    { date: '2023-06-20', activity: 'Completó el cuestionario de React Avanzado', score: 95 },
    { date: '2023-06-18', activity: 'Obtuvo la insignia "Experto en JavaScript"', score: null },
    { date: '2023-06-15', activity: 'Completó el cuestionario de Node.js Básico', score: 88 },
  ];

  return (
    <ProfileContainer>
      <ProfileHeader elevation={3}>
        <ProfileAvatar src={user.photoURL} alt={user.name} />
        <ProfileInfo>
          <Typography variant="h4" gutterBottom>{user.name}</Typography>
          <IconText>
            <Email /> <Typography variant="body1">{user.email}</Typography>
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
              <Typography variant="h6" gutterBottom>Puntuación</Typography>
              <Typography variant="h3">{stats.averageScore}%</Typography>
              <IconText>
                <Star />
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
                    {recentActivity.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.activity}</TableCell>
                        <TableCell align="right">{row.score ? `${row.score}%` : '-'}</TableCell>
                      </TableRow>
                    ))}
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
