import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, Typography, Button, Breadcrumbs, styled } from '@mui/material';
import { ShoppingCart, KeyboardArrowDown } from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Стилизованные компоненты для страницы продукта
// Верхняя часть страницы (хлебные крошки)
const TopHead = styled(Box)(({ theme }) => ({
  padding: '24px 0',
  backgroundColor: '#F8F3F4',
}));

const TopHeadBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1140px',
  margin: '0 auto',
  padding: '0 16px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '10px',
  }
}));

const BreadcrumbsStyled = styled(Breadcrumbs)(({ theme }) => ({
  '& .MuiBreadcrumbs-separator': {
    margin: '0 10px',
  },
  '& a': {
    color: '#636363',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 300,
    '&:hover': {
      color: '#F16D7F',
    }
  }
}));

// Основная часть страницы продукта
const MainProduct = styled(Box)(({ theme }) => ({
  backgroundColor: '#F7F7F7',
  position: 'relative',
}));

const ProductImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '11px',
  paddingBottom: '42px',
  boxSizing: 'border-box',
  border: '1px solid rgb(234, 234, 234)',
}));

const ProductImageButton = styled(Button)(({ theme }) => ({
  width: '47px',
  height: '47px',
  border: 'none',
  backgroundColor: '#c0c0bb',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  minWidth: 'unset',
  borderRadius: 0,
  '&:hover': {
    backgroundColor: '#d4d4d0',
    '& svg': {
      color: '#F16D7F',
    }
  }
}));

const ProductImageWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: '20px',
  '& img': {
    maxWidth: '100%',
    maxHeight: '600px',
    objectFit: 'contain',
    transform: 'scale(1)',
    transformOrigin: 'center center'
  }
}));

const ProductInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  background: '#FFF',
}));

const ProductInfo = styled(Box)(({ theme }) => ({
  marginTop: '-65px',
  marginBottom: '129px',
  padding: '65px 250px',
  backgroundColor: '#FFFFFF',
  border: '1px solid rgb(234, 234, 234)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '40px 20px',
  }
}));

const ProductCollection = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 300,
  lineHeight: '17px',
  color: '#F16D7F',
}));

const ProductDivider = styled(Box)(({ theme }) => ({
  width: '63px',
  border: '2px solid #F16D7F',
  margin: '12.1px 0',
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 300,
  lineHeight: '22px',
  color: '#4D4D4D',
}));

const ProductDescription = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '14px',
  fontWeight: 300,
  lineHeight: '17px',
  color: '#5E5E5E',
  margin: '48.41px 0 32.27px',
}));

const ProductPrice = styled(Typography)(({ theme }) => ({
  fontFamily: 'Lato',
  fontSize: '24px',
  fontWeight: 300,
  lineHeight: '29px',
  color: '#F16D7F',
  marginBottom: '65.04px',
}));

const ProductFeatures = styled(Box)(({ theme }) => ({
  margin: '0px 0 48.91px',
  paddingTop: '65.05px',
  display: 'flex',
  justifyContent: 'center',
  gap: '42px',
  width: '100%',
  maxWidth: '641px',
  borderTop: '1px solid rgb(234, 234, 234)',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
  }
}));

const FeatureButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Lato',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '17px',
  color: '#6F6E6E',
  backgroundColor: 'white',
  border: 'none',
  cursor: 'pointer',
  textTransform: 'none',
  padding: '0',
  '&:hover': {
    backgroundColor: 'white',
  }
}));

const AddToCartButton = styled(Button)(({ theme }) => ({
  padding: '14.62px 57px 8.57px 24px',
  display: 'flex',
  alignItems: 'center',
  gap: '22.59px',
  border: '1px solid #F16D7F',
  backgroundColor: 'white',
  cursor: 'pointer',
  color: '#F16D7F',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '19.2px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#F16D7F',
    color: 'white',
    '& svg path': {
      fill: 'white',
    }
  }
}));

// Секция с похожими товарами
const ProductBottom = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFF',
}));

const ProductBottomItems = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'nowrap',
  gap: '30px',
  maxWidth: '1140px',
  margin: '0 auto',
  padding: '0 16px',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
  }
}));

const RelatedProductCard = styled(Box)(({ theme }) => ({
  maxWidth: '360px',
  width: '100%',
  backgroundColor: '#F8F8F8',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  }
}));

const RelatedProductImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  '&:hover .product-overlay': {
    opacity: 1,
  }
}));

const RelatedProductImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '420px',
  objectFit: 'cover',
}));

const RelatedProductOverlay = styled(Box)(({ theme }) => ({
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
}));

const RelatedProductInfo = styled(Box)(({ theme }) => ({
  padding: '25px 29px 20px 17px',
  backgroundColor: 'white',
}));

const RelatedProductTitle = styled(Typography)(({ theme }) => ({
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '16px',
  color: '#000000',
  marginBottom: '13px',
}));

const RelatedProductDescription = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 300,
  lineHeight: '17px',
  color: '#5D5D5D',
  marginBottom: '18px',
}));

const RelatedProductPrice = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '19px',
  color: '#F16D7F',
}));

/**
 * Компонент страницы отдельного товара
 * @returns {JSX.Element} - Компонент страницы товара
 */
const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Получаем список товаров из Redux store
  const products = useSelector(state => state.products.items);
  
  // Находим товар по id из URL
  const product = products.find(p => p.id === parseInt(id));
  
  // Получаем индекс текущего товара в массиве всех товаров
  const currentIndex = products.findIndex(p => p.id === parseInt(id));
  
  // Эффект для прокрутки страницы в начало при загрузке
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]); // Зависимость от id, чтобы прокрутка происходила при изменении товара
  
  // Функция перехода к предыдущему товару
  const goToPrevProduct = () => {
    // Если текущий товар первый, переходим к последнему (циклически)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : products.length - 1;
    window.location.href = `/product/${products[prevIndex].id}`;
  };
  
  // Функция перехода к следующему товару
  const goToNextProduct = () => {
    // Если текущий товар последний, переходим к первому (циклически)
    const nextIndex = currentIndex < products.length - 1 ? currentIndex + 1 : 0;
    window.location.href = `/product/${products[nextIndex].id}`;
  };
  
  // Если товар не найден, показываем сообщение
  if (!product) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h5" align="center">
          Товар не найден
        </Typography>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button component={Link} to="/catalog" variant="contained" color="primary">
            Вернуться в каталог
          </Button>
        </Box>
      </Container>
    );
  }
  
  // Обработчик добавления товара в корзину
  const handleAddToCart = () => {
    dispatch({
      type: 'cart/addItem',
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size: product.size,
        color: product.color,
        quantity: 1
      }
    });
  };
  
  let relatedProducts = [];
  
  // Логика выбора карточек для отображения внизу страницы
  if (products.length >= 2) {
    // Если выбрана первая карточка, показываем последнюю и вторую
    if (currentIndex === 0) {
      relatedProducts.push(products[products.length - 1]); // Последняя карточка
      if (products.length > 1) {
        relatedProducts.push(products[1]); // Вторая карточка
      }
    } 
    // Если выбрана последняя карточка, показываем предпоследнюю и первую
    else if (currentIndex === products.length - 1) {
      if (products.length > 1) {
        relatedProducts.push(products[products.length - 2]); // Предпоследняя карточка
      }
      relatedProducts.push(products[0]); // Первая карточка
    } 
    // В остальных случаях показываем предыдущую и следующую карточки
    else {
      relatedProducts.push(products[currentIndex - 1]); // Предыдущая карточка
      relatedProducts.push(products[currentIndex + 1]); // Следующая карточка
    }
  }
  
  // Если всего один товар в каталоге, не показываем ничего
  if (products.length <= 1) {
    relatedProducts = [];
  }
  
  return (
    <Box>
      {/* Хлебные крошки */}
      <TopHead>
        <TopHeadBox>
          <Typography variant="h4" component="h1" sx={{ 
            fontSize: '24px', 
            fontWeight: 400, 
            lineHeight: '29px',
            color: '#F16D7F'
          }}>
            NEW ARRIVALS
          </Typography>
          <BreadcrumbsStyled aria-label="breadcrumb">
            <Link to="/" style={{ textDecoration: 'none' }}>
              HOME
            </Link>
            <Link to="/catalog" style={{ textDecoration: 'none' }}>
              MEN
            </Link>
            <Typography color="#F16D7F">NEW ARRIVALS</Typography>
          </BreadcrumbsStyled>
        </TopHeadBox>
      </TopHead>
      
      {/* Основная часть страницы продукта */}
      <MainProduct>
        {/* Слайдер с изображением товара */}
        <ProductImageContainer>
          <ProductImageButton onClick={goToPrevProduct}>
            <ArrowBackIosNewIcon sx={{ fontSize: 22, color: 'black', fontWeight: 'bold' }} />
          </ProductImageButton>
          
          <ProductImageWrapper>
            <img src={product.image} alt={product.title} />
          </ProductImageWrapper>
          
          <ProductImageButton onClick={goToNextProduct}>
            <ArrowForwardIosIcon sx={{ fontSize: 22, color: 'black', fontWeight: 'bold' }} />
          </ProductImageButton>
        </ProductImageContainer>
        
        {/* Информация о товаре */}
        <ProductInfoContainer>
          <ProductInfo>
            <ProductCollection component="h4">
              MEN COLLECTION
            </ProductCollection>
            <ProductDivider />
            <ProductTitle component="h2">
              {product.title.toUpperCase()}
            </ProductTitle>
            <ProductDescription>
              {product.description}
            </ProductDescription>
            <ProductPrice>
              ${product.price.toFixed(2)}
            </ProductPrice>
            
            <ProductFeatures>
              <FeatureButton endIcon={<KeyboardArrowDown />}>
                CHOOSE COLOR
              </FeatureButton>
              <FeatureButton endIcon={<KeyboardArrowDown />}>
                CHOOSE SIZE
              </FeatureButton>
              <FeatureButton endIcon={<KeyboardArrowDown />}>
                QUANTITY
              </FeatureButton>
            </ProductFeatures>
            
            <AddToCartButton onClick={handleAddToCart} startIcon={<ShoppingCart />}>
              Add to Cart
            </AddToCartButton>
          </ProductInfo>
        </ProductInfoContainer>
      </MainProduct>
      
      {/* Похожие товары */}
      {relatedProducts.length > 0 && (
        <ProductBottom>
          <ProductBottomItems>
            {relatedProducts.map(item => (
              <RelatedProductCard key={item.id}>
                <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <RelatedProductImageContainer>
                    <RelatedProductImage src={item.image} alt={item.title} />
                    <RelatedProductOverlay className="product-overlay">
                      <Button
                        variant="outlined"
                        startIcon={<ShoppingCart />}
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch({
                            type: 'cart/addItem',
                            payload: {
                              id: item.id,
                              title: item.title,
                              price: item.price,
                              image: item.image,
                              size: item.size,
                              quantity: 1
                            }
                          });
                        }}
                        sx={{
                          color: 'white',
                          borderColor: 'white',
                          '&:hover': {
                            backgroundColor: '#F16D7F',
                            borderColor: '#F16D7F',
                          }
                        }}
                      >
                        Add to Cart
                      </Button>
                    </RelatedProductOverlay>
                  </RelatedProductImageContainer>
                </Link>
                
                <RelatedProductInfo>
                  <RelatedProductTitle component="h5">
                    {item.title}
                  </RelatedProductTitle>
                  <RelatedProductDescription>
                    {item.description}
                  </RelatedProductDescription>
                  <RelatedProductPrice>
                    ${item.price.toFixed(2)}
                  </RelatedProductPrice>
                </RelatedProductInfo>
              </RelatedProductCard>
            ))}
          </ProductBottomItems>
        </ProductBottom>
      )}
    </Box>
  );
};

export default ProductPage;
