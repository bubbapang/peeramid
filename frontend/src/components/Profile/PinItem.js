import React from "react";
import "./PinItem.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createLike, deleteLike } from "../../store/likes";
import { createPin, deletePin } from "../../store/pins";

export default function PinItem({suggestion}) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const [isVisible, setIsVisible] = useState(true);
    // const likeDisplay = currentUser && currentUser.likes.includes(suggestion._id) ? "Liked" : "Like";
    // const pinDisplay = currentUser && currentUser.pins.includes(suggestion._id) ? "Pinned" : "Pin";  
const likeDisplay = currentUser?.likes?.includes(suggestion._id) ? "Liked" : "Like";
const pinDisplay = currentUser?.pins?.includes(suggestion._id) ? "Pinned" : "Pin";

    const likeClick = () => {
        dispatch(createLike(suggestion._id))
    };
    const unlikeClick = () => {
    dispatch(deleteLike(suggestion._id))
    };

    const pinClick = () => {
    dispatch(createPin(suggestion._id, currentUser._id))
    };
    const unpinClick = () => {
    dispatch(deletePin(suggestion._id ))
    setIsVisible(false)
    }

    return (
        isVisible && (<div className="pin-item">
            <div className="profile-part">
                <i className="fas fa-user-circle fa-2x" />
            </div>
            <div className="suggestion-part">
                <div className="category-tag">{suggestion.categoryTag}</div>
                <h1>{suggestion.body}</h1>
            </div>
            <div className="buttons-part">
                {/* <button>
                    <i className="fas fa-heart" /> {likeDisplay}({suggestion.likes.length})
                </button>
                <button onClick={pinDisplay === "Pin" ? pinClick : unpinClick}>
                    <i className="fas fa-thumbtack" /> {pinDisplay}({suggestion.pins.length})
                </button> */}
                            <button>
                <i className="fas fa-heart" /> {likeDisplay}({suggestion.likes?.length || 0})
            </button>
            <button onClick={pinDisplay === "Pin" ? pinClick : unpinClick}>
                <i className="fas fa-thumbtack" /> {pinDisplay}({suggestion.pins?.length || 0})
            </button>

            </div>
        </div>)
    );
}

