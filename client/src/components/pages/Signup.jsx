import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';



export default function Signup() {

  const [data, setData] = useState({
    name: "",
    email: "",
    location: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [password, setPassword] = useState('');
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Hello");

    try {
      if (data.email === "" || data.name === "" || data.location === "" || password === "") {
        setErr("All fields are required");

      }
      else if (password.length < 8) {
        setErr("Password length must me greater than 8 character")
      }
      else {
        setErr("")
        const res = await fetch("https://bookapp-xrlg.onrender.com/createuser", {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: password,
            location: data.location
          })

        });
        setLoading(true);

        const json = await res.json();
        if (!json.success) {
          setErr(json.error);
          setLoading(false);
        }


        if (json.success) {
          navigate("/login");
        }

      }

    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false)
    }



  }
  const inputData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordsMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordsMatch(event.target.value === password);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div >

      <section className="" style={{ backgroundColor: "#1B1212", overflow: "hidden" }}>
        <div className="container h-100 lg-h-100 mb-3">

          <div className="row d-flex justify-content-center align-items-center h-100  " >
            <div className="col-lg-12 col-xl-11" >
              <div className="card text-black h-75 my-2"  >
                <div className="card-body p-md-5" >
                  <div className="row justify-content-center " >
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-4 ">Sign up</p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-1">
                          <span  disabled={loading}> 
                            {loading ? <span className="spinner-border text-success spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null} {/* Show the loading icon while loading */}
                            
                          </span>
                        </div>



                        {!passwordsMatch && <div className="text-danger text-center">Passwords do not match.</div>}
                        {err ? <p className='text-danger text-center'>{err}</p> : ""}
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example1c">Your Full Name</label>
                            <input type="text" className="form-control" name="name" value={data.name} onChange={inputData} />

                          </div>
                        </div>

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
                            <input type={showPassword ? "text" : "password"} id="form3Example4c" className="form-control" aria-describedby="basic-addon2" name="password" value={password} onChange={handlePasswordChange} />

                          </div>
                          <div className="input-group-append mt-4 flex-fill form-group">
                            <span className="input-group-text " style={{ paddingTop: "10px", paddingBottom: "10px", marginTop: "8px" }} onClick={handleShowPassword}>
                              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </span>
                          </div>
                        </div>


                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0 form-group">

                            <label className="form-label" htmlFor="form3Example4c">Confirm Password</label>
                            <input type={showPassword ? "text" : "password"} id="form3Example4c" className="form-control" aria-describedby="basic-addon2" name="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />

                          </div>
                          <div className="input-group-append mt-4 flex-fill form-group">
                            <span className="input-group-text " style={{ paddingTop: "10px", paddingBottom: "10px", marginTop: "8px" }} onClick={handleShowPassword}>
                              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </span>
                          </div>
                        </div>


                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example4cd">Your Address</label>
                            <input type="text" id="form3Example4cd" className="form-control" name="location" value={data.location} onChange={inputData} />

                          </div>
                        </div>



                        <div className="text-center">
                          Already have an account? <Link to="/login">Login</Link>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-1">
                          <button type="submit" className="btn btn-primary btn-lg">Register</button>
                        </div>
                        <div className="text-secondary text-justify" style={{ fontSize: "0.7em" }}>

                          By creating an account, I accept the Terms & Conditions & Privacy Policy

                        </div>



                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://images.unsplash.com/photo-1471970471555-19d4b113e9ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
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
