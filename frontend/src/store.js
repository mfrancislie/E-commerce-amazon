import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducer';
import orderCreateReducer from './reducers/orderReducer';
import {
  productListReducers,
  detailsProductReducers,
} from './reducers/productReducers';
import {
  userRegisterReducer,
  userSigninReducer,
} from './reducers/userReducers';
const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart: {
    // I need to pass it to Jason that pass to convert it to array.
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: 'Paypal',
  },
};

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: detailsProductReducers,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
});
const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(
  reducer,
  initialState,
  composeEnhacer(applyMiddleware(thunk))
);

export default store;
