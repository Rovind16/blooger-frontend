import React, { useState } from 'react';
import './signin.css';
import AlertMessage from '../alertmessage/alertmessage';
import {useNavigate} from "react-router-dom"
import {Link} from 'react-router-dom';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data,val) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          setAlert({ type: 'success', message: 'Sign-in successful' });
          localStorage.setItem("email", data.val);
          localStorage.setItem("login", "true");
          setTimeout(() => {
             navigate("/home");
          }, 1000);
        } else {
          setAlert({ type: 'error', message: 'Incorrect email or password' });
        }
      });
  };

  const handleCloseAlert = () => {
    setAlert(null);
  };

  return (
    <div className='ct'>
      <div className="signin-container">
        <h2 className="signin-title">Sign In</h2>
        {alert && (
          <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={handleCloseAlert}
          />
        )}
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="signin-input-group">
            <label className="signin-label">Email:</label>
            <input
              className="signin-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="signin-input-group">
            <label className="signin-label">Password:</label>
            <input
              className="signin-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="signin-button" type="submit">Sign In</button>
        </form>
        <p>New User? 
          <Link to="/signup">
          <span> Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
