// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// USER PAGES
import Home from './pages/user/Home';
import BookStore from './pages/user/BookStore';
import Cart from './pages/user/Cart'; 
import Contact from './pages/user/Contact';
import Payment from './pages/user/Payment';
import History from './pages/user/History';

// ADMIN PAGES
import Overview from './pages/admin/Overview';
import ManageBooks from './pages/admin/ManageBooks';
import ManageTransactions from './pages/admin/ManageTransactions'; 
import UserReports from './pages/admin/UserReports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* User Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/bookstore" element={<BookStore />} />
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/history" element={<History />} />

        {/* Admin Routes */}
        <Route path="/admin/overview" element={<Overview />} />
        <Route path="/admin/books" element={<ManageBooks />} />
        <Route path="/admin/transactions" element={<ManageTransactions />} /> 
        <Route path="/admin/reports" element={<UserReports />} />
      </Routes>
    </Router>
  );
}

export default App;