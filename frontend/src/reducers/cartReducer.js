import { CART_ADD_ITEM } from '../constants/productsConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // item as an action
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        // this code concatenate card items with the new item. So suppose that we have two items in cart items and we have a new one.
        // The result of this expression is going to be three items.
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    default:
      return state;
  }
};
