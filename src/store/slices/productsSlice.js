import { createSlice } from '@reduxjs/toolkit';

/**
 * Начальное состояние для товаров
 * @type {Object}
 */
const initialState = {
  items: [
    {
      id: 1,
      title: 'ELLERY X M\'O CAPSULE',
      description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.',
      price: 52.00,
      image: '/img/catalog/Product001.jpg',
      size: 'S',
      color: 'White'
    },
    {
      id: 2,
      title: 'ELLERY X M\'O CAPSULE',
      description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.',
      price: 52.00,
      image: '/img/catalog/Product002.jpg',
      size: 'M',
      color: 'Blue'
    },
    {
      id: 3,
      title: 'ELLERY X M\'O CAPSULE',
      description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.',
      price: 52.00,
      image: '/img/catalog/Product003.jpg',
      size: 'L',
      color: 'Black'
    },
    {
      id: 4,
      title: 'ELLERY X M\'O CAPSULE',
      description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.',
      price: 52.00,
      image: '/img/catalog/Product004.jpg',
      size: 'XS',
      color: 'Multicolor'
    },
    {
      id: 5,
      title: 'ELLERY X M\'O CAPSULE',
      description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.',
      price: 52.00,
      image: '/img/catalog/Product005.jpg',
      size: 'L',
      color: 'Brown'
    },
    {
      id: 6,
      title: 'ELLERY X M\'O CAPSULE',
      description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.',
      price: 52.00,
      image: '/img/catalog/Product006.jpg',
      size: 'S',
      color: 'Floral print'
    },
    {
      id: 7,
      title: 'ELLERY X M\'O CAPSULE',
      description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.',
      price: 52.00,
      image: '/img/catalog/Product007.jpg',
      size: 'M',
      color: 'Gray'
    },
    {
      id: 8,
      title: 'ELLERY X M\'O CAPSULE',
      description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.',
      price: 52.00,
      image: '/img/catalog/Product008.jpg',
      size: 'XS',
      color: 'Beige'
    },
    {
      id: 9,
      title: 'ELLERY X M\'O CAPSULE',
      description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.',
      price: 52.00,
      image: '/img/catalog/Product009.jpg',
      size: 'L',
      color: 'Black'
    }
  ],
  filters: {
    sizes: []
  }
};

/**
 * Slice для управления товарами
 */
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    /**
     * Переключение фильтра по размеру
     * @param {Object} state - Текущее состояние
     * @param {Object} action - Действие с payload в виде размера
     */
    toggleSizeFilter: (state, action) => {
      const size = action.payload;
      const index = state.filters.sizes.indexOf(size);
      
      if (index === -1) {
        state.filters.sizes.push(size);
      } else {
        state.filters.sizes.splice(index, 1);
      }
    },
    
    /**
     * Сброс всех фильтров
     * @param {Object} state - Текущее состояние
     */
    resetFilters: (state) => {
      state.filters.sizes = [];
    }
  }
});

// Экспорт actions
export const { toggleSizeFilter, resetFilters } = productsSlice.actions;

/**
 * Селектор для получения отфильтрованных товаров
 * @param {Object} state - Состояние Redux
 * @returns {Array} - Отфильтрованные товары
 */
export const selectFilteredProducts = (state) => {
  const { items, filters } = state.products;
  
  // Если фильтры не выбраны, возвращаем все товары
  if (filters.sizes.length === 0) {
    return items;
  }
  
  // Фильтрация товаров по размеру
  return items.filter(item => filters.sizes.includes(item.size));
};

export default productsSlice.reducer;
