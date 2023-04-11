import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CREATE_ORDER_RESET } from '../constants/orderConstants';

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, error, success, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2)); // logical of this converted to 5.123 = "5.12" => 5.12
  cart.itemPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemPrice);
  cart.totalPrice = cart.itemPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }

    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: CREATE_ORDER_RESET });
    }
  }, [cart, dispatch, navigate, order, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h1>Shipping</h1>
                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                <strong>Address:</strong> {cart.shippingAddress.address} <br />
                {cart.shippingAddress.city},{cart.shippingAddress.postalCode},
                {cart.shippingAddress.country}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h1>Payment</h1>
                <strong>Method:</strong> {cart.paymentMethod} <br />
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h1>Order Items</h1>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          {item.qty} * item.price = {item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <div>
              <h3>Order Summary</h3>
            </div>
            <ul>
              <li>
                <div className="row">
                  <div>Items:</div>
                  <div>Php {cart.itemPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping:</div>
                  <div>Php {cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax:</div>
                  <div>Php {cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Total Order:</strong>
                  </div>
                  <div>
                    <strong>Php {cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  className="primary block"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
            </ul>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
