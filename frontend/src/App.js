import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <NavLink className="brand" to="/">
              amazona
            </NavLink>
          </div>
          <div>
            <NavLink to="/cart">Cart</NavLink>
            <NavLink to="/sign">Sign In</NavLink>
          </div>
        </header>
        <main>
          <Routes>
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
