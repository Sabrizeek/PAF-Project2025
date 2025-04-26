import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";


function UpdateUserProfile() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    phone: '',
    skills: [],
    bio: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput] });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  useEffect(() => {
    fetch(`http://localhost:8080/user/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then((data) => setFormData(data))
      .catch((error) => console.error('Error:', error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/user/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        if (profilePicture) {
          const formData = new FormData();
          formData.append('file', profilePicture);
          await fetch(`http://localhost:8080/user/${id}/uploadProfilePicture`, {
            method: 'PUT',
            body: formData,
          });
        }
        alert('Profile updated successfully!');
        window.location.href = '/userProfile';
      } else {
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className='continer'>
       
        <div className='continSection'>
          <div className="from_continer">
            <h1 className="update-profile-heading">Update Your Profile</h1>
            <form onSubmit={handleSubmit} className="Auth_form">
              <div className="Auth_formGroup update-form-full">
                <div className="profile-icon-container">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Selected Profile"
                      className="update-profile-image"
                    />
                  ) : formData.profilePicturePath ? (
                    <img
                      src={`http://localhost:8080/uploads/profile/${formData.profilePicturePath}`}
                      alt="Current Profile"
                      className="update-profile-image"
                    />
                  ) : null}
                </div>
                <div className="file-input-wrapper">
                  <label className="file-input-label">
                    Choose New Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>

              <div className="update-form-grid">
                <div className="Auth_formGroup">
                  <label className="Auth_label">Full Name</label>
                  <input
                    className="Auth_input"
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="Auth_formGroup">
                  <label className="Auth_label">Email Address</label>
                  <input
                    className="Auth_input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="Auth_formGroup">
                  <label className="Auth_label">Password</label>
                  <input
                    className="Auth_input"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="Auth_formGroup">
                  <label className="Auth_label">Phone</label>
                  <input
                    className="Auth_input"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="Auth_formGroup">
                <label className="Auth_label">Skills</label>
                <div className='skil_dis_con'>
                  {formData.skills.map((skill, index) => (
                    <p className='skil_name' key={index}>
                      {skill} 
                      <span className='remve_skil' onClick={() => handleRemoveSkill(skill)}>×</span>
                    </p>
                  ))}
                </div>
                <div className='skil_addbtn'>
                  <input
                    className="Auth_input"
                    type="text"
                    placeholder="Add Skill"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                  />
                  <IoMdAdd onClick={handleAddSkill} className="add_s_btn" />
                </div>
              </div>

              <div className="Auth_formGroup">
                <label className="Auth_label">Bio</label>
                <textarea
                  className="Auth_input"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <button type="submit" className="update-submit-button">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserProfile;
