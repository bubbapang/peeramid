import React from 'react';
import { useState } from 'react';
import Navigation from './Navigation.js';
import Profile from '../Profile';
import Feed from '../Feed';
import Suggestion from '../Suggestion';
import Rating from '../Rating';
import './Home.css';

export default function Home() {
    const [activeButton, setActiveButton] = useState('Profile');

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const renderActiveComponent = () => {
        switch (activeButton) {
            case 'Feed':
                return <Feed />;
            case 'Suggestions':
                return <Suggestion />;
            case 'Rating':
                return <Rating />;
            default:
                return <Profile />;
        }
    };

    return (
        <div className="home-page-container">
            <Navigation onButtonClick={handleButtonClick} />
            {renderActiveComponent()}
        </div>
    );
}
