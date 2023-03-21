import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchUsers } from '../../store/session';
// import SearchResults from './SearchResults';
import './Navigation.css';
import SearchBar from './SearchBar';
import { logout } from '../../store/session';
import { useState } from 'react';
import AboutUs from '../AboutUs';

export default function Navigation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
    // send back to '/'
    history.push('/')
}

  const handleButtonClick = (buttonName) => {
    history.push(`/${buttonName.toLowerCase()}`);
  };

  const handleSearch = (searchTerm) => {
      dispatch(searchUsers(searchTerm));
    // Perform search here or navigate to the search results page
    console.log('Search term:', searchTerm);
  };


  return (
    <div className="nav-bar-container">
      <button onClick={handleLogout}>Logout</button>
      <div className='profile-today-search'>
        <div className='profile-today'>
          <button className="profile-icon" onClick={() => handleButtonClick('Profile')}><i className="fas fa-user-circle fa-2x" /></button>
          <button className="today" onClick={() => handleButtonClick('Rating')}>Today</button>
        </div>
        <SearchBar onSearch={handleSearch}  />
      </div>
      <button onClick={handleModalToggle}>About Us</button>   
      {isModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <button onClick={handleModalToggle} className="close-modal">X</button>
      <AboutUs />
    </div>
  </div>
)}
      <div className='feed-suggestions'>
        <button onClick={() => handleButtonClick('Feed')}>Feed</button>
        <button onClick={() => handleButtonClick('Suggestions')}>Suggestions</button>
      </div>
    </div>
  );
}
