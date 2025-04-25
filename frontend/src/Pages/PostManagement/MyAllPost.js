import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiSolidLike } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
// import './LikeCommentComponent.css';

function LikeCommentComponent() {
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const userID = localStorage.getItem('userID');

  useEffect(() => {
    // Fetch initial likes/comments if needed
    axios.get('http://localhost:8080/interactions')
      .then((res) => {
        setLikes(res.data.likes || {});
        setComments(res.data.comments || []);
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  const handleLike = async () => {
    try {
      const response = await axios.put('http://localhost:8080/interaction/like', null, {
        params: { userID }
      });
      setLikes(response.data.likes || {});
    } catch (error) {
      console.error('Error liking:', error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await axios.post('http://localhost:8080/interaction/comment', {
        userID,
        content: newComment
      });
      setComments(response.data.comments || []);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="interaction-box">
      <div className="like-section">
        <BiSolidLike
          className={likes[userID] ? 'unlikebtn' : 'likebtn'}
          onClick={handleLike}
        />
        <p className='like-count'>
          {Object.values(likes || {}).filter(Boolean).length}
        </p>
      </div>

      <div className='comment-section'>
        <input
          type="text"
          className='comment-input'
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <IoSend
          onClick={handleAddComment}
          className='comment-send'
        />
      </div>

      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment.id} className='comment-item'>
            <strong>{comment.userFullName}</strong>: {comment.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LikeCommentComponent;
