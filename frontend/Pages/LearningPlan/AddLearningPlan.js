import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";
import { FaVideo, FaImage } from "react-icons/fa";
import { HiCalendarDateRange } from "react-icons/hi2";
import NavBar from '../../Components/NavBar/NavBar';
import './post.css';
import './Templates.css';
import './AddLearningPlan.css';



function AddLearningPlan() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentURL, setContentURL] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContentURLInput, setShowContentURLInput] = useState(false);
  const [showImageUploadInput, setShowImageUploadInput] = useState(false);
  const [templateID, setTemplateID] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (startDate === endDate || startDate > endDate) {
      alert("Start date and end date are invalid.");
      setIsSubmitting(false);
      return;
    }

    const postOwnerID = localStorage.getItem('userID');
    const postOwnerName = localStorage.getItem('userFullName');

    if (!postOwnerID) {
      alert('Please log in to add a post.');
      navigate('/');
      return;
    }

    if (tags.length < 2) {
      alert("Please add at least two tags.");
      setIsSubmitting(false);
      return;
    }

    if (!templateID) {
      alert("Please select a template.");
      setIsSubmitting(false);
      return;
    }

    try {
      let imageUrl = '';
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        const uploadResponse = await axios.post('http://localhost:8080/learningPlan/planUpload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        imageUrl = uploadResponse.data;
      }

      const newPost = {
        title,
        description,
        contentURL,
        tags,
        postOwnerID,
        postOwnerName,
        imageUrl,
        templateID,
        startDate,
        endDate,
        category
      };

      await axios.post('http://localhost:8080/learningPlan', newPost);
      alert('Post added successfully!');
      navigate('/allLearningPlan');
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Failed to add post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEmbedURL = (url) => {
    try {
      if (url.includes('youtube.com/watch')) {
        const videoId = new URL(url).searchParams.get('v');
        return `https://www.youtube.com/embed/${videoId}`;
      }
      if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1];
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return url;
    } catch {
      return '';
    }
  };

  return (
    <div className='continer'>
      <NavBar />
      <div className='continSection'>
        <div className="template-preview-container">
          {[1, 2, 3].map((id) => (
            <div key={id} className={`template template-${id}`}>
              <p className='template_id_one'>template {id}</p>
              {id === 3 && imagePreview && <img src={imagePreview} alt="Preview" className="iframe_preview" />}
              {id === 3 && contentURL && (
                <iframe
                  src={getEmbedURL(contentURL)}
                  title="Content Preview"
                  className="iframe_preview"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              )}
              <p className='template_title'>{title || "Title Preview"}</p>
              <p className='template_dates'><HiCalendarDateRange /> {startDate} to {endDate}</p>
              <p className='template_description'>{category}</p>
              <hr />
              <p className='template_description'>{description || "Description Preview"}</p>
              <div className="tags_preview">
                {tags.map((tag, index) => (
                  <span key={index} className="tagname">#{tag}</span>
                ))}
              </div>
              {id !== 3 && (
                <div className='preview_part'>
                  {imagePreview && <img src={imagePreview} alt="Preview" className="iframe_preview_new" />}
                  {contentURL && (
                    <iframe
                      src={getEmbedURL(contentURL)}
                      title="Content Preview"
                      className="iframe_preview_new"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="from_continer">
          <p className="Auth_heading">Add Learning Post</p>
          <form onSubmit={handleSubmit} className='from_data'>
            <div className="Auth_formGroup">
              <label className="Auth_label">Title</label>
              <input
                className="Auth_input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="Auth_formGroup">
              <label className="Auth_label">Tags</label>
              <div className='skil_dis_con'>
                {tags.map((tag, index) => (
                  <p className='skil_name' key={index}>#{tag}</p>
                ))}
              </div>
              <div className='skil_addbtn'>
                <input
                  className="Auth_input"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                />
                <IoMdAdd onClick={handleAddTag} className="add_s_btn" />
              </div>
            </div>

            <div className="Auth_formGroup">
              <label className="Auth_label">Description</label>
              <textarea
                className="Auth_input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
              />
            </div>

            <div className="Auth_formGroup">
              <label className="Auth_label">Select Template</label>
              <select
                className="Auth_input"
                value={templateID}
                onChange={(e) => setTemplateID(e.target.value)}
                required
              >
                <option value="">Select Template ID</option>
                <option value="1">Template 1</option>
                <option value="2">Template 2</option>
                <option value="3">Template 3</option>
              </select>
            </div>

            <div className="Auth_formGroup">
              <label className="Auth_label">Start Date</label>
              <input
                className="Auth_input"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="Auth_formGroup">
              <label className="Auth_label">End Date</label>
              <input
                className="Auth_input"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
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

            <hr />

            <div className="Auth_formGroup newpart_set">
              <FaVideo className='newpart_set_icon' onClick={() => setShowContentURLInput(!showContentURLInput)} />
              <FaImage className='newpart_set_icon' onClick={() => setShowImageUploadInput(!showImageUploadInput)} />
            </div>

            {showContentURLInput && (
              <div className="Auth_formGroup">
                <label className="Auth_label">Content URL</label>
                <input
                  className="Auth_input"
                  type="url"
                  value={contentURL}
                  onChange={(e) => setContentURL(e.target.value)}
                />
              </div>
            )}

            {showImageUploadInput && (
              <div className="Auth_formGroup">
                <label className="Auth_label">Upload Image</label>
                {imagePreview && (
                  <div className="image-preview-achi">
                    <img src={imagePreview} alt="Preview" className="image-preview-achi" />
                  </div>
                )}
                <input
                  className="Auth_input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            )}

            <button
              type="submit"
              className="Auth_button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddLearningPlan;
