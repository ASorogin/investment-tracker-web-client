// Profile.js
import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import '../styles/profilestyles.css';

export const Profile = () => {
 const { user } = useAuth();

 return (
   <div className="profile-container">
     <h2 className="profile-title">Profile Details</h2>
     <div className="profile-info">
       <div className="info-item">
         <label>Name:</label>
         <span>{user.name}</span>
       </div>
       <div className="info-item">
         <label>Email:</label>
         <span>{user.email}</span>
       </div>
       <div className="info-item">
         <label>Role:</label>
         <span>{user.role}</span>
       </div>
       <div className="info-item">
         <label>Status:</label>
         <span>{user.isActive ? 'Active' : 'Inactive'}</span>
       </div>
       <div className="info-item">
         <label>Last Login:</label>
         <span>{new Date(user.lastLogin).toLocaleString()}</span>
       </div>
     </div>
   </div>
 );
};