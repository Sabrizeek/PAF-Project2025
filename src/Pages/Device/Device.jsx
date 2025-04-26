import React, { useState } from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Topbar from '../../Component/Topbar/Topbar';
import Footer from '../../Component/Footer/Footer';
import './Device.css';
import avatar from '../../assets/avatar.png';
import image1 from '../../assets/image1.jpeg';
import image2 from '../../assets/image2.jpeg';
import image3 from '../../assets/image3.jpeg';
import image4 from '../../assets/image4.jpeg';
import image5 from '../../assets/image5.jpeg';


import { FaBell, FaTrash } from 'react-icons/fa';

const initialNotifications = [
  {
    id: 1,
    name: 'Brigid Dawson',
    action: 'followed you',
    daysAgo: '4 days ago',
    image: image2,
    isActive: true // unread by default
  },
  {
    id: 2,
    name: 'John Dwayer',
    action: 'liked your post',
    daysAgo: '3 days ago',
    image: image3,
    isActive: true //unread by default
  },
  {
    id: 3,
    name: 'Tim Trollen',
    action: 'commented on your post',
    daysAgo: '1 days ago',
    image: image4,
    isActive: true //unread by default
  },
  {
    id: 4,
    name: 'Robert Sid',
    action: 'followed you',
    daysAgo: '4 days ago',
    image: image5,
    isActive: true // unread by default
  },
  {
    id: 5,
    name: 'Oliver Cooper',
    action: 'followed you',
    daysAgo: '4 days ago',
    image: avatar,
    isActive: true // unread by default
  }
];

const Device = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleCardBellClick = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id
        ? { ...notification, isActive: !notification.isActive }
        : notification
    );
    setNotifications(updatedNotifications);
  };

  const handleDeleteNotification = (id) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  return (
    <div className="device-page">
      <Topbar />
      <div className="main-container d-flex">
        <Sidebar />
        <div className="device-content container">
          <h2 className="notification-title">--Notifications--</h2>

          <div className="notification-wrapper">
            {notifications.map(notification => (
              <div
                className="notification-card"
                key={notification.id}
                style={{
                  backgroundColor: 'white',
                  border: notification.isActive ? '2px solid #b30000' : '1px solid #dee2e6',
                  boxShadow: notification.isActive ? '0 0 10px rgba(179, 0, 0, 0.6)' : 'none',
                  transition: 'border 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div className="notification-avatar">
                  <img src={notification.image} alt="user" />
                </div>
                <div className="notification-text">
                  <strong>{notification.name}</strong> {notification.action}
                  <div className="notification-time">{notification.daysAgo}</div>
                </div>
                <div className="notification-actions">
                  <FaBell
                    className="icon-btn"
                    title={notification.isActive ? "Mark as Read" : "Mark as Unread"}
                    onClick={() => handleCardBellClick(notification.id)}
                    style={{
                      color: notification.isActive ? 'red' : 'black',
                      cursor: 'pointer'
                    }}
                  />
                  <FaTrash
                    className="icon-btn"
                    title="Delete Notification"
                    onClick={() => handleDeleteNotification(notification.id)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Device;
