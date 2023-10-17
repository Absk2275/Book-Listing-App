import React, { useState } from 'react';

import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",

  });
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (data.email === "" || data.password === "") {
        setErr("All fields are required");

      }
      else {
        setErr("");
        const res = await fetch("https://bookapp-xrlg.onrender.com/loginuser", {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            password: data.password,

          })
        });
        setLoading(true);

        const json = await res.json();
   
        if (!json.success) {
          setErr(json.message);
          setLoading(false);
        }

        if (json.success) {
          
          localStorage.setItem("userEmail", data.email);
          localStorage.setItem("authToken", json.authToken);
          localStorage.setItem("role", json.role);
          setLoading(true);
          
          navigate("/");
        }

      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }

  }
  const inputData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })

  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }


  return (
    <div>

      <section className="100vh" style={{ backgroundColor: "#1B1212", height: "90.5vh" }}>
        <div className="container h-100 lg-h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11" >
              <div className="card text-black h-75 my-2"  >
                <div className="card-body p-md-5" >
                  <div className="row justify-content-center " >
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-4 ">Login</p>

                      <form className="mx-1 mx-md-4" >

                        {err ? <p className='text-danger text-center'>{err}</p> : ""}

                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                            <input type="email" id="form3Example3c" className="form-control" name="email" value={data.email} onChange={inputData} />

                          </div>
                        </div>


                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0 form-group">

                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                            <input type={showPassword ? "text" : "password"} id="form3Example4c" className="form-control" aria-describedby="basic-addon2" name="password" value={data.password} onChange={inputData} />

                          </div>
                          <div className="input-group-append mt-4 flex-fill form-group">
                            <span className="input-group-text " style={{ paddingTop: "10px", paddingBottom: "10px", marginTop: "8px" }} onClick={handleShowPassword}>
                              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </span>
                          </div>
                        </div>

                        <div className="text-center my-4 ">
                          Don't have an account? <Link to="/register">Create Account</Link>
                        </div>



                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-1">
                          <button type="submit" className="btn btn-primary btn-lg" onClick={handleSubmit}>Login</button>
                        </div>

                      </form>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-1">
                          <span  disabled={loading}> {/* Disable the button while loading */}
                            {loading ? <span className="spinner-border text-success spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null} {/* Show the loading icon while loading */}
                            
                          </span>
                        </div>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        className="img-fluid" alt="Sample_image" />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}
