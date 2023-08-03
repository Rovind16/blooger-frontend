import React, { useState } from 'react';
import './profiledata.css';
import profileImage from '../images/profile.webp';
import AlertMessage from '../alertmessage/alertmessage';
import Loading from '../loading/loading';
import Name from '../username/username'
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom"
import { useEffect } from 'react';

const ProfilePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [alert, setAlert] = useState(null);
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 
  const deleteblog = () => {
    fetch('http://localhost:5000/get-blog', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBlogs(data.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    deleteblog();
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    setAlert({ type: 'success', message: 'Log-out successful' });
    setTimeout(() => {
      navigate("/home");
   }, 1000);
  };

  const handleCloseAlert = () => {
    setAlert(null);
  };

  const handleRemoveBlog = (email, title, content) => {
    setIsLoading(true); 
    console.log(email);
    fetch("http://localhost:5000/remove-blog", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        title,
        content,
      }),
    })
      .then(() => {
        setAlert({ type: 'success', message: 'Blog removed successfully' });
        deleteblog();
      })
      .catch((error) => {
        setAlert({ type: 'error', message: 'An error occurred while removing the blog' });
        console.error(error);
      });
  };

  return (
    <>
    {isLoading ? (
       
      <Loading />
    ) : (
    <div className="profile-container">
      {alert && (
        <AlertMessage
          type={alert.type}
          message={alert.message}
          onClose={handleCloseAlert}
        />
      )}
      <div className="profile-header">
        <div className="profile-image">
          <img src={profileImage} alt="Profile" />
        </div>
        <h2 className="profile-name"><Name/></h2>
      </div>

      <div className="profile-content">
        <h3>Your Blog</h3>
      </div>

      <div className="blog-container">
        <h2 className="blogs-heading">Blogs</h2>
        <div className="blogs-list">
          {blogs
            .filter((blog) => blog.email === email)
            .map((blog) => (
              <div key={blog.id} className="blog-item">
                <h3 className="blog-label">Name</h3>
                <h3 className="blog-title">{blog.name}</h3>
                <h3 className="blog-label">Title</h3>
                <p className="blog-title">{blog.title}</p>
                <h3 className="blog-label">Content</h3>
                <p className="blog-content">{blog.content}</p>
                <Link to={`/seperateBlog/${blog._id}`}>View more</Link>
                <img src={blog.img} alt="Blog" className="blog-image" />
                <button
                  className="remove-button"
                  onClick={() => handleRemoveBlog(blog.email, blog.title, blog.content)}
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
    )}
    </>
  );
};

export default ProfilePage;
