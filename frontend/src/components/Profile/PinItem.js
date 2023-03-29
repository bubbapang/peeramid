import React, { useState } from "react";
import "./PinItem.css";
import { useSelector, useDispatch } from "react-redux";
import { createLike, deleteLike } from "../../store/likes";
import { getPins, createPin, deletePin } from "../../store/pins";

export default function PinItem({ suggestion }) {
const dispatch = useDispatch();
const currentUser = useSelector((state) => state.session.user);
const [isVisible, setIsVisible] = useState(true);
const pinIds = useSelector(getPins(currentUser._id));
const [likeCount, setLikeCount] = useState(suggestion.likes.length);
const [pinCount, setPinCount] = useState(suggestion.pins.length);

const [likeDisplay, setLikeDisplay] = useState(
currentUser?.likes?.includes(suggestion._id) ? "Liked" : "Like"
);
const pinDisplay = "Unpin";

const likeClick = () => {
dispatch(createLike(suggestion, currentUser._id));
setLikeDisplay("Liked");
setLikeCount(likeCount + 1);
};

const unlikeClick = () => {
dispatch(deleteLike(suggestion._id));
setLikeDisplay("Like");
setLikeCount(likeCount - 1);
};

const pinClick = () => {
dispatch(createPin(suggestion, currentUser._id));
};

const unpinClick = () => {
dispatch(deletePin(suggestion._id));
setIsVisible(false);
};

return (
isVisible && (
    <div className="pin-item">
    <div className="profile-part">
        <i className="fas fa-user-circle fa-2x" />
    </div>
    <div className="suggestion-part">
        <div className="category-tag">{suggestion.categoryTag}</div>
        <h1>{suggestion.body}</h1>
    </div>
    <div className="buttons-part">
        <button onClick={likeDisplay === "Like" ? likeClick : unlikeClick}>
        <i className="fas fa-heart" /> {likeDisplay}({likeCount})
        </button>
        <button onClick={pinDisplay === "Pin" ? pinClick : unpinClick}>
        <i className="fas fa-thumbtack" /> {pinDisplay}
        </button>
    </div>
    </div>
)
);
}
