import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, IconButton, styled } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/**
 * Компонент ProductCard - карточка товара для отображения в каталоге
 * @param {Object} props - Свойства компонента
 * @param {number} props.id - Идентификатор товара
 * @param {string} props.title - Название товара
 * @param {string} props.description - Описание товара
 * @param {number} props.price - Цена товара
 * @param {string} props.image - Путь к изображению товара
 * @param {string} props.size - Размер товара (S, M, L, XL)
 * @returns {JSX.Element} - Компонент карточки товара
 */

// Стилизованные компоненты
const ProductContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  backgroundColor: '#F8F8F8',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  }
}));

const ProductImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
}));

const ProductImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '400px',
  objectFit: 'contain',
  backgroundColor: '#F7F7F7',
  padding: '10px',
}));

const ProductOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(58, 56, 56, 0.86)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  '&:hover': {
    opacity: 1,
  }
}));

const AddToCartButton = styled(Button)(({ theme }) => ({
  color: 'white',
  borderColor: 'white',
  padding: '10px 15px',
  fontSize: '14px',
  textTransform: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  '&:hover': {
    backgroundColor: '#F16D7F',
    borderColor: '#F16D7F',
  }
}));

const ProductInfo = styled(Box)(({ theme }) => ({
  padding: '24px 16px',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  marginBottom: '12px',
  fontSize: '13px',
  color: '#000000',
  textTransform: 'uppercase',
}));

const ProductDescription = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  lineHeight: 1.5,
  color: '#5D5D5D',
  marginBottom: '18px',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const ProductPrice = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: '#F16D7F',
  fontSize: '16px',
}));

const ProductCard = ({ id, title, description, price, image, size }) => {
  const dispatch = useDispatch();

  // Функция добавления товара в корзину
  const handleAddToCart = () => {
    dispatch({
      type: 'cart/addItem',
      payload: {
        id,
        title,
        price,
        image,
        size,
        quantity: 1
      }
    });
  };

  return (
    <ProductContainer>
      <Link to={`/product/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ProductImageContainer>
          <ProductImage src={image} alt={title} />
          <ProductOverlay>
            <AddToCartButton
              variant="outlined"
              startIcon={<ShoppingCart />}
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
              }}
            >
              Add to Cart
            </AddToCartButton>
          </ProductOverlay>
        </ProductImageContainer>
      </Link>
      
      <ProductInfo>
        <ProductTitle component="h3">
          {title}
        </ProductTitle>
        <ProductDescription>
          {description}
        </ProductDescription>
        <ProductPrice>
          ${price.toFixed(2)}
        </ProductPrice>
      </ProductInfo>
    </ProductContainer>
  );
};

export default ProductCard;
