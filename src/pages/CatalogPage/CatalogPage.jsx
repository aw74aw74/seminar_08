import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Breadcrumbs, styled, Accordion, AccordionSummary, AccordionDetails, FormGroup, FormControlLabel, Checkbox, Divider, SvgIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from '../../components/product/ProductList';
import { selectFilteredProducts } from '../../store/slices/productsSlice';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/**
 * Компонент страницы каталога товаров с фильтрацией
 * @returns {JSX.Element} - Компонент страницы каталога
 */

// Стилизованные компоненты
const TopHeader = styled(Box)(({ theme }) => ({
  backgroundColor: '#F8F3F4',
  padding: '24px 0',
}));

const TopHeaderContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '16px',
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  color: '#F16D7F',
  fontSize: '24px',
  fontWeight: 700,
  lineHeight: '29px',
  textTransform: 'uppercase',
}));

const BreadcrumbsStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  '& a': {
    color: '#636363',
    fontSize: '14px',
    fontWeight: 300,
    textDecoration: 'none',
    '&:hover': {
      color: '#F16D7F',
    },
  },
  '& .active': {
    fontWeight: 700,
    color: '#F16D7F',
  },
  '& .MuiBreadcrumbs-separator': {
    margin: '0 5px',
  },
}));

const FilterSortContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '24px 0 40px',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '16px',
  },
}));

const FilterAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: 'none',
  position: 'relative',
  '&.Mui-expanded': {
    margin: 0,
  },
  '& .MuiAccordionSummary-root': {
    padding: 0,
    minHeight: 'auto',
    '&.Mui-expanded': {
      minHeight: 'auto',
      '& .MuiAccordionSummary-content': {
        '& .filter-heading': {
          color: '#F16D7F',
          '& svg path': {
            fill: '#F16D7F',
          },
        },
      },
    },
  },
  '& .MuiAccordionSummary-content': {
    margin: '0',
    '&.Mui-expanded': {
      margin: '0',
    },
  },
  '& .MuiAccordionDetails-root': {
    position: 'absolute',
    top: '100%',
    left: 0,
    zIndex: 10,
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
}));

const FilterHeading = styled(Typography)(({ theme }) => ({
  color: '#000000',
  fontSize: '14px',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: '11px',
  textTransform: 'uppercase',
  '& svg': {
    marginLeft: '11px',
  },
}));

const FilterItem = styled(Accordion)(({ theme }) => ({
  boxShadow: 'none',
  position: 'relative',
  '&.Mui-expanded': {
    margin: 0,
  },
  '& .MuiAccordionSummary-root': {
    padding: '8px 11px',
    borderLeft: '5px solid #F16D7F',
    borderBottom: '1px solid #ebebeb',
    minHeight: 'auto',
    '&.Mui-expanded': {
      minHeight: 'auto',
      '& .MuiAccordionSummary-content': {
        '& .filter-item-title': {
          color: '#F16D7F',
        },
      },
    },
  },
  '& .MuiAccordionSummary-content': {
    margin: '0',
    '&.Mui-expanded': {
      margin: '0',
    },
  },
  '& .MuiAccordionDetails-root': {
    position: 'absolute',
    top: '100%',
    left: '0',
    zIndex: 10,
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    width: '250px',
  },
}));

const FilterItemTitle = styled(Typography)(({ theme }) => ({
  color: '#6F6E6E',
  fontSize: '14px',
  fontWeight: 400,
  textTransform: 'uppercase',
}));

const FilterLinkBox = styled(Box)(({ theme }) => ({
  padding: '24px 12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '11px',
}));

const FilterLink = styled('a')(({ theme }) => ({
  color: '#6F6E6E',
  fontSize: '14px',
  fontWeight: 400,
  textDecoration: 'none',
  '&:hover': {
    color: '#F16D7F',
  },
}));

const SortContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '28px',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}));

const SortItem = styled(Accordion)(({ theme }) => ({
  boxShadow: 'none',
  position: 'relative',
  '&.Mui-expanded': {
    margin: 0,
  },
  '& .MuiAccordionSummary-root': {
    padding: 0,
    minHeight: 'auto',
    '&.Mui-expanded': {
      minHeight: 'auto',
      '& .MuiAccordionSummary-content': {
        '& .sort-heading': {
          color: '#F16D7F',
        },
      },
    },
  },
  '& .MuiAccordionSummary-content': {
    margin: '0',
    '&.Mui-expanded': {
      margin: '0',
    },
  },
  '& .MuiAccordionDetails-root': {
    position: 'absolute',
    top: '100%',
    left: '0',
    zIndex: 10,
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    width: '180px',
  },
}));

const SortHeading = styled(Typography)(({ theme }) => ({
  color: '#6F6E6E',
  fontSize: '14px',
  fontWeight: 400,
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
  textTransform: 'uppercase',
}));

const SortBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '22px',
  left: 0,
  backgroundColor: '#FFFFFF',
  boxShadow: '6px 4px 35px 0px rgba(0, 0, 0, 0.21)',
  padding: '7px 30px 11px 9px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  zIndex: 10,
}));

const SortCheck = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
  fontSize: '14px',
  fontWeight: 400,
  color: '#6F6E6E',
}));

const CatalogPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const filters = useSelector(state => state.products.filters);
  const sizes = ['XS', 'S', 'M', 'L'];
  const filteredProducts = products;
  const [filterExpanded, setFilterExpanded] = useState(false);

  // Обработчик изменения фильтра по размеру
  const handleSizeChange = (size) => {
    dispatch({
      type: 'products/toggleSizeFilter',
      payload: size
    });
  };

  // Обработчик открытия/закрытия фильтра
  const handleFilterChange = (event, expanded) => {
    setFilterExpanded(expanded);
  };

  return (
    <Box>
      <TopHeader>
        <TopHeaderContainer maxWidth="lg" sx={{ maxWidth: '1140px !important' }}>
          <PageTitle variant="h1">NEW ARRIVALS</PageTitle>
          <Breadcrumbs separator="/" aria-label="breadcrumb" sx={{ color: '#636363' }}>
            <Link to="/" style={{ color: '#636363', textDecoration: 'none' }}>HOME</Link>
            <Link to="/catalog" style={{ color: '#636363', textDecoration: 'none' }}>MEN</Link>
            <Typography color="#F16D7F" fontWeight={700}>NEW ARRIVALS</Typography>
          </Breadcrumbs>
        </TopHeaderContainer>
      </TopHeader>

      {/* Фильтры и сортировка */}
      <Container maxWidth="lg" sx={{ maxWidth: '1140px !important' }}>
        <FilterSortContainer>
          {/* Фильтр */}
          <FilterAccordion expanded={filterExpanded} onChange={handleFilterChange}>
            <AccordionSummary
              expandIcon={null}
              aria-controls="filter-content"
              id="filter-header"
              sx={{ padding: '0' }}
            >
              <FilterHeading className="filter-heading">
                <span style={{ marginRight: '5px' }}>FILTER</span>
                {filterExpanded ? (
                  <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.833333 10H4.16667C4.625 10 5 9.625 5 9.16667C5 8.70833 4.625 8.33333 4.16667 8.33333H0.833333C0.375 8.33333 0 8.70833 0 9.16667C0 9.625 0.375 10 0.833333 10ZM0 0.833333C0 1.29167 0.375 1.66667 0.833333 1.66667H14.1667C14.625 1.66667 15 1.29167 15 0.833333C15 0.375 14.625 0 14.1667 0H0.833333C0.375 0 0 0.375 0 0.833333ZM0.833333 5.83333H9.16667C9.625 5.83333 10 5.45833 10 5C10 4.54167 9.625 4.16667 9.16667 4.16667H0.833333C0.375 4.16667 0 4.54167 0 5C0 5.45833 0.375 5.83333 0.833333 5.83333Z" fill="#F16D7F" />
                  </svg>
                ) : (
                  <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.833333 10H4.16667C4.625 10 5 9.625 5 9.16667C5 8.70833 4.625 8.33333 4.16667 8.33333H0.833333C0.375 8.33333 0 8.70833 0 9.16667C0 9.625 0.375 10 0.833333 10ZM0 0.833333C0 1.29167 0.375 1.66667 0.833333 1.66667H14.1667C14.625 1.66667 15 1.29167 15 0.833333C15 0.375 14.625 0 14.1667 0H0.833333C0.375 0 0 0.375 0 0.833333ZM0.833333 5.83333H9.16667C9.625 5.83333 10 5.45833 10 5C10 4.54167 9.625 4.16667 9.16667 4.16667H0.833333C0.375 4.16667 0 4.54167 0 5C0 5.45833 0.375 5.83333 0.833333 5.83333Z" fill="black" />
                  </svg>
                )}
              </FilterHeading>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <FilterItem>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="category-content"
                    id="category-header"
                  >
                    <FilterItemTitle className="filter-item-title">CATEGORY</FilterItemTitle>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FilterLinkBox>
                      <FilterLink href="#">Accessories</FilterLink>
                      <FilterLink href="#">Bags</FilterLink>
                      <FilterLink href="#">Denim</FilterLink>
                      <FilterLink href="#">Hoodies & Sweatshirts</FilterLink>
                      <FilterLink href="#">Jackets & Coats</FilterLink>
                      <FilterLink href="#">Polos</FilterLink>
                      <FilterLink href="#">Shirts</FilterLink>
                      <FilterLink href="#">Shoes</FilterLink>
                      <FilterLink href="#">Sweaters & Knits</FilterLink>
                      <FilterLink href="#">T-Shirts</FilterLink>
                      <FilterLink href="#">Tanks</FilterLink>
                    </FilterLinkBox>
                  </AccordionDetails>
                </FilterItem>

                <FilterItem>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="brand-content"
                    id="brand-header"
                  >
                    <FilterItemTitle className="filter-item-title">BRAND</FilterItemTitle>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FilterLinkBox>
                      <FilterLink href="#">Brand 1</FilterLink>
                      <FilterLink href="#">Brand 2</FilterLink>
                      <FilterLink href="#">Brand 3</FilterLink>
                    </FilterLinkBox>
                  </AccordionDetails>
                </FilterItem>

                <FilterItem>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="designer-content"
                    id="designer-header"
                  >
                    <FilterItemTitle className="filter-item-title">DESIGNER</FilterItemTitle>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FilterLinkBox>
                      <FilterLink href="#">Designer 1</FilterLink>
                      <FilterLink href="#">Designer 2</FilterLink>
                      <FilterLink href="#">Designer 3</FilterLink>
                    </FilterLinkBox>
                  </AccordionDetails>
                </FilterItem>
              </Box>
            </AccordionDetails>
          </FilterAccordion>

          {/* Сортировка */}
          <SortContainer>
            <SortItem>
              <AccordionSummary
                expandIcon={<KeyboardArrowDownIcon />}
                aria-controls="trending-content"
                id="trending-header"
              >
                <SortHeading className="sort-heading">TRENDING NOW</SortHeading>
              </AccordionSummary>
            </SortItem>

            <SortItem>
              <AccordionSummary
                expandIcon={<KeyboardArrowDownIcon />}
                aria-controls="size-content"
                id="size-header"
              >
                <SortHeading className="sort-heading">SIZE</SortHeading>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {sizes.map((size) => (
                    <FormControlLabel
                      key={size}
                      control={
                        <Checkbox
                          checked={filters.sizes.includes(size)}
                          onChange={() => handleSizeChange(size)}
                          name={size}
                        />
                      }
                      label={size}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </SortItem>

            <SortItem>
              <AccordionSummary
                expandIcon={<KeyboardArrowDownIcon />}
                aria-controls="price-content"
                id="price-header"
              >
                <SortHeading className="sort-heading">PRICE</SortHeading>
              </AccordionSummary>
            </SortItem>
          </SortContainer>
        </FilterSortContainer>

        {/* Список товаров */}
        <Box sx={{ py: 2 }}>
          <ProductList products={filteredProducts} />
        </Box>
      </Container>
    </Box>
  );
};

export default CatalogPage;
