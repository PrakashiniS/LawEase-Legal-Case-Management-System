import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Gavel as GavelIcon, 
  Scale as ScaleIcon, 
  Group as GroupIcon,
  Description as DocumentIcon,
  Schedule as ScheduleIcon,
  Security as SecurityIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
        },
      }}
    >
      <Box 
        sx={{ 
          width: 60, 
          height: 60, 
          borderRadius: '50%', 
          bgcolor: 'primary.main', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'white',
          mb: 2
        }}
      >
        {React.cloneElement(icon, { fontSize: 'large' })}
      </Box>
      <Typography variant="h6" component="h3" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
    </Paper>
  );
};

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          py: 12,
          textAlign: 'center',
          backgroundImage: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant={isMobile ? 'h3' : 'h2'} 
            component="h1" 
            gutterBottom
            sx={{ fontWeight: 700, mb: 3 }}
          >
            Modern Legal Case Management
          </Typography>
          <Typography 
            variant={isMobile ? 'h6' : 'h5'} 
            component="h2" 
            sx={{ mb: 4, maxWidth: '800px', mx: 'auto', opacity: 0.9 }}
          >
            Streamline your legal practice with our comprehensive case management solution.
            Manage cases, documents, and clients all in one place.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              component={Link} 
              to="/register" 
              variant="contained" 
              color="secondary" 
              size="large"
              sx={{ 
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '8px',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)'
              }}
            >
              Get Started Free
            </Button>
            <Button 
              component={Link} 
              to="/login" 
              variant="outlined" 
              color="inherit"
              size="large"
              sx={{ 
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 500,
                borderRadius: '8px',
                borderWidth: '2px',
                '&:hover': {
                  borderWidth: '2px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Sign In
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ fontWeight: 600, mb: 6 }}
        >
          Powerful Features for Your Legal Practice
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={<GavelIcon />}
              title="Case Management"
              description="Easily manage all your cases in one centralized location with our intuitive interface."
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={<DocumentIcon />}
              title="Document Management"
              description="Store, organize, and access all your legal documents securely in the cloud."
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={<ScheduleIcon />}
              title="Calendar & Deadlines"
              description="Never miss important dates with our integrated calendar and deadline tracking."
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={<GroupIcon />}
              title="Client Portal"
              description="Provide secure access to case information for your clients through their own portal."
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={<SecurityIcon />}
              title="Bank-Grade Security"
              description="Your data is protected with enterprise-grade security and compliance measures."
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={<CloudUploadIcon />}
              title="Cloud-Based"
              description="Access your case files and information from anywhere, on any device."
            />
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Ready to Transform Your Legal Practice?
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
            Join thousands of legal professionals who trust our platform to manage their cases efficiently.
          </Typography>
          <Button 
            component={Link}
            to="/register"
            variant="contained" 
            color="primary" 
            size="large"
            sx={{ 
              px: 6,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: '8px',
              textTransform: 'none',
              boxShadow: '0 4px 14px rgba(25, 118, 210, 0.4)'
            }}
          >
            Start Your Free Trial
          </Button>
          <Typography variant="caption" display="block" sx={{ mt: 2, color: 'text.secondary' }}>
            No credit card required. Cancel anytime.
          </Typography>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', py: 4, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                LawEase
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Modern Legal Case Management System designed to streamline your legal practice and improve efficiency.
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                Product
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div" sx={{ '& a': { display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } } }}>
                <Link to="/features">Features</Link>
                <Link to="/pricing">Pricing</Link>
                <Link to="/security">Security</Link>
                <Link to="/integrations">Integrations</Link>
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                Company
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div" sx={{ '& a': { display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } } }}>
                <Link to="/about">About Us</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/careers">Careers</Link>
                <Link to="/contact">Contact</Link>
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                Resources
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div" sx={{ '& a': { display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } } }}>
                <Link to="/help">Help Center</Link>
                <Link to="/documentation">Documentation</Link>
                <Link to="/webinars">Webinars</Link>
                <Link to="/status">Status</Link>
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                Legal
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div" sx={{ '& a': { display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } } }}>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/security">Security Policy</Link>
                <Link to="/gdpr">GDPR</Link>
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              © {new Date().getFullYear()} LawEase. All rights reserved.
            </Typography>
            <Box sx={{ mt: isMobile ? 2 : 0, '& > *:not(:last-child)': { mr: 2 } }}>
              <Typography variant="body2" color="textSecondary" component="span">
                <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Privacy Policy</Link>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="span">
                <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Terms of Service</Link>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="span">
                <Link to="/cookies" style={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Cookie Policy</Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
