import Axios from 'axios';
import { CART_ADD_ITEM } from '../constants/productsConstants';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  });

  // I set the key to cart items and the value should be a string, not an object.
  //  I'm using JSON that stringify and here I need to get access to the cart item in redux a store
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
