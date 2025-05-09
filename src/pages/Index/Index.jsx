import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductList from '../../components/product/ProductList';

/**
 * Main page component
 * @returns {JSX.Element} - Main page component
 */
const Index = () => {
  // Get products list from Redux store
  const products = useSelector(state => state.products.items);
  
  // Take first 6 products to display on the main page
  const featuredProducts = products.slice(0, 6);

  // Styled components for banner
  const PromoSection = styled('section')({
    display: 'flex',
    backgroundColor: '#F1E4E6',
    margin: '0 auto',
    maxWidth: '1600px',
    height: '764px',
    overflow: 'hidden',
    paddingLeft: 'calc(50% - 800px)',
    paddingRight: 'calc(50% - 800px)',
    position: 'relative',
  });
  
  const PromoImage = styled('div')({
    width: '50%', // Настройка ширины блока с изображением для соответствия оригиналу
    '& img': {
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center', // Центрирование изображения
    }
  });
  
  const PromoContent = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    right: '25%', // Уточнение позиции текстового блока для соответствия оригиналу
    top: '50%',
    transform: 'translateY(-50%)',
  });
  
  const PromoInfo = styled('div')({
    borderLeft: '12px solid #F16D7F',
    paddingLeft: '16px',
    display: 'flex',
    flexDirection: 'column',
  });
  
  const PromoTitle = styled(Typography)({
    fontStyle: 'normal',
    fontWeight: 900,
    fontSize: '48px',
    lineHeight: '58px',
    color: '#222222',
    textTransform: 'uppercase',
    marginBottom: '5px',
  });
  
  const PromoHeading = styled(Typography)({
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '32px',
    lineHeight: '38px',
    color: '#222222',
    textTransform: 'uppercase',
  });

  // Стилизованный компонент для категорий
  const SaleSection = styled('section')({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '30px',
    maxWidth: '1140px',
    margin: '65px auto 0', // Добавление отступа сверху через margin вместо padding
    paddingBottom: '96px',
  });
  
  const SaleItem = styled(Link)({
    position: 'relative',
    cursor: 'pointer',
    display: 'block',
    width: 'calc(33.333% - 20px)', // Размер блока - треть ширины с учетом отступов
    height: '260px',
    overflow: 'hidden',
    textDecoration: 'none',
    transition: '0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
      zIndex: 2,
    }
  });
  
  const SaleBigItem = styled(SaleItem)({
    minHeight: '180px',
    height: '180px', // Высота блока для соответствия оригиналу
    width: '100%', // Полная ширина для блока с аксессуарами
    marginTop: '30px', // Добавление отступа сверху для соответствия оригиналу
    '& img': {
      objectFit: 'contain', // Изменение с cover на contain, чтобы видеть всю картинку
      background: '#F7F7F7', // Добавление фона для лучшего отображения
    },
    '&:hover': {
      transform: 'scale(1.05)', // Согласованный эффект наведения с другими элементами
      zIndex: 2,
    }
  });
  
  const SaleImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Для обычных категорий оставляем cover
    display: 'block',
  });
  
  const SaleContent = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  });
  
  const SaleText = styled(Typography)({
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19px',
    textAlign: 'center',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    marginBottom: '5px',
  });
  
  const SaleHeading = styled(Typography)({
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '29px',
    textAlign: 'center',
    color: '#F16D7F',
    textTransform: 'uppercase',
  });
  
  const SaleOverlay = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(33, 22, 22, 0.16)',
  });

  // Categories
  const categories = [
    { id: 1, name: 'Women\'s clothing', label: 'FOR WOMEN', discount: '30% OFF', image: '/img/advertisement001.jpg' },
    { id: 2, name: 'Men\'s clothing', label: 'FOR MEN', discount: 'HOT DEAL', image: '/img/advertisement002.jpg' },
    { id: 3, name: 'Kids clothing', label: 'FOR KIDS', discount: 'NEW ARRIVALS', image: '/img/advertisement003.jpg' },
    { id: 4, name: 'Accessories', label: 'ACCESORIES', discount: 'LUXIROUS & TRENDY', image: '/img/advertisement004.jpg' },
  ];

  return (
    <Box>
      {/* Main banner */}
      <PromoSection>
        <PromoImage>
          <Box
            component="img"
            src="/img/header__img.svg"
            alt="model photo"
            sx={{ width: '100%' }}
          />
        </PromoImage>
        
        <PromoContent>
          <PromoInfo>
            <PromoTitle component="h1">
              THE BRAND
            </PromoTitle>
            <PromoHeading component="h2">
              OF LUXERIOUS <Box component="span" sx={{ color: '#F16D7F', display: 'inline', fontWeight: 700 }}>FASHION</Box>
            </PromoHeading>
          </PromoInfo>
        </PromoContent>
      </PromoSection>

      {/* Categories */}
      <SaleSection>
        {categories.slice(0, 3).map(category => (
          <SaleItem key={category.id} to="/catalog">
            <SaleOverlay />
            <SaleImage src={category.image} alt={category.name} />
            <SaleContent>
              <SaleText>{category.discount}</SaleText>
              <SaleHeading>{category.label}</SaleHeading>
            </SaleContent>
          </SaleItem>
        ))}
        
        {/* Большой баннер для аксессуаров */}
        <SaleBigItem to="/catalog">
          <SaleOverlay />
          <SaleImage src={categories[3].image} alt={categories[3].name} />
          <SaleContent>
            <SaleText>{categories[3].discount}</SaleText>
            <SaleHeading>{categories[3].label}</SaleHeading>
          </SaleContent>
        </SaleBigItem>
      </SaleSection>

      {/* Популярные товары */}
      <Box sx={{ 
        paddingBottom: '60px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        maxWidth: '1140px', 
        margin: '0 auto'
      }}>
        <Typography variant="h4" component="h2" align="center" sx={{ 
          fontWeight: 400, 
          mb: 1,
          fontSize: '30px',
          lineHeight: '36px',
          color: '#222222'
        }}>
          Fetured Items
        </Typography>
        <Typography variant="body1" align="center" sx={{ 
          color: '#9F9F9F', 
          mb: 4,
          mt: 1,
          fontSize: '14px',
          lineHeight: '17px'
        }}>
          Shop for items based on what we featured in this week
        </Typography>
        
        <ProductList products={featuredProducts} />
        
        <Box sx={{ textAlign: 'center', mt: 4, mb: 6 }}>
          <Button 
            variant="outlined" 
            color="primary" 
            component={Link} 
            to="/catalog"
            sx={{ 
              color: '#F16D7F',
              borderColor: '#F16D7F',
              backgroundColor: 'transparent',
              padding: '14px 38px',
              fontSize: '16px',
              fontWeight: 400,
              textTransform: 'none',
              '&:hover': { 
                backgroundColor: '#F16D7F', 
                color: 'white' 
              }, 
              borderRadius: 0, 
              padding: '15px 39px',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '19px',
              textTransform: 'none'
            }}
          >
            Browse All Product
          </Button>
        </Box>
      </Box>

      {/* Раздел преимуществ */}
      <Box
        component='section'
        sx={{
          padding: '70px 0',
          backgroundColor: '#222224',
          color: '#FBFBFB'
        }}
      >
        <Container
          sx={{
            maxWidth: '1140px',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '30px'
          }}
        >
          <Box
            component='article'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '360px'
            }}
          >
            <Box
              component="img"
              src="/img/advantages1.svg"
              alt="Free Delivery"
              sx={{
                width: '45px',
                height: '32px',
                mb: 2
              }}
            />
            <Typography
              variant="h3"
              sx={{
                mb: 1.5,
                fontFamily: '"Lato"',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '24px',
                color: '#FBFBFB'
              }}
            >
              Free Delivery
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Lato"',
                fontWeight: 300,
                fontSize: '14px',
                lineHeight: '17px',
                textAlign: 'center',
                color: '#FBFBFB'
              }}
            >
              Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.
            </Typography>
          </Box>
          
          <Box
            component='article'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '360px'
            }}
          >
            <Box
              component="img"
              src="/img/advantages2.svg"
              alt="Sales & discounts"
              sx={{
                width: '40px',
                height: '40px',
                mb: 2
              }}
            />
            <Typography
              variant="h3"
              sx={{
                mb: 1.5,
                fontFamily: '"Lato"',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '24px',
                color: '#FBFBFB'
              }}
            >
              Sales & discounts
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Lato"',
                fontWeight: 300,
                fontSize: '14px',
                lineHeight: '17px',
                textAlign: 'center',
                color: '#FBFBFB'
              }}
            >
              Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.
            </Typography>
          </Box>
          
          <Box
            component='article'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '360px'
            }}
          >
            <Box
              component="img"
              src="/img/advantages3.svg"
              alt="Quality assurance"
              sx={{
                width: '47px',
                height: '35px',
                mb: 2
              }}
            />
            <Typography
              variant="h3"
              sx={{
                mb: 1.5,
                fontFamily: '"Lato"',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '24px',
                color: '#FBFBFB'
              }}
            >
              Quality assurance
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Lato"',
                fontWeight: 300,
                fontSize: '14px',
                lineHeight: '17px',
                textAlign: 'center',
                color: '#FBFBFB'
              }}
            >
              Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Index;
