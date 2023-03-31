import React, { useState } from "react";
import { useEffect } from "react";
import "./PinItem.css";
import { useSelector, useDispatch } from "react-redux";
import { createLike, deleteLike } from "../../store/likes";
import { getPins, deletePin } from "../../store/pins";

export default function PinItem({ suggestion, likeIds }) {
const dispatch = useDispatch();
const currentUser = useSelector((state) => state.session.user);
const [likeCount, setLikeCount] = useState(suggestion.likes.length);
const [pinCount, setPinCount] = useState(suggestion.pins.length);

const [likeDisplay, setLikeDisplay] = useState(
    likeIds.includes(suggestion._id) ? "Liked" : "Like"
);

useEffect(() => {
    setLikeDisplay(likeIds.includes(suggestion._id) ? "Liked" : "Like")
    // setLikeCount(suggestion.likes.length)
}, [likeIds])

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

const unpinClick = () => {
dispatch(deletePin(suggestion._id));
};

return ((
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
        <button onClick={unpinClick}>
        <i className="fas fa-thumbtack" /> Unpin
        </button>
    </div>
    </div>
)
);
}
