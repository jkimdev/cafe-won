import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Home from './components/Home';
import MenuList from './components/MenuList';
import MenuDetail from './components/MenuDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderComplete from './components/OrderComplete';
import OrderStatusPage from './components/OrderStatusPage';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuList />} />
            <Route path="/menu/:id" element={<MenuDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-complete/:orderNumber" element={<OrderComplete />} />
            <Route path="/order-status/:orderNumber" element={<OrderStatusPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
