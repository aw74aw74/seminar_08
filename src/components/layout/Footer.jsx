import React from 'react';
import { Box, Container, Typography, Button, IconButton, InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Pinterest, Twitter } from '@mui/icons-material';
import { Link } from 'react-router-dom';

/**
 * Footer component - website footer with copyright information and social icons
 * @returns {JSX.Element} - Footer component
 */
const Footer = () => {
  // Стилизованный компонент для блока с подпиской
  const SubscriptionBlock = styled(Box)(({ theme }) => ({
    background: '#F4F4F4',
    padding: theme.spacing(8, 0),
    position: 'relative',
  }));

  // Стилизованный компонент для формы подписки
  const SubscribeForm = styled('form')(({ theme }) => ({
    display: 'flex',
    maxWidth: '360px',
    margin: '0 auto',
    height: '49px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      height: 'auto',
      '& > *': {
        marginBottom: theme.spacing(1),
      },
    },
  }));

  // Стилизованный компонент для поля ввода email
  const EmailInput = styled(InputBase)(({ theme }) => ({
    backgroundColor: '#E1E1E1',
    borderRadius: '25px 0 0 25px',
    padding: '15px 22px',
    flex: 1,
    fontSize: '14px',
    '&::placeholder': {
      color: '#222224',
      opacity: 0.67,
    },
    [theme.breakpoints.down('sm')]: {
      borderRadius: '25px',
    },
  }));

  // Стилизованный компонент для кнопки подписки
  const SubscribeButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#F16D7F',
    color: 'white',
    borderRadius: '0 25px 25px 0',
    padding: '15px 20px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#d63e5c',
    },
    [theme.breakpoints.down('sm')]: {
      borderRadius: '25px',
    },
  }));

  // Стилизованный компонент для нижнего футера
  const FooterBottom = styled(Box)(({ theme }) => ({
    backgroundColor: '#222224',
    padding: theme.spacing(2, 0),
    color: 'white',
  }));

  // Стилизованный компонент для иконок социальных сетей
  const SocialIcon = styled(IconButton)(({ theme }) => ({
    color: '#000000',
    backgroundColor: '#FFFFFF',
    margin: '0 5px',
    padding: '0',
    width: '32px',
    height: '32px',
    minWidth: '32px',
    minHeight: '32px',
    borderRadius: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: '#F16D7F',
      '& svg': {
        color: '#FFFFFF',
      }
    },
  }));

  return (
    <>
      {/* Блок подписки */}
      <SubscriptionBlock>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
            <Box sx={{ order: { xs: 2, md: 1 }, width: { xs: '100%', md: '50%' }, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <Box
                component="img"
                src="/img/face.svg"
                alt="Отзыв"
                sx={{ width: 96, height: 96, borderRadius: '50%', mb: 2 }}
              />
              <Typography variant="body1" sx={{ fontStyle: 'italic', maxWidth: '360px', fontSize: '20px', lineHeight: 1.5 }}>
                "Vestibulum quis porttitor dui! Quisque <i>viverra nunc mi, a pulvinar purus condimentum</i>"
              </Typography>
            </Box>
            <Box sx={{ order: { xs: 1, md: 2 }, width: { xs: '100%', md: '50%' } }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '24px', textTransform: 'uppercase', mb: 1 }}>
                  SUBSCRIBE
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '18px', mb: 3, textTransform: 'uppercase' }}>
                  FOR OUR NEWLETTER AND PROMOTION
                </Typography>
                <SubscribeForm>
                  <EmailInput
                    placeholder="Enter Your Email"
                    fullWidth
                  />
                  <SubscribeButton>
                    Subscribe
                  </SubscribeButton>
                </SubscribeForm>
              </Box>
            </Box>
          </Box>
        </Container>
      </SubscriptionBlock>

      {/* Нижний футер с копирайтом и социальными иконками */}
      <FooterBottom>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
            <Typography variant="body2" sx={{ color: 'white', fontSize: '16px' }}>
              © 2021 Brand All Rights Reserved.
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <SocialIcon color="inherit" aria-label="Pinterest" component={Link} to="#">
                <Pinterest sx={{ fontSize: '18px' }} />
              </SocialIcon>
              <SocialIcon color="inherit" aria-label="Twitter" component={Link} to="#">
                <Twitter sx={{ fontSize: '18px' }} />
              </SocialIcon>
            </Box>
          </Box>
        </Container>
      </FooterBottom>
    </>
  );
};

export default Footer;
