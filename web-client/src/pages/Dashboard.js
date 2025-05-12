import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@mui/material';
import { 
  Person as PersonIcon, 
  Add as AddIcon,
  Edit as EditIcon,
  Event as EventIcon,
  Description as DocumentIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, you would fetch user data here
    const fetchUserData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setUserData({
          ...currentUser,
          cases: [
            { id: 1, title: 'Case #12345', status: 'Active', lastUpdated: '2025-05-10' },
            { id: 2, title: 'Case #12346', status: 'Pending', lastUpdated: '2025-05-05' },
          ],
          upcomingHearings: [
            { id: 1, title: 'Hearing #1', date: '2025-05-15', caseId: 1 },
            { id: 2, title: 'Hearing #2', date: '2025-05-20', caseId: 2 },
          ]
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Dashboard</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* User Profile Card */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
                <PersonIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h6">
                  {userData?.firstName} {userData?.lastName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {userData?.username}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {userData?.email}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Button 
              variant="outlined" 
              fullWidth 
              startIcon={<EditIcon />}
              onClick={() => navigate('/profile')}
            >
              Edit Profile
            </Button>
          </Paper>
        </Grid>

        {/* Cases Card */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">My Cases</Typography>
                <Button 
                  size="small" 
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/cases/new')}
                >
                  New Case
                </Button>
              </Box>
              
              <List>
                {userData?.cases?.map((caseItem) => (
                  <React.Fragment key={caseItem.id}>
                    <ListItem button onClick={() => navigate(`/cases/${caseItem.id}`)}>
                      <ListItemAvatar>
                        <Avatar>
                          <DescriptionIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={caseItem.title} 
                        secondary={`Status: ${caseItem.status} • Last updated: ${caseItem.lastUpdated}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => navigate(`/cases/${caseItem.id}/edit`)}>
                          <EditIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
                {(!userData?.cases || userData.cases.length === 0) && (
                  <Typography variant="body2" color="textSecondary" align="center" sx={{ py: 2 }}>
                    No cases found. Create your first case to get started.
                  </Typography>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Hearings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Hearings
              </Typography>
              
              <List>
                {userData?.upcomingHearings?.map((hearing) => (
                  <React.Fragment key={hearing.id}>
                    <ListItem button onClick={() => navigate(`/cases/${hearing.caseId}`)}>
                      <ListItemAvatar>
                        <Avatar>
                          <EventIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={hearing.title} 
                        secondary={`Date: ${hearing.date}`}
                      />
                      <ListItemSecondaryAction>
                        <Button 
                          variant="outlined" 
                          size="small"
                          onClick={() => navigate(`/cases/${hearing.caseId}`)}
                        >
                          View Case
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
                {(!userData?.upcomingHearings || userData.upcomingHearings.length === 0) && (
                  <Typography variant="body2" color="textSecondary" align="center" sx={{ py: 2 }}>
                    No upcoming hearings scheduled.
                  </Typography>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
