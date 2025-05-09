import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';

/**
 * Конфигурация Redux store
 * @type {Object}
 */
const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer
  }
});

export default store;
