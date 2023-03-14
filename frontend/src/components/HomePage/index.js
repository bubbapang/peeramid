import { useState } from 'react';
import NavBar from '../NavBar';
import Profile from '../Profile';
import Feed from '../Feed';
import Suggestions from '../Suggestions';
import './HomePage.css';

export default function HomePage() {
    const [activeButton, setActiveButton] = useState('Profile');

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    }

    let activeComponent = null;
    if (activeButton === 'Profile') {
        activeComponent = <Profile />;
    } else if (activeButton === 'Feed') {
        activeComponent = <Feed />;
    } else if (activeButton === 'Suggestions') {
        activeComponent = <Suggestions />;
    }

    return (
        <div className="home-page-container">
            <NavBar onButtonClick={handleButtonClick} />
            <h1>HomePage</h1>
            {activeComponent}
        </div>
    )
}
