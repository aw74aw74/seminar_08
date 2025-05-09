import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Container, Box, Drawer, List, ListItem, ListItemText, ListItemButton, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Search, Menu as MenuIcon, Person, ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

/**
 * Компонент Header - шапка сайта с навигацией
 * @returns {JSX.Element} - Компонент шапки сайта
 */
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState({
    man: true,
    woman: true,
    kids: true
  });
  
  // Получаем количество товаров в корзине из Redux store
  const cartItems = useSelector(state => state.cart.items);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Обработчик открытия/закрытия мобильного меню
  const handleMobileMenuToggle = () => {
    // При открытии меню раскрываем все разделы
    if (!mobileMenuOpen) {
      setMenuExpanded({
        man: true,
        woman: true,
        kids: true
      });
    }
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Обработчик раскрытия/скрытия подменю
  const handleMenuExpand = (section) => {
    // Просто переключаем состояние выбранного раздела
    setMenuExpanded({
      ...menuExpanded,
      [section]: !menuExpanded[section]
    });
  };

  // Стилизованные компоненты для шапки
  const HeaderContainer = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '18px 0',
    maxWidth: '1140px',
    margin: '0 auto',
    width: '100%',
  });
  
  const HeaderLeft = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '41px',
  });
  
  const HeaderRight = styled('nav')({
    display: 'flex',
    alignItems: 'center',
    gap: '33px',
  });
  
  const Logo = styled('div')({
    display: 'flex',
    alignItems: 'center',
    '& a': {
      textDecoration: 'none',
      color: 'inherit',
      display: 'flex',
      alignItems: 'center',
    },
    '& img': {
      height: '32px',
    }
  });



  return (
    <AppBar position="static" sx={{ bgcolor: '#000000', color: '#FFFFFF' }} elevation={0}>
      <Container maxWidth='xl' sx={{ maxWidth: '1600px !important' }}>
        <HeaderContainer>
          {/* Левая часть шапки */}
          <HeaderLeft>
            <Logo>
              <Link to="/">
                <Box
                  component="img"
                  src="/img/top__menu__logo.svg"
                  alt="Logo"
                />
              </Link>
            </Logo>
            <Box
              component="a"
              href="#"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Box
                component="img"
                src="/img/top__menu__search.svg"
                alt="Search"
                sx={{ height: '23px', width: '23px' }}
              />
            </Box>
          </HeaderLeft>

          {/* Правая часть шапки */}
          <HeaderRight>
            <Box
              component="label"
              htmlFor="header__check"
              onClick={handleMobileMenuToggle}
              sx={{ cursor: 'pointer' }}
            >
              <Box
                component="img"
                src="/img/top__menu__menu.svg"
                alt="Menu"
                sx={{ height: '23px', width: '23px' }}
              />
            </Box>
            <Box
              component={Link}
              to="/profile"
              className="header__link-site"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Box
                component="img"
                src="/img/top__menu__profile.svg"
                alt="Profile"
                sx={{ height: '23px', width: '23px' }}
              />
            </Box>
            <Box
              component={Link}
              to="/cart"
              className="header__link-site"
              sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}
            >
              <Badge
                badgeContent={cartItemsCount}
                color="primary"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#F16D7F',
                    color: '#FFFFFF',
                    fontSize: '10px',
                    minWidth: '18px',
                    height: '18px',
                    padding: '0 5px',
                    right: -5,
                    top: 0
                  }
                }}
              >
                <Box
                  component="img"
                  src="/img/top__menu__basket.svg"
                  alt="Cart"
                  sx={{ height: '23px', width: '23px' }}
                />
              </Badge>
            </Box>
          </HeaderRight>
        </HeaderContainer>
      </Container>

      {/* Мобильное меню */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: '232px',
            padding: '32px',
            backgroundColor: '#FFFFFF',
            position: 'fixed',
            right: '5%',
            top: '75px',
            height: 'auto',
            maxHeight: '80vh',
            zIndex: 1000,
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              marginBottom: '24px', 
              color: '#000000', 
              fontWeight: 700, 
              fontSize: '14px',
              lineHeight: '17px',
              textTransform: 'uppercase'
            }}
          >
            MENU
          </Typography>
          
          <Box className="mobile-menu__box" sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Раздел MAN */}
            <Box className="mobile-menu__item">
              <Typography 
                component="a" 
                href="#" 
                className="mobile-menu__title"
                onClick={() => handleMenuExpand('man')}
                sx={{ 
                  display: 'block',
                  color: '#F16D7F',
                  fontSize: '14px',
                  fontWeight: 700,
                  lineHeight: '17px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                  cursor: 'pointer'
                }}
              >
                MAN
              </Typography>
              <Collapse in={menuExpanded.man} timeout="auto" unmountOnExit>
                <Box 
                  component="ul" 
                  className="mobile-menu__list"
                  sx={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    margin: 0, 
                    marginLeft: '21px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '11px'
                  }}
                >
                  <Box component="li">
                    <Typography 
                      component={Link} 
                      to="/catalog" 
                      className="mobile-menu__link"
                      sx={{ 
                        color: '#000000',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '17px',
                        textDecoration: 'none'
                      }}
                    >
                      Accessories
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography 
                      component={Link} 
                      to="/catalog" 
                      className="mobile-menu__link"
                      sx={{ 
                        color: '#000000',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '17px',
                        textDecoration: 'none'
                      }}
                    >
                      Bags
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography 
                      component={Link} 
                      to="/catalog" 
                      className="mobile-menu__link"
                      sx={{ 
                        color: '#000000',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '17px',
                        textDecoration: 'none'
                      }}
                    >
                      Denim
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography 
                      component={Link} 
                      to="/catalog" 
                      className="mobile-menu__link"
                      sx={{ 
                        color: '#000000',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '17px',
                        textDecoration: 'none'
                      }}
                    >
                      T-Shirts
                    </Typography>
                  </Box>
                </Box>
              </Collapse>
            </Box>

            {/* Раздел WOMAN */}
            <Box className="mobile-menu__item">
              <Typography 
                component="a" 
                href="#" 
                className="mobile-menu__title"
                onClick={() => handleMenuExpand('woman')}
                sx={{ 
                  display: 'block',
                  color: '#F16D7F',
                  fontSize: '14px',
                  fontWeight: 700,
                  lineHeight: '17px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                  cursor: 'pointer'
                }}
              >
                WOMAN
              </Typography>
              <Collapse in={menuExpanded.woman} timeout="auto" unmountOnExit>
                <Box 
                  component="ul" 
                  className="mobile-menu__list"
                  sx={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    margin: 0, 
                    marginLeft: '21px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '11px'
                  }}
                >
                  <Box component="li">
                    <Typography 
                      component={Link} 
                      to="/catalog" 
                      className="mobile-menu__link"
                      sx={{ 
                        color: '#000000',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '17px',
                        textDecoration: 'none'
                      }}
                    >
                      Accessories
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography 
                      component={Link} 
                      to="/catalog" 
                      className="mobile-menu__link"
                      sx={{ 
                        color: '#000000',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '17px',
                        textDecoration: 'none'
                      }}
                    >
                      Jackets & Coats
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography 
                      component={Link} 
                      to="/catalog" 
                      className="mobile-menu__link"
                      sx={{ 
                        color: '#000000',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '17px',
                        textDecoration: 'none'
                      }}
                    >
                      Polos
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography 
                      component={Link} 
                      to="/catalog" 
                      className="mobile-menu__link"
                      sx={{ 
                        color: '#000000',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '17px',
                        textDecoration: 'none'
                      }}
                    >
                      T-Shirts
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography 
                      component={Link} 
                      to="/catalog" 
                      className="mobile-menu__link"
                      sx={{ 
                        color: '#000000',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '17px',
                        textDecoration: 'none'
                      }}
                    >
                      Shirts
                    </Typography>
                  </Box>
                </Box>
              </Collapse>
            </Box>

            {/* Раздел KIDS */}
            <Box className="mobile-menu__item">
              <Typography 
                component="a" 
                href="#" 
                className="mobile-menu__title"
                onClick={() => handleMenuExpand('kids')}
                sx={{ 
                  display: 'block',
                  color: '#F16D7F',
                  fontSize: '14px',
                  fontWeight: 700,
                  lineHeight: '17px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                  cursor: 'pointer'
                }}
              >
                KIDS
              </Typography>
              <Collapse in={menuExpanded.kids} timeout="auto" unmountOnExit>
                <Box 
                  component="ul" 
                  className="mobile-menu__list"
                  sx={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    margin: 0, 
                    marginLeft: '21px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '11px'
                  }}
                >
                  <Box component="li">
                    <Typography 
                      component={Link} 
                      to="/catalog" 
                      className="mobile-menu__link"
                      sx={{ 
                        color: '#000000',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '17px',
                        textDecoration: 'none'
                      }}
                    >
                      Accessories
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography 
                      component={Link} 
                      to="/catalog" 
                      className="mobile-menu__link"
                      sx={{ 
                        color: '#000000',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '17px',
                        textDecoration: 'none'
                      }}
                    >
                      Jackets & Coats
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography 
                      component={Link} 
                      to="/catalog" 
                      className="mobile-menu__link"
                      sx={{ 
                        color: '#000000',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '17px',
                        textDecoration: 'none'
                      }}
                    >
                      Polos
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography 
                      component={Link} 
                      to="/catalog" 
                      className="mobile-menu__link"
                      sx={{ 
                        color: '#000000',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '17px',
                        textDecoration: 'none'
                      }}
                    >
                      T-Shirts
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography 
                      component={Link} 
                      to="/catalog" 
                      className="mobile-menu__link"
                      sx={{ 
                        color: '#000000',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '17px',
                        textDecoration: 'none'
                      }}
                    >
                      Shirts
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography 
                      component={Link} 
                      to="/catalog" 
                      className="mobile-menu__link"
                      sx={{ 
                        color: '#000000',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '17px',
                        textDecoration: 'none'
                      }}
                    >
                      Bags
                    </Typography>
                  </Box>
                </Box>
              </Collapse>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
