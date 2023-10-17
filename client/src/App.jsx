import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Navbar from './components/Navbar';
import Signup from './components/pages/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrders from './components/pages/MyOrders';
import { useState, useEffect } from 'react';
import AddBook from './components/pages/AddBooks';

function App() {
  const [theme, setTheme] = useState('light');
 
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  
  return (
    <CartProvider>

    <BrowserRouter>
    <div  className={`App ${theme}`}>
    <Navbar theme={theme} toggleTheme={toggleTheme}/>
        <Routes>
          <Route exact path="/" element={<Home theme={theme}/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Signup/>} />
          <Route exact path="/myorders" element={<MyOrders/>} />
          <Route exact path="/addbooks" element={<AddBook/>} />
        </Routes>
      </div>
      
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
