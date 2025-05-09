import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@mui/material';

/**
 * Компонент Layout - общий макет страницы, включающий шапку и подвал
 * @param {Object} props - Свойства компонента
 * @param {React.ReactNode} props.children - Дочерние элементы
 * @returns {JSX.Element} - Компонент макета страницы
 */
const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
