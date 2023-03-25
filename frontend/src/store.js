import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from 'redux';
import thunk from 'redux-thunk';
import {
  productListReducers,
  detailsProductReducers,
} from './reducers/productReducers';
const initialState = {};

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: detailsProductReducers,
});
const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(
  reducer,
  initialState,
  composeEnhacer(applyMiddleware(thunk))
);

export default store;
