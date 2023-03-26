import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';

const CartScreen = () => {
  const params = useParams();
  const productId = params.id;
  const location = useLocation();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <div>
      <h1>CartScreen</h1>
      <div>
        ADD TO CART: productId: {productId} | qty: {qty}
      </div>
    </div>
  );
};

export default CartScreen;
