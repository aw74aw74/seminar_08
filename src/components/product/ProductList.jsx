import React from 'react';
import { Grid, Box, Typography, Container, styled } from '@mui/material';
import ProductCard from './ProductCard';

/**
 * Компонент ProductList - список товаров для отображения в каталоге
 * @param {Object} props - Свойства компонента
 * @param {Array} props.products - Массив товаров для отображения
 * @param {string} props.title - Заголовок списка товаров (опционально)
 * @returns {JSX.Element} - Компонент списка товаров
 */

// Стилизованные компоненты
const ProductContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '30px',
  padding: '0',
  marginBottom: '48px',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const ProductList = ({ products, title }) => {
  return (
    <Box sx={{ py: 2 }}>
      {title && (
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          {title}
        </Typography>
      )}
      
      <Container maxWidth="lg" sx={{ maxWidth: '1140px !important', px: { xs: 2, md: 0 } }}>
        <ProductContainer>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
              size={product.size}
            />
          ))}
        </ProductContainer>
      </Container>
      
      {products.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="text.secondary">
            Products not found
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
