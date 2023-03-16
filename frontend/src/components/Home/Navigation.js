import React from 'react';
import { useHistory } from 'react-router-dom';
import './Navigation.css';
import SearchBar from './SearchBar';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

export default function Navigation() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
}

  const handleButtonClick = (buttonName) => {
    history.push(`/${buttonName.toLowerCase()}`);
  };

  const handleSearch = (searchTerm) => {
    // Perform search here or navigate to the search results page
    console.log('Search term:', searchTerm);
  };

  const users = [
    'JohnDoe',
    'JaneSmith',
    'User123',
    'ExampleUser',
    // ... other user names
  ];

  return (
    <div className="nav-bar-container">
      <button className="profile-icon" onClick={() => handleButtonClick('Profile')}><i className="fas fa-user-circle fa-2x" /></button>
      <button className="today" onClick={() => handleButtonClick('Rating')}>Today</button>
      <SearchBar onSearch={handleSearch} users={users} />
      <button onClick={() => handleButtonClick('Feed')}>Feed</button>
      <button onClick={() => handleButtonClick('Suggestions')}>Suggestions</button>
      {/* <button onClick={() => handleButtonClick('Settings')}>Settings</button> */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
