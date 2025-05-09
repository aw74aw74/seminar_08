import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

/**
 * Компонент страницы профиля пользователя
 * @returns {JSX.Element} - Компонент страницы профиля
 */
const ProfilePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#F16D7F' }}>
        Profile Page
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body1">
              <strong>Name:</strong> User
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> user@example.com
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> +7 (XXX) XXX-XX-XX
            </Typography>
          </Box>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Order History
          </Typography>
          
          <Typography variant="body1" sx={{ color: '#888' }}>
            You don't have any orders yet
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
