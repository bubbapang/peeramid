import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import './NavBar.css'

export default function NavBar() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)

    const sendToProfile = () => {
        window.location.href = `/users/${currentUser.id}`
    }

    const sendToFeed = () => {
        window.location.href = `/feed`
    }

    const sendToSuggestions = () => {
        window.location.href = `/suggestions`
    }

    const logUserOut = () => {
        dispatch(logout())
    }



    return (
        <div className="nav-bar-container">
            <button onClick={sendToProfile}>Profile</button>
            <button onClick={sendToFeed}>Feed</button>
            <button onClick={sendToSuggestions}>Suggestions</button>
            <button onClick={logUserOut}>Log Out</button>
        </div>
    )
}