import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import { useSelector } from 'react-redux';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
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
            <NavLink to="/sign">Sign In</NavLink>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
