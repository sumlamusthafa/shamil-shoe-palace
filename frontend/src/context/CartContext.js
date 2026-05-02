import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(i => i.productId === action.item.productId && i.size === action.item.size);
      if (exists) return state.map(i =>
        i.productId === action.item.productId && i.size === action.item.size
          ? { ...i, quantity: i.quantity + 1 } : i
      );
      return [...state, { ...action.item, quantity: 1 }];
    }
    case 'REMOVE':
      return state.filter(i => !(i.productId === action.productId && i.size === action.size));
    case 'UPDATE_QTY':
      return state.map(i =>
        i.productId === action.productId && i.size === action.size
          ? { ...i, quantity: action.quantity } : i
      );
    case 'CLEAR':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, dispatch, total, count }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
