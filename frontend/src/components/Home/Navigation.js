import React from 'react';
import { useHistory } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  const history = useHistory();

  const handleButtonClick = (buttonName) => {
    history.push(`/${buttonName.toLowerCase()}`);
  };

  return (
    <div className="nav-bar-container">
      <button
        className="profile-icon"
        onClick={() => handleButtonClick('Profile')}
      >
        <img src="https://via.placeholder.com/30" alt="Profile" />
      </button>
      <button className="today" onClick={() => handleButtonClick('Rating')}>
        Today
      </button>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />
      </div>
      <button onClick={() => handleButtonClick('Feed')}>Feed</button>
      <button onClick={() => handleButtonClick('Suggestions')}>
        Suggestions
      </button>
    </div>
  );
}
