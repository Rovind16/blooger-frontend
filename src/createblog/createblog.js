import React, { useState } from 'react';
import './createblog.css';
import {useNavigate} from "react-router-dom"
import AlertMessage from '../alertmessage/alertmessage';

const BlogUpload = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [alert, setAlert] = useState(null);
  const [category,setCategory]=useState('');
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const convertImageToBinaryData = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const binaryData = reader.result;
        resolve(binaryData);
      };

      reader.onerror = () => {
        reject(new Error('Failed to read the file'));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === '' || email.trim() === '' || title.trim() === '' || content.trim() === '' || image === null) {
      setAlert({ type: 'error', message: 'Please fill in all fields' });
      return;
    }
    const img = await convertImageToBinaryData(image);
    const currentDate = new Date(); 
    const formattedDateTime = currentDate.toLocaleString(); 

    fetch('http://localhost:5000/upload-blog', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        name,
        email,
        title,
        content,
        category,
        img,
        formattedDateTime,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'userRegister');
        setAlert({ type: 'success', message: 'Your Blog Added Successfully!' });
        setTimeout(() => {
          navigate("/home");
       }, 1000);
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        setAlert({ type: 'error', message: 'Error Occurred' });
      });
  };

  const handleCloseAlert = () => {
    setAlert(null);
  };
  const onCategory=(event)=>{
    console.log(event.target.value);
    setCategory(event.target.value);
  }
  return (
    <div className="blogupload-container">
      <h2 className="blogupload-title">Upload Your Blog</h2>
      <form className="blogupload-form" onSubmit={handleSubmit}>
        <div className="blogupload-input-group">
          <label className="blogupload-label">Name:</label>
          <input className="blogupload-input" type="text" value={name} onChange={handleNameChange} />
        </div>
        <div className="blogupload-input-group">
          <label className="blogupload-label">Email:</label>
          <input className="blogupload-input" type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="blogupload-input-group">
          <label className="blogupload-label">Title:</label>
          <input className="blogupload-input" type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div className="blogupload-input-group">
          <label className="blogupload-label">Content:</label>
          <textarea className="blogupload-textarea" value={content} onChange={handleContentChange} />
        </div>
        <div className="category" onChange={onCategory}>
          <span>Category:</span>
          <input type="radio" value="Food" name="category" id="food-radio" />
          <label htmlFor="food-radio">Food</label>
          <input type="radio" value="Travel" name="category" id="travel-radio" />
          <label htmlFor="travel-radio">Travel</label>
          <input type="radio" value="Health and fitness" name="category" id="health-radio" />
          <label htmlFor="health-radio">Health and fitness</label>
          <input type="radio" value="Personal" name="category" id="personal-radio" />
          <label htmlFor="personal-radio">Personal</label>
          <input type="radio" value="Sports" name="category" id="sports-radio" />
          <label htmlFor="sports-radio">Sports</label>
          <input type="radio" value="Others" name="category" id="others-radio" />
          <label htmlFor="others-radio">Others</label>
</div>

        <div className="blogupload-input-group">
          <label className="blogupload-label">Image:</label>
          <input className="blogupload-file-input" type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button className="blogupload-button" type="submit">
          Upload
        </button>
      </form>
      {alert && <AlertMessage type={alert.type} message={alert.message} onClose={handleCloseAlert} />}
    </div>
  );
};

export default BlogUpload;
