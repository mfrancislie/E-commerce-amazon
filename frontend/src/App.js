import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
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
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { useEffect, useState } from 'react';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import MapScreen from './screens/MapScreen';
import DashboardScreen from './screens/DashboardScreen';
import ChatBox from './components/ChatBox';
import SupportScreen from './screens/SupportScreen';

function App() {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSideBarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <NavLink className="brand" to="/">
              Amazon
            </NavLink>
          </div>
          <div>
            <SearchBox />
          </div>
          <div>
            <NavLink to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </NavLink>
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <NavLink to="#">
                  Seller
                  <i className="fa fa-caret-down"></i>
                </NavLink>
                <ul className="dropdown-content">
                  <li>
                    <NavLink to="/productlist/seller">Products</NavLink>
                  </li>
                  <li>
                    <NavLink to="/orderlist/seller">Orders</NavLink>
                  </li>
                </ul>
              </div>
            )}

            {userInfo && userInfo.isAdmin ? (
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
                    <NavLink to="/" onClick={signoutHandler}>
                      Signout
                    </NavLink>
                  </li>
                </ul>
              </div>
            ) : userInfo ? (
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
                  <li>
                    <Link to="/support">Support</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sideBarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSideBarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSideBarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Routes>
            <Route path="/search/name/:name?" element={<SearchScreen />} />
            <Route
              path="/search/category/:category"
              element={<SearchScreen />}
            />
            <Route
              path="/search/category/:category/name/:name"
              element={<SearchScreen />}
            />
            <Route
              path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
              element={<SearchScreen />}
            />
            <Route path="/seller/:id" element={<SellerScreen />} />
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
            <Route path="/map" element={<PrivateRoute />}>
              <Route path="/map" element={<MapScreen />} />
            </Route>
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfileScreen />} />
            </Route>
            <Route path="/orderlist" element={<AdminRoute />}>
              <Route path="/orderlist" element={<OrderListScreen />} />
            </Route>
            <Route path="/productlist" element={<AdminRoute />}>
              <Route path="/productlist" element={<ProductListScreen />} />
            </Route>
            <Route path="/dashboard" element={<AdminRoute />}>
              <Route path="/dashboard" element={<DashboardScreen />} />
            </Route>
            <Route
              path="/productlist/pageNumber/:pageNumber"
              element={<AdminRoute />}
            >
              <Route
                path="/productlist/pageNumber/:pageNumber"
                element={<ProductListScreen />}
              />
            </Route>
            <Route path="/userlist" element={<AdminRoute />}>
              <Route path="/userlist" element={<UserListScreen />} />
            </Route>
            <Route path="/support" element={<AdminRoute />}>
              <Route path="/support" element={<SupportScreen />} />
            </Route>
            <Route path="/user/:id/edit" element={<AdminRoute />}>
              <Route path="/user/:id/edit" element={<UserEditScreen />} />
            </Route>
            <Route path="/productlist/seller" element={<SellerRoute />}>
              <Route
                path="/productlist/seller"
                element={<ProductListScreen />}
              />
            </Route>
            <Route path="/orderlist/seller" element={<SellerRoute />}>
              <Route path="/orderlist/seller" element={<OrderListScreen />} />
            </Route>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div>All right reserved</div>{' '}
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
