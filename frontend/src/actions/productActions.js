import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productsConstants';
import Axios from 'axios';

export const listProduct = () => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });

  try {
    const { data } = await Axios.get('/api/products');
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};
