
import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null); // State to hold the user ID

  useEffect(() => {
    // Fetch user data from localStorage on component mount
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.user_id) {
      setUserId(user.user_id); // Set the user ID for fetching profile
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return; // Exit if userId is not defined yet

      try {
        console.log(`Fetching profile for user ID: ${userId}`);
        const response = await fetch(`http://localhost:8000/${userId}/profile`);
        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(`Error fetching user profile: ${errorDetails}`);
        }
        const data = await response.json();
        console.log("Profile data:", data);
        setProfile(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError(error.message);
      }
    };

    fetchProfile();
  }, [userId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <h1>User Profile</h1>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Total Exams:</strong> {profile.total_exams}</p>
      <p><strong>Average Score:</strong> {profile.average_score ? profile.average_score.toFixed(2) : 'N/A'}</p>
    </div>
  );
};

export default Profile;
