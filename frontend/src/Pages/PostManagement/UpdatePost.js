import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../Components/NavBar/NavBar';

function UpdatePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [existingMedia, setExistingMedia] = useState([]);
  const [newMedia, setNewMedia] = useState([]);
  const [newMediaPreviews, setNewMediaPreviews] = useState([]); // For previewing new media
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/posts/${id}`);
        const post = response.data;
        setTitle(post.title || '');
        setDescription(post.description || '');
        setCategory(post.category || '');
        setExistingMedia(post.media || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        alert('Failed to fetch post details.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDeleteMedia = async (mediaUrl) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this media file?');
    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/posts/${id}/media`, {
        data: { mediaUrl },
      });
      setExistingMedia(existingMedia.filter((url) => url !== mediaUrl));
      alert('Media file deleted successfully!');
    } catch (error) {
      console.error('Error deleting media file:', error);
      alert('Failed to delete media file.');
    }
  };

  const validateVideoDuration = (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = URL.createObjectURL(file);

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        if (video.duration > 30) {
          reject(`Video ${file.name} exceeds the maximum duration of 30 seconds.`);
        } else {
          resolve();
        }
      };

      video.onerror = () => {
        reject(`Failed to load video metadata for ${file.name}.`);
      };
    });
  };

  const handleNewMediaChange = async (e) => {
    const files = Array.from(e.target.files);
    const maxFileSize = 50 * 1024 * 1024; // 50MB
    const maxImageCount = 3;
    const maxVideoCount = 1;

    // Count existing media
    let imageCount = existingMedia.filter((url) => !url.endsWith('.mp4')).length;
    let videoCount = existingMedia.filter((url) => url.endsWith('.mp4')).length;
    const previews = [];

    for (const file of files) {
      if (file.size > maxFileSize) {
        alert(`File ${file.name} exceeds the maximum size of 50MB.`);
        return;
      }

      if (file.type.startsWith('image/')) {
        imageCount++;
        if (imageCount > maxImageCount) {
          alert('You can upload a maximum of 3 images in total.');
          return;
        }
      } else if (file.type === 'video/mp4') {
        videoCount++;
        if (videoCount > maxVideoCount) {
          alert('You can upload only 1 video in total.');
          return;
        }

        try {
          await validateVideoDuration(file);
        } catch (error) {
          alert(error);
          return;
        }
      } else {
        alert(`Unsupported file type: ${file.type}`);
        return;
      }

      // Add preview for new media
      previews.push({ type: file.type, url: URL.createObjectURL(file) });
    }

    setNewMedia(files);
    setNewMediaPreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    newMedia.forEach((file) => formData.append('newMediaFiles', file));

    try {
      await axios.put(`http://localhost:8080/posts/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Post updated successfully!');
      navigate('/allPost');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="continer">
        <NavBar />
        <div className="continSection">
          <div className="from_continer">
            <p className="Auth_heading">Update Post</p>
            <form onSubmit={handleSubmit} className="from_data">
              <div className="Auth_formGroup">
                <label className="Auth_label">Title</label>
                <input
                  className="Auth_input"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="Auth_formGroup">
                <label className="Auth_label">Description</label>
                <textarea
                  className="Auth_input"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={3}
                />
              </div>
              <div className="Auth_formGroup">
                <label className="Auth_label">Category</label>
                <select
                  className="Auth_input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Street Photography Tips">Street Photography Tips</option>
                  <option value="Editing Basics Photography">Editing Basics Photography</option>
                  <option value="Rules Photography">Rules Photography</option>
                  <option value="Photography">Photography</option>
                </select>
              </div>
              <div className="Auth_formGroup">
                <label className="Auth_label">Media (up to 3 images and 1 video)</label>
                <div className="seket_media">
                  {existingMedia.map((mediaUrl, index) => (
                    <div key={index}>
                      {mediaUrl.endsWith('.mp4') ? (
                        <video controls className="media_file_se">
                          <source src={`http://localhost:8080${mediaUrl}`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img className="media_file_se" src={`http://localhost:8080${mediaUrl}`} alt={`Media ${index}`} />
                      )}
                      <button className="rem_btn" onClick={() => handleDeleteMedia(mediaUrl)}>
                        X
                      </button>
                    </div>
                  ))}
                  {newMediaPreviews.map((preview, index) => (
                    <div key={`new-${index}`}>
                      {preview.type.startsWith('video/') ? (
                        <video controls className="media_file_se">
                          <source src={preview.url} type={preview.type} />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                      
                      )}
                    </div>
                  ))}
                </div>
                <input
                  className="Auth_input"
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,video/mp4"
                  multiple
                  onChange={handleNewMediaChange}
                />
              </div>
              <button type="submit" className="Auth_button">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePost;