import React from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Topbar from '../../Component/Topbar/Topbar';
import Footer from '../../Component/Footer/Footer';
import './Device.css';
import { FaBellSlash, FaTrash } from 'react-icons/fa';

const notifications = [
  {
    id: 1,
    name: 'Brigid Dawson',
    action: 'followed you',
    daysAgo: '4 days ago',
    image: '/assets/avatar.png'
  },
  {
    id: 2,
    name: 'John Dwayer',
    action: 'liked your post',
    daysAgo: '3 days ago',
    image: '/assets/avatar.png'
  },
  {
    id: 3,
    name: 'Tim Trollen',
    action: 'commented on your post',
    daysAgo: '1 days ago',
    image: '/assets/avatar.png'
  }
];

const Device = () => {
  return (
    <div className="device-page">
      <Topbar />
      <div className="main-container d-flex">
        <Sidebar />
        <div className="device-content container">
          <h2 className="notification-title">--Notifications--</h2>
          <div className="notification-wrapper">
            {notifications.map(notification => (
              <div className="notification-card" key={notification.id}>
                <div className="notification-avatar">
                  <img src={notification.image} alt="user" />
                </div>
                <div className="notification-text">
                  <strong>{notification.name}</strong> {notification.action}
                  <div className="notification-time">{notification.daysAgo}</div>
                </div>
                <div className="notification-actions">
                  <FaBellSlash className="icon-btn" title="Mute" />
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
