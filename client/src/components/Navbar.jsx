import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BsCartFill, BsPencilSquare } from "react-icons/bs";
import { BiLogOutCircle, BiLogInCircle } from "react-icons/bi";

import Badge from "react-bootstrap/Badge";
import Modal from '../Modal';
import Cart from './pages/Cart';
import { useCart } from './ContextReducer';


import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";

export default function Navbar({ theme, toggleTheme }) {



  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const Navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");

    Navigate('/login');

  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-success ">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-white">
            {/* <img src={logo} alt="hello" style={{height:"2em"}}/> */}
            BookApp
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto">
              <Link to="/" className="nav-link text-white fs-5" aria-current="page">Home</Link>

              {(localStorage.getItem("authToken")) ?
                <Link to="/myorders" className="nav-link text-white fs-5" aria-current="page">My Orders</Link>
                : ""}
            </div>

            <div className="mobView" onClick={toggleTheme} >
              {theme === 'light' ? (

                <MdOutlineLightMode className='fs-3 text-white' />

              ) : (
                < MdDarkMode className='fs-3 text-muted' />


              )}
              
            </div>


            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex '>
                <Link to="/login" className="btn bg-white text-success mx-2 mobView" >
                  <BiLogInCircle className='mb-1 ' />Login</Link>
                <Link to="/register" className="btn bg-white text-success mx-2 mobView">< BsPencilSquare className='mb-1' />Register</Link>

              </div>
              :
              <div className='d-flex '>
                <div className="btn bg-white text-success mx-2 mobView" onClick={() => setCartView(true)}>
                  < BsCartFill className='mb-1 ' />
                  Cart {" "}
                  <Badge pill bg="danger">{data.length === 0 ? "" : data.length}</Badge>
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                <div className="btn bg-white text-success mx-2 mobView" onClick={handleClick}><BiLogOutCircle className='mb-1 ' />Logout</div>

              </div>}




          </div>

        </div>
      </nav>
    </>
  )
}
