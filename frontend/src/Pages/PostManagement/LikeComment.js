import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoSend } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import './LikeComment.css';

function LikeComment() {
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const loggedInUserID = localStorage.getItem('userID');
  const targetID = 'generic-target-1'; // Hardcoded for simplicity; can be dynamic

  // Fetch likes for the target
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/interactions/likes', {
          params: { targetID },
        });
        setLikes(response.data);
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };
    fetchLikes();
  }, [targetID]);

  // Fetch comments for the target
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/interactions/comments', {
          params: { targetID },
        });
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [targetID]);

  // Fetch follow status for the target
  useEffect(() => {
    const fetchFollowStatus = async () => {
      if (!loggedInUserID) return;
      try {
        const response = await axios.get('http://localhost:8080/api/interactions/follow', {
          params: { targetID, userID: loggedInUserID },
        });
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error('Error fetching follow status:', error);
      }
    };
    fetchFollowStatus();
  }, [targetID, loggedInUserID]);

  // Handle like toggle
  const handleLike = async () => {
    if (!loggedInUserID) {
      alert('Please log in to like.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/interactions/like', null, {
        params: { targetID, userID: loggedInUserID },
      });
      setLikes((prevLikes) => ({
        ...prevLikes,
        [loggedInUserID]: response.data.liked,
      }));
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  // Handle follow toggle
  const handleFollow = async () => {
    if (!loggedInUserID) {
      alert('Please log in to follow.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/interactions/follow', null, {
        params: { targetID, userID: loggedInUserID },
      });
      setIsFollowing(response.data.isFollowing);
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  // Handle comment submission
  const handleAddComment = async () => {
    if (!loggedInUserID) {
      alert('Please log in to comment.');
      return;
    }
    if (!newComment.trim()) {
      alert('Comment cannot be empty.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/interactions/comment', {
        userID: loggedInUserID,
        targetID,
        content: newComment,
      });
      setComments((prevComments) => [...prevComments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="container">
      <div className="interaction-section">
        <div className="like-comment-container">
          {/* Like Button */}
          <div className="like_btn_con">
            <BiSolidLike
              className={likes[loggedInUserID] ? 'unlikebtn' : 'likebtn'}
              onClick={handleLike}
            />
            <p className="like_num">
              {Object.values(likes).filter((liked) => liked).length}
            </p>
          </div>

          {/* Comment Count */}
          <div className="like_btn_con">
            <FaCommentAlt className="combtn" />
            <p className="like_num">{comments.length}</p>
          </div>

          {/* Follow Button */}
          <div className="like_btn_con">
            {isFollowing ? (
              <FaUserMinus
                className="unfollowbtn"
                onClick={handleFollow}
                title="Unfollow"
              />
            ) : (
              <FaUserPlus
                className="followbtn"
                onClick={handleFollow}
                title="Follow"
              />
            )}
          </div>
        </div>

        {/* Comment Input */}
        <div className="add_comennt_con">
          <input
            type="text"
            className="add_coment_input"
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <IoSend
            onClick={handleAddComment}
            className="add_coment_btn"
          />
        </div>
<br/>
        {/* Comment List */}
        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment.id} className="coment_full_card">
              <div className="comnt_card">
                <p className="comnt_card_username">{comment.userFullName}</p>
                <p className="comnt_card_coment">{comment.content}</p>
                <p className="comnt_card_time">{comment.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LikeComment;