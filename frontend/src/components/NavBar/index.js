import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import './NavBar.css'

export default function NavBar(props) {
    const dispatch = useDispatch();

    const handleButtonClick = (buttonName) => {
        props.onButtonClick(buttonName);
    }

    const logUserOut = () => {
        dispatch(logout())
        window.location.href = '/';
    }

    return (
        <div className="nav-bar-container">
            <button onClick={() => handleButtonClick('Profile')}>Profile</button>
            <button onClick={() => handleButtonClick('Feed')}>Feed</button>
            <button onClick={() => handleButtonClick('Suggestions')}>Suggestions</button>
            <button onClick={() => handleButtonClick('Rating')}>Rate your day</button>
            <button onClick={logUserOut}>Log Out</button>
        </div>
    )
}
