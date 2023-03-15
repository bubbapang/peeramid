import { useState } from 'react';
import NavBar from './Navigation/Navigation';
import Profile from '../Profile';
import Feed from '../Feed';
import Rating from '../Rating';
import Suggestions from '../Suggestion';
import './HomePage.css';

export default function HomePage() {
    const [activeButton, setActiveButton] = useState('Rating');

    const sendToHome = () => {
        window.location.href = '/';
    }
    

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    }

    let activeComponent = null;
    if (activeButton === 'Profile') {
        activeComponent = <Profile className="profile-component"/>;
    } else if (activeButton === 'Feed') {
        activeComponent = <Feed />;
    } else if (activeButton === 'Suggestions') {
        activeComponent = <Suggestions />;
    } else if (activeButton === 'Rating') {
        activeComponent = <Rating />;
    }

    return (
        <div className="home-page-container">
            <NavBar onButtonClick={handleButtonClick} />
            {/* <button onClick={sendToHome}> <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" ></img> </button> */}
            <h1>HomePage</h1>
            {activeComponent}
        </div>
    )
}

