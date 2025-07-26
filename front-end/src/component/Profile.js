import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Profile</h2>
        {user ? (
          <div className="profile-info">
            <p><span>Name:</span> {user.name}</p>
            <p><span>Email:</span> {user.email}</p>
            <p><span>Role:</span> {user.role}</p>
            <p><span>User ID:</span> {user._id}</p>
          </div>
        ) : (
          <p>No user data found</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
