import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductEditScreen from './screens/ProductEditScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <NavLink className="brand" to="/">
              Amazon
            </NavLink>
          </div>
          <div>
            <NavLink to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </NavLink>
            {userInfo ? (
              <div className="dropdown">
                <NavLink to="#">
                  {userInfo.name}
                  <i className="fa fa-caret-down"></i>
                </NavLink>
                <ul className="dropdown-content">
                  <li>
                    <NavLink to="/profile">My Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to="/orderhistory">Order History</NavLink>
                  </li>
                  <li>
                    <NavLink to="/" onClick={signoutHandler}>
                      Signout
                    </NavLink>
                  </li>
                </ul>
              </div>
            ) : (
              <NavLink to="/signin">Sign In</NavLink>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <NavLink to="/admin">
                  Admin <i className="fa fa-caret-down"></i>
                </NavLink>
                <ul className="dropdown-content">
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    <NavLink to="/productlist">Products</NavLink>
                  </li>
                  <li>
                    <NavLink to="/orderlist">Orders</NavLink>
                  </li>
                  <li>
                    <NavLink to="/userlist">Users</NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path="/product/:id" exact element={<ProductScreen />} />
            <Route path="/product/:id/edit" element={<ProductEditScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/shipping" element={<ShippingAddressScreen />} />
            <Route path="/payment" element={<PaymentMethodScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/orderhistory" element={<OrderHistoryScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfileScreen />} />
            </Route>
            <Route path="/productlist" element={<AdminRoute />}>
              <Route path="/productlist" element={<ProductListScreen />} />
            </Route>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
