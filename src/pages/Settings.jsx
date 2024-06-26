import React, { useState, useEffect } from 'react';
import { 
  Typography, Grid, Paper, Avatar, Button, LinearProgress, 
  Table, TableBody, TableCell, TableContainer, TableRow,
  Card, CardContent, Divider, Tooltip, Badge as MuiBadge, Container
} from '@mui/material';
import { 
  Email, LibraryBooks, Star, AccessTime, TrendingUp, EmojiEvents, SentimentVeryDissatisfied,
  PhotoCamera, FlashOn, LocalFireDepartment, EmojiEventsOutlined
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ProfileContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  maxWidth: '1000px !important',
  marginLeft: 'auto !important',
  marginRight: 'auto !important',
}));

const ProfileHeader = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  position: 'relative',
  width: '100%',
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
  width: '100%',
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
  width: '100%',
}));

const UploadInput = styled('input')({
  display: 'none',
});

const UserLevel = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: '50%',
  width: theme.spacing(8),  // Aumentar el tamaño del ancho
  height: theme.spacing(8),  // Aumentar el tamaño de la altura
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  boxShadow: theme.shadows[3],
}));

const XPBar = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 10,
  width: '100%',
  '& .MuiLinearProgress-bar': {
    transition: 'transform 1s ease-in-out',
  },
}));

const AnimatedStat = styled(Typography)(({ theme }) => ({
  animation: '$pulse 1s ease-in-out infinite',
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.05)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}));

const AchievementBadge = styled(MuiBadge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const LevelUpAnimation = styled('div')({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '4rem',
  color: '#FFD700',
  animation: '$levelUp 2s ease-out',
  zIndex: 9999,
  '@keyframes levelUp': {
    '0%': { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
    '50%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1.2)' },
    '100%': { opacity: 0, transform: 'translate(-50%, -50%) scale(1)' },
  },
});

const MiPerfil = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('profileImage') || '/default-avatar.png';
  });
  const [showLevelUp, setShowLevelUp] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.user_id) {
      setUserId(user.user_id);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('profileImage', profileImage);
  }, [profileImage]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;

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

  useEffect(() => {
    if (profile && profile.xp >= profile.xpToNextLevel) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 2000);
    }
  }, [profile]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageData = reader.result;
        setProfileImage(imageData);
        
        // Aquí puedes agregar la lógica para enviar la imagen al servidor
      };
      reader.readAsDataURL(file);
    }
  };

  const getScoreStyles = (score) => {
    let color = '#4CAF50';
    let icon = <Star />;

    if (score < 10) {
      color = '#F44336';
      icon = <SentimentVeryDissatisfied />;
    }

    return { color, icon };
  };

  if (error) {
    return <ProfileContainer><div>{error}</div></ProfileContainer>;
  }

  if (!profile) {
    return <ProfileContainer><div>Loading...</div></ProfileContainer>;
  }

  const { name, email, total_exams, average_score } = profile;
  const stats = {
    totalQuizzes: total_exams || 0,
    averageScore: average_score ? parseFloat(average_score).toFixed(2) : 0,
    totalTime: '30h 45m',
    lastActive: '20 min atrás',
    completionRate: 75,
    ranking: 15,
    badges: 8,
    streak: 7,
    level: 5,
    xp: 750,
    xpToNextLevel: 1000,
  };

  const { color, icon } = getScoreStyles(stats.averageScore);

  const achievements = [
    { id: 1, name: 'Primer Cuestionario', icon: <LibraryBooks />, completed: true },
    { id: 2, name: 'Racha de 7 días', icon: <LocalFireDepartment />, completed: true },
    { id: 3, name: 'Maestro del Conocimiento', icon: <EmojiEventsOutlined />, completed: false },
  ];

  return (
    <ProfileContainer>
      {showLevelUp && <LevelUpAnimation>¡Nivel Subido!</LevelUpAnimation>}
      
      <ProfileHeader elevation={3}>
        <ProfileAvatar src={profileImage} alt={name} />
        <ProfileInfo>
          <Typography variant="h4" gutterBottom>{name}</Typography>
          <IconText>
            <Email /> <Typography variant="body1">{email}</Typography>
          </IconText>
          <label htmlFor="upload-photo">
            <UploadInput
              accept="image/*"
              id="upload-photo"
              type="file"
              onChange={handleImageUpload}
            />
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<PhotoCamera />}
              sx={{ mt: 2, alignSelf: 'flex-start' }}
            >
              Editar Foto de Perfil
            </Button>
          </label>
        </ProfileInfo>
        <UserLevel>Lvl {stats.level}</UserLevel>
      </ProfileHeader>
      
      <XPBar 
        variant="determinate" 
        value={(stats.xp / stats.xpToNextLevel) * 100} 
        sx={{ mt: 2, mb: 1 }}
      />
      <Typography variant="body2" align="center">
        {stats.xp} / {stats.xpToNextLevel} XP
      </Typography>

      <Grid container spacing={3} sx={{ mt: 3, justifyContent: 'flex-start' }}>
        <Grid item xs={12} sm={6} md={6}>
          <StatsCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>Cuestionarios</Typography>
              <AnimatedStat variant="h3">{stats.totalQuizzes}</AnimatedStat>
              <IconText>
                <LibraryBooks />
                <Typography variant="body2">Total completados</Typography>
              </IconText>
            </CardContent>
          </StatsCard>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <StatsCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>Puntuación</Typography>
              <AnimatedStat variant="h3" style={{ color }}>{stats.averageScore}</AnimatedStat>
              <IconText>
                {icon}
                <Typography variant="body2">Promedio general</Typography>
              </IconText>
            </CardContent>
          </StatsCard>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <StatsCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>Tiempo de Estudio</Typography>
              <AnimatedStat variant="h3">{stats.totalTime}</AnimatedStat>
              <IconText>
                <AccessTime />
                <Typography variant="body2">Última actividad: {stats.lastActive}</Typography>
              </IconText>
            </CardContent>
          </StatsCard>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <StatsCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>Racha</Typography>
              <AnimatedStat variant="h3">
                <LocalFireDepartment sx={{ color: 'orange', mr: 1 }} />
                {stats.streak}
              </AnimatedStat>
              <Typography variant="body2">¡Días seguidos!</Typography>
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

      <Grid container spacing={3} sx={{ mt: 3, justifyContent: 'flex-start' }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Logros</Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                {achievements.map((achievement) => (
                  <Grid item key={achievement.id} xs={4}>
                    <Tooltip title={achievement.name}>
                      <AchievementBadge
                        badgeContent={achievement.completed ? <FlashOn color="primary" /> : null}
                      >
                        <Avatar
                          sx={{
                            width: 56,
                            height: 56,
                            bgcolor: achievement.completed ? 'primary.main' : 'grey.300',
                          }}
                        >
                          {achievement.icon}
                        </Avatar>
                      </AchievementBadge>
                    </Tooltip>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Próximos Desafíos</Typography>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Completar 5 cuestionarios esta semana</TableCell>
                      <TableCell align="right">
                        <LinearProgress variant="determinate" value={60} sx={{ width: 100 }} />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Obtener una puntuación perfecta</TableCell>
                      <TableCell align="right">
                        <LinearProgress variant="determinate" value={30} sx={{ width: 100 }} />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Alcanzar una racha de 10 días</TableCell>
                      <TableCell align="right">
                        <LinearProgress variant="determinate" value={70} sx={{ width: 100 }} />
                      </TableCell>
                    </TableRow>
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