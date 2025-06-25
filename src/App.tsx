import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Home from './components/Home';
import MenuList from './components/MenuList';
import MenuDetail from './components/MenuDetail';
import Cart from './components/Cart';
import OrderComplete from './components/OrderComplete';
import OrderStatusPage from './components/OrderStatusPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuList />} />
              <Route path="/menu/:id" element={<MenuDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order-complete/:orderNumber" element={<OrderComplete />} />
              <Route path="/order-status/:orderNumber" element={<OrderStatusPage />} />
              
              {/* 관리자 라우트 */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
