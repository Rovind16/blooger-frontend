import React, { useState } from 'react';
import './signup.css';
import AlertMessage from '../alertmessage/alertmessage';
import {useNavigate} from "react-router-dom"
import {Link} from 'react-router-dom';

const SignUpForm = () => {
  const [alert, setAlert] = useState(null);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!name || !email || !password || !confirmPassword) {
      setAlert({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    if (password !== confirmPassword) {
      setAlert({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    console.log(name);
    fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        setAlert({ type: 'success', message: 'Registration completed successfully.' });
        setTimeout(() => {
          navigate("/signin");
       }, 1000);
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        setAlert({ type: 'error', message: 'Registration failed. Please try again.' });
      });
  };

  const handleCloseAlert = () => {
    setAlert(null);
  };

  

  return (
    <div className='ct'>
      <div className="signup-container">
        <h2 className="signup-title">Sign Up</h2>
        {alert && (
          <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={handleCloseAlert}
          />
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <br></br>
            <input
              type="text"
              className="signup-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <br></br>
            <input
              type="email"
              className="signup-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              className="signup-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              className="signup-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <p>Already registered?<Link to='/signin'><span> Sign in</span></Link></p>
      </div>
    </div>
  );
};

export default SignUpForm;
