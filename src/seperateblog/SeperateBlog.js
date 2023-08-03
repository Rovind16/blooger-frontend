import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import {useNavigate} from "react-router-dom"
import './separateblog.css';

const SeperateBlog = () => {
  let { id } = useParams();
  const [comment, setComment] = useState('');
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/seperateblog/${id}`)
      .then(res => res.json())
      .then(data => {
        setBlog(data.data[0]);
        console.log(data.data[0]);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleComment = (e, blogtitle) => {
    fetch('http://localhost:5000/comment', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        blogtitle,
        comment,
      }),
    });
    navigate("/home");
  };

  return (
    <div >
        <h1 className='cnt'>Blog</h1>
    <div className="separate-blog-container">
      {isLoading ? (
        <div className="tm-main">
          <div className="tm-post-title">Loading...</div>
        </div>
      ) : (
        <div className="separate-blog-item">
          <div className="separate-blog-image-container">
            <img src={blog.img} alt="Blog" className="separate-blog-image" />
          </div>
          <div className="separate-blog-content-container">
            <h3 className="separate-blog-title">Name: {blog.name}</h3>
            <h3 className="separate-blog-label">Title</h3>
            <p className="separate-blog-title">{blog.title}</p>
            </div>
            <h3 className="separate-blog-label">Content</h3>
            <pre className="separate-blog-content">{blog.content}</pre>
            <p className="blog-content">Posted on: {blog.formattedDateTime}</p>
            <div className="separate-social-media-sharing">
                Post on:
              <FacebookShareButton url={window.location.href}>
                <FaFacebook size={32} />
              </FacebookShareButton>
              <TwitterShareButton url={window.location.href} title={blog.title}>
                <FaTwitter size={32} />
              </TwitterShareButton>
              <LinkedinShareButton url={window.location.href}>
                <FaLinkedin size={32} />
              </LinkedinShareButton>
            </div>
          <div className="separate-comment-section">
            <input
              type="text"
              placeholder="Add a comment..."
              className="separate-comment-input"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="separate-post-button" onClick={(e) => handleComment(e, blog.title)}>
              Post
            </button>
            <div className="separate-comments-section">
              <h3 className="separate-blog-label">Comments</h3>
              {blog.comment.length!=0 ? (
                blog.comment.map((comment, index) => (
                  <p key={index} className="separate-comment">
                    {comment}
                  </p>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default SeperateBlog;
