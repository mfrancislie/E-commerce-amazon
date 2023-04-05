import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducer';
import {
  productListReducers,
  detailsProductReducers,
} from './reducers/productReducers';
const initialState = {
  cart: {
    // I need to pass it to Jason that pass to convert it to array.
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};

// const reducer = ((state, action) => {
//   return {products: data.products}
// })

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: detailsProductReducers,
  cart: cartReducer,
});
const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(
  reducer,
  initialState,
  composeEnhacer(applyMiddleware(thunk))
);

export default store;
