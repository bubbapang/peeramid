// import { useDispatch } from "react-redux";
// import { logout } from "../../store/session";
import React from 'react';
import './Navigation.css';

export default function Navigation({ onButtonClick }) {
    // const dispatch = useDispatch();

    const handleButtonClick = (buttonName) => {
        onButtonClick(buttonName);
    };

    // const logUserOut = () => {
    //     dispatch(logout());
    //     window.location.href = '/';
    // };

    return (
        <div className="nav-bar-container">
            <button className="profile-icon" onClick={() => handleButtonClick('Profile')}><img src="https://via.placeholder.com/30" alt="Profile" /></button>
            <button className="today" onClick={() => handleButtonClick('Rating')}>Today</button>
            <div className="search-container"><input type="text" placeholder="Search..." className="search-input" /></div>
            <button onClick={() => handleButtonClick('Feed')}>Feed</button>
            <button onClick={() => handleButtonClick('Suggestions')}>Suggestions</button>
        </div>
    );
}
