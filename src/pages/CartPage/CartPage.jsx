import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, Typography, Button, Divider, Paper, Grid, IconButton, TextField, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { Delete, ArrowBack, Close } from '@mui/icons-material';
import CartItem from '../../components/product/CartItem';
import { selectCartTotal } from '../../store/slices/cartSlice';

/**
 * Компонент страницы корзины с товарами
 * @returns {JSX.Element} - Компонент страницы корзины
 */
const CartPage = () => {
  const dispatch = useDispatch();
  
  // Получаем товары в корзине из Redux store
  const cartItems = useSelector(state => state.cart.items);
  
  // Получаем общую стоимость товаров в корзине
  const cartTotal = useSelector(selectCartTotal);
  
  // Обработчик очистки корзины
  const handleClearCart = () => {
    dispatch({
      type: 'cart/clearCart'
    });
  };

  // Стилизованные компоненты для страницы корзины
  const PageHeader = styled(Box)({
    backgroundColor: '#F8F3F4',
    padding: '60px 0',
    marginBottom: '96px',
  });

  const ProductSelection = styled(Box)({
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: '30px',
    marginBottom: '96px',
  });

  const ProductCard = styled(Box)({
    flex: '2',
  });

  const ProductInfo = styled(Box)({
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  });

  const AddressBox = styled(Box)({
    border: '1px solid #A4A4A4',
    padding: '20px',
  });

  const AddressTitle = styled(Typography)({
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '19px',
    color: '#222222',
    marginBottom: '20px',
  });

  const AddressInput = styled(TextField)({
    marginBottom: '20px',
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
    },
  });

  const AddressButton = styled(Button)({
    backgroundColor: 'transparent',
    border: '1px solid #A4A4A4',
    borderRadius: 0,
    color: '#000000',
    padding: '10px 15px',
    fontSize: '11px',
    fontWeight: 400,
    '&:hover': {
      backgroundColor: '#F16D7F',
      color: '#FFFFFF',
      border: '1px solid #F16D7F',
    },
  });

  const PurchaseBox = styled(Box)({
    backgroundColor: '#F5F3F3',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  });

  const PurchasePrice = styled(Typography)({
    fontSize: '11px',
    fontWeight: 400,
    lineHeight: '13px',
    color: '#4A4A4A',
    marginBottom: '10px',
  });

  const PurchaseTotalPrice = styled(Typography)({
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '19px',
    color: '#222222',
    marginBottom: '20px',
  });

  const PurchaseLine = styled(Box)({
    width: '275px',
    height: '1px',
    backgroundColor: '#E2E2E2',
    marginBottom: '20px',
  });

  const PurchaseButton = styled(Button)({
    backgroundColor: '#F16D7F',
    color: '#FFFFFF',
    borderRadius: 0,
    padding: '15px 40px',
    fontSize: '16px',
    fontWeight: 400,
    '&:hover': {
      backgroundColor: '#E05C6E',
    },
  });

  const ActionButton = styled(Button)({
    backgroundColor: 'transparent',
    border: '1px solid #A4A4A4',
    borderRadius: 0,
    color: '#000000',
    padding: '15px 20px',
    fontSize: '14px',
    fontWeight: 400,
    '&:hover': {
      backgroundColor: '#F16D7F',
      color: '#FFFFFF',
      border: '1px solid #F16D7F',
    },
  });
  
  return (
    <Box>
      {/* Заголовок страницы */}
      <PageHeader>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" align="center" sx={{ fontWeight: 400, fontSize: '24px' }}>
            SHOPPING CART
          </Typography>
        </Container>
      </PageHeader>
      
      <Container maxWidth="lg">
        {cartItems.length === 0 ? (
          // Если корзина пуста
          <Paper sx={{ p: 4, textAlign: 'center', mb: 10 }}>
            <Typography variant="h6" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Add items to your cart to proceed with checkout
            </Typography>
            <Button
              component={Link}
              to="/catalog"
              variant="contained"
              sx={{ mt: 2, backgroundColor: '#F16D7F', '&:hover': { backgroundColor: '#E05C6E' } }}
            >
              CONTINUE SHOPPING
            </Button>
          </Paper>
        ) : (
          // Если в корзине есть товары
          <ProductSelection>
            {/* Список товаров в корзине */}
            <ProductCard>
              {/* Отображаем каждый товар в корзине */}
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  size={item.size}
                  color={item.color}
                  quantity={item.quantity}
                />
              ))}
              
              {/* Кнопки действий */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, flexWrap: 'wrap', gap: 2 }}>
                <ActionButton onClick={handleClearCart}>
                  CLEAR SHOPPING CART
                </ActionButton>
                <ActionButton component={Link} to="/catalog">
                  CONTINUE SHOPPING
                </ActionButton>
              </Box>
            </ProductCard>
            
            {/* Информация о заказе */}
            <ProductInfo>
              {/* Адрес доставки */}
              <AddressBox>
                <AddressTitle>SHIPPING ADDRESS</AddressTitle>
                <AddressInput placeholder="City" variant="outlined" />
                <AddressInput placeholder="State" variant="outlined" />
                <AddressInput placeholder="Postcode / Zip" type="number" variant="outlined" />
                <AddressButton>
                  GET A QUOTE
                </AddressButton>
              </AddressBox>
              
              {/* Итоговая сумма */}
              <PurchaseBox>
                <PurchasePrice>SUB TOTAL ${cartTotal.toFixed(2)}</PurchasePrice>
                <PurchaseTotalPrice>GRAND TOTAL ${cartTotal.toFixed(2)}</PurchaseTotalPrice>
                <PurchaseLine />
                <PurchaseButton>
                  PROCEED TO CHECKOUT
                </PurchaseButton>
              </PurchaseBox>
            </ProductInfo>
          </ProductSelection>
        )}
      </Container>
    </Box>
  );
};

export default CartPage;
