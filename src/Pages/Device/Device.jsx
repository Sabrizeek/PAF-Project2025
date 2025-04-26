import React, { useState } from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Topbar from '../../Component/Topbar/Topbar';
import Footer from '../../Component/Footer/Footer';
import './Device.css';
import avatar from '../../assets/avatar.png';
import { FaBell, FaTrash } from 'react-icons/fa';

const initialNotifications = [
  {
    id: 1,
    name: 'Brigid Dawson',
    action: 'followed you',
    daysAgo: '4 days ago',
    image: avatar,
    isActive: false
  },
  {
    id: 2,
    name: 'John Dwayer',
    action: 'liked your post',
    daysAgo: '3 days ago',
    image: avatar,
    isActive: false
  },
  {
    id: 3,
    name: 'Tim Trollen',
    action: 'commented on your post',
    daysAgo: '1 days ago',
    image: avatar,
    isActive: false
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
                  backgroundColor: 'white', // always white
                  border: notification.isActive ? '2px solid #b30000' : '1px solid #dee2e6', // 🔥 border changes
                  transition: 'border 0.3s ease' // smooth border change
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
                    title={notification.isActive ? "Unmark as Read" : "Mark as Read"}
                    onClick={() => handleCardBellClick(notification.id)}
                    style={{
                      color: notification.isActive ? 'red' : 'black',
                      cursor: 'pointer'
                    }}
                  />
                  <FaTrash className="icon-btn" title="Delete" />
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
