import React, { useState, useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import SearchBar from '../searchbar/searchbar';
import AlertMessage from '../alertmessage/alertmessage';
import Loading from '../loading/loading';
import {useNavigate} from "react-router-dom"

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [darkMode, setDarkMode] = useState(false); // State for Dark Mode

  useEffect(() => {
    fetch('https://blogvista-backend.onrender.com/get-blog', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        const sortedBlogs = data.data.sort((a, b) => {
          const timeA = new Date(a.formattedDateTime).getTime();
          const timeB = new Date(b.formattedDateTime).getTime();
          return timeB - timeA;
        });

        setBlogs(sortedBlogs);
        console.log(sortedBlogs);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    checkLogin();
  }, []);

  function checkLogin() {
    const val = localStorage.getItem('login');
    if (val === 'true') {
      setToken(true);
    } else {
      setToken(false);
    }
  }

  const handleSearch = (searchTerm) => {
    const filtered = blogs.filter((blog) => {
      const title = blog.title.toLowerCase();
      return title.includes(searchTerm.toLowerCase());
    });
    setFilteredBlogs(filtered);
  };


  const options = ['All', 'Food', 'Travel', 'Health and fitness', 'Personal', 'Sports', 'Others'];

  const onOptionChangeHandler = (event) => {
    const categories = event.target.value;
    if (categories === 'All') {
      setFilteredBlogs(blogs);
      return;
    }
    const filt = blogs.filter((blog) => {
      const cat = blog.category.toLowerCase();
      return cat.includes(categories.toLowerCase());
    });
    if (filt.length === 0) {
      setAlert({ type: 'error', message: 'There are no blogs in this category' });
    } else {
      setFilteredBlogs(filt);
    }
  };

  const handleCloseAlert = () => {
    setAlert(null);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const renderBlogs = filteredBlogs.length > 0 ? filteredBlogs : blogs;

  return (
    <div className={`home-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="categories-container">
        <select onChange={onOptionChangeHandler}>
          <option>Choose Your Categories</option>
          {options.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
      </div>
      {token && (
        <Link to="/createblog">
          <button className="home-button">Create Blog</button>
        </Link>
      )}
      {!token && <h4>Sign in to create a blog!</h4>}
      <div className="srch">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="toggle-container">
        <input
          type="checkbox"
          className="toggle-checkbox"
          id="darkModeToggle"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
        <label className="toggle-label" htmlFor="darkModeToggle"></label>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="blog-container">
        <h2 className="blogs-heading">Blogs</h2>
        <div className="blogs-list">
          {renderBlogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <img src={blog.img} alt="Blog" className="blog-image" />
              <div className="blog-details">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-content">{blog.content}</p>
                <Link to={`/seperateBlog/${blog._id}`}>
                  <button className="view-more-button" style={{ backgroundColor: '#0e9577' }}>
                    View More
                  </button>
                </Link>
                <br/>
                <p className="blog-content">Posted on: {blog.formattedDateTime}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
      {alert && <AlertMessage type={alert.type} message={alert.message} onClose={handleCloseAlert} />}
    </div>
  );
};

export default Home;
