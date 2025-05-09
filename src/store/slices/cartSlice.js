import { createSlice } from '@reduxjs/toolkit';

/**
 * Начальное состояние для корзины
 * @type {Object}
 */
const initialState = {
  items: [],
  total: 0
};

/**
 * Slice для управления корзиной
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Добавление товара в корзину
     * @param {Object} state - Текущее состояние
     * @param {Object} action - Действие с payload в виде товара
     */
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // Если товар уже есть в корзине, увеличиваем количество
        existingItem.quantity += newItem.quantity || 1;
      } else {
        // Если товара нет в корзине, добавляем его
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1
        });
      }
      
      // Recalculate total price
      state.total = calculateTotal(state.items);
    },
    
    /**
     * Remove item from cart
     * @param {Object} state - Current state
     * @param {Object} action - Action with payload as item id
     */
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      
      // Recalculate total price
      state.total = calculateTotal(state.items);
    },
    
    /**
     * Update item quantity
     * @param {Object} state - Current state
     * @param {Object} action - Action with payload as object {id, quantity}
     */
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        item.quantity = quantity;
      }
      
      // Recalculate total price
      state.total = calculateTotal(state.items);
    },
    
    /**
     * Clear cart
     * @param {Object} state - Current state
     */
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    }
  }
});

/**
 * Helper function to calculate total price of items in cart
 * @param {Array} items - Array of items in cart
 * @returns {number} - Total price
 */
const calculateTotal = (items) => {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

// Export actions
export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

/**
 * Selector to get number of items in cart
 * @param {Object} state - Redux state
 * @returns {number} - Number of items
 */
export const selectCartItemsCount = (state) => {
  return state.cart.items.reduce((count, item) => count + item.quantity, 0);
};

/**
 * Selector to get total price of items in cart
 * @param {Object} state - Redux state
 * @returns {number} - Total price
 */
export const selectCartTotal = (state) => state.cart.total;

export default cartSlice.reducer;
