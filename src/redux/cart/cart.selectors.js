import { createSelector } from 'reselect';

// The input select below selectCart is a function that get's whole state and returns slice
const selectCart = (state) => state.cart;

// The select below uses createSelector

export const selectCartItems = createSelector(
  [selectCart], // Array of input selectors
  (cart) => cart.cartItems // Function that returns the value that I want from this selector in the order they were written above
  // It is automatically memoized
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulatedTotal, cartItem) => accumulatedTotal + cartItem.quantity * cartItem.price,
    0
  )
);
