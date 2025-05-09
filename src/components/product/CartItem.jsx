import React from 'react';
import { Box, Typography, IconButton, TextField, Grid, Card, CardMedia, styled } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

/**
 * Компонент CartItem - элемент корзины для отображения товара в корзине
 * @param {Object} props - Свойства компонента
 * @param {number} props.id - Идентификатор товара
 * @param {string} props.title - Название товара
 * @param {number} props.price - Цена товара
 * @param {string} props.image - Путь к изображению товара
 * @param {string} props.size - Размер товара
 * @param {string} props.color - Цвет товара
 * @param {number} props.quantity - Количество товара
 * @returns {JSX.Element} - Компонент элемента корзины
 */
const CartItem = ({ id, title, price, image, size, color, quantity }) => {
  const dispatch = useDispatch();

  // Стилизованные компоненты для элемента корзины
  const ProductCard = styled(Box)({
    display: 'flex',
    borderBottom: '1px solid #EAEAEA',
    padding: '20px 0',
    position: 'relative',
    '&:last-child': {
      borderBottom: 'none',
    }
  });

  const ProductImage = styled('img')({
    width: '100%',
    maxWidth: '262px',
    objectFit: 'cover',
    marginRight: '30px',
  });

  const ProductInfo = styled(Box)({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  });

  const ProductHeader = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  });

  const ProductTitle = styled(Typography)({
    fontSize: '24px',
    fontWeight: 400,
    lineHeight: '29px',
    color: '#222222',
    textTransform: 'uppercase',
  });

  const CloseButton = styled(IconButton)({
    padding: '0',
    '& svg': {
      width: '18px',
      height: '18px',
      fill: '#575757',
    }
  });

  const ProductDetail = styled(Typography)({
    fontSize: '22px',
    fontWeight: 400,
    lineHeight: '26px',
    color: '#575757',
    marginBottom: '6px',
  });

  const QuantityInput = styled(TextField)({
    width: '44px',
    marginLeft: '24px',
    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
      height: '30px',
    },
    '& input': {
      padding: '5px',
      textAlign: 'center',
    }
  });

  // Обработчик удаления товара из корзины
  const handleRemoveItem = () => {
    dispatch({
      type: 'cart/removeItem',
      payload: id
    });
  };

  // Обработчик изменения количества товара
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity > 0) {
      dispatch({
        type: 'cart/updateQuantity',
        payload: {
          id,
          quantity: newQuantity
        }
      });
    }
  };

  return (
    <ProductCard>
      <ProductImage src={image} alt={title} />
      <ProductInfo>
        <ProductHeader>
          <ProductTitle>
            {title}
          </ProductTitle>
          <CloseButton onClick={handleRemoveItem}>
            <Close />
          </CloseButton>
        </ProductHeader>
        <ProductDetail>Price: <span style={{ color: '#F16D7F' }}>${price.toFixed(2)}</span></ProductDetail>
        <ProductDetail>Color: {color || 'Red'}</ProductDetail>
        <ProductDetail>Size: {size || 'XL'}</ProductDetail>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ProductDetail>Quantity:</ProductDetail>
          <QuantityInput
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            inputProps={{ min: 1 }}
            variant="outlined"
          />
        </Box>
      </ProductInfo>
    </ProductCard>
  );
};

export default CartItem;
