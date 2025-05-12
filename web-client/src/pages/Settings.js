import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Divider,
  Grid,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Switch,
  FormControlLabel
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import Loading from '../components/Loading';

const Settings = () => {
  const { currentUser, updatePassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: true,
    theme: 'light',
    language: 'en'
  });
  
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      return setError("New passwords don't match");
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // In a real app, you would call your API to update the password
      await updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      setSuccess('Password updated successfully!');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err) {
      setError(err.message || 'Failed to update password');
      console.error('Password update error:', err);
    }
    
    setLoading(false);
  };

  if (!currentUser) {
    return <Loading />;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  disabled={loading}
                  error={formData.newPassword !== formData.confirmPassword && formData.confirmPassword !== ''}
                  helperText={formData.newPassword !== formData.confirmPassword && formData.confirmPassword !== '' 
                    ? "Passwords don't match" 
                    : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  disabled={loading || formData.newPassword !== formData.confirmPassword}
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>


        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Preferences
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="theme-label">Theme</InputLabel>
                <Select
                  labelId="theme-label"
                  id="theme"
                  name="theme"
                  value={formData.theme}
                  label="Theme"
                  onChange={handleChange}
                  disabled={loading}
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value="system">System Default</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="language-label">Language</InputLabel>
                <Select
                  labelId="language-label"
                  id="language"
                  name="language"
                  value={formData.language}
                  label="Language"
                  onChange={handleChange}
                  disabled={loading}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Español</MenuItem>
                  <MenuItem value="fr">Français</MenuItem>
                  <MenuItem value="de">Deutsch</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.notifications}
                    onChange={handleChange}
                    name="notifications"
                    color="primary"
                  />
                }
                label="Enable email notifications"
              />
              <FormHelperText>
                Receive email notifications for important updates and activities
              </FormHelperText>
            </Grid>
            
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                disabled={loading}
                onClick={() => {
                  // In a real app, you would save these preferences to your backend
                  setSuccess('Preferences saved successfully!');
                }}
              >
                Save Preferences
              </Button>
            </Grid>
          </Grid>
        </Paper>
        
        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom color="error">
            Danger Zone
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Delete Account
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Permanently delete your account and all associated data. This action cannot be undone.
            </Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                  // In a real app, you would call your API to delete the account
                  alert('Account deletion would be processed here');
                }
              }}
            >
              Delete My Account
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Settings;
