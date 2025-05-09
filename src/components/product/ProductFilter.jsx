import React from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Divider, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Компонент ProductFilter - фильтр товаров по размерам
 * @returns {JSX.Element} - Компонент фильтра товаров
 */
const ProductFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.products.filters);

  // Список доступных размеров
  const sizes = ['XS', 'S', 'M', 'L'];

  // Обработчик изменения фильтра по размеру
  const handleSizeChange = (size) => {
    dispatch({
      type: 'products/toggleSizeFilter',
      payload: size
    });
  };

  // Обработчик сброса всех фильтров
  const handleResetFilters = () => {
    dispatch({
      type: 'products/resetFilters'
    });
  };

  return (
    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Фильтры
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="subtitle1" gutterBottom>
        Size
      </Typography>
      
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
      
      <Button 
        variant="outlined" 
        size="small" 
        onClick={handleResetFilters}
        sx={{ mt: 2 }}
        fullWidth
      >
        Сбросить фильтры
      </Button>
    </Box>
  );
};

export default ProductFilter;
