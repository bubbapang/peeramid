import { useState } from 'react';
import Navigation from './Navigation.js';
import Profile from '../Profile';
import Feed from '../Feed';
import Rating from '../Rating';
import Suggestion from '../Suggestion';
import './Home.css';

export default function Home() {
    const [activeButton, setActiveButton] = useState('Rating');

    // const sendToHome = () => {
    //     window.location.href = '/';
    // }
    

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    }

    let activeComponent = null;
    if (activeButton === 'Profile') {
        activeComponent = <Profile className="profile-component"/>;
    } else if (activeButton === 'Feed') {
        activeComponent = <Feed />;
    } else if (activeButton === 'Suggestions') {
        activeComponent = <Suggestion />;
    } else if (activeButton === 'Rating') {
        activeComponent = <Rating />;
    }

    return (
        <div className="home-page-container">
            <Navigation onButtonClick={handleButtonClick} />
            {/* <button onClick={sendToHome}> <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" ></img> </button> */}
            <h1>HomePage</h1>
            {activeComponent}
        </div>
    )
}

