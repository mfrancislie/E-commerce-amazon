import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const CartScreen = (props) => {
  const params = useParams();
  const productId = params.id;
  const location = useLocation();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

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
