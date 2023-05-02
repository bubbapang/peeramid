import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createLike, deleteLike } from "../../store/likes";
import { createPin, deletePin, deleteTargetUserPin } from "../../store/pins";
import { getCurrentUser } from "../../store/session";
import "./PinItem.css";

export default function PinItem({
	suggestion,
	userPins,
	likes,
	isProfileSelf,
}) {
	const dispatch = useDispatch();

	const currentUser = useSelector((state) => state.session.user);

	const [likeCount, setLikeCount] = useState(suggestion.likes.length);
	const [pinDisplay, setPinDisplay] = useState("Unpin");
	const [likeDisplay, setLikeDisplay] = useState(
		likes[suggestion._id] ? "Liked" : "Like"
	);

	const needsAndColors = {
		physiology: "#577590",
		safety: "#4d908e",
		love: "#43aa8b",
		esteem: "#90be6d",
		cognition: "#f9c74f",
		aesthetics: "#f8961e",
		actualization: "#f3722c",
		transcendence: "#f94144",
	};

	const lowerCategory = suggestion.categoryTag.toLowerCase();

	useEffect(() => {
		setLikeDisplay(likes[suggestion._id] ? "Liked" : "Like");
	}, [likes, suggestion._id]);

	useEffect(() => {
		if (!isProfileSelf) {
			setPinDisplay(
				userPins.includes(suggestion._id) ? "Pinned" : "Pin"
			);
		} else {
			setPinDisplay("Unpin");
		}
	}, [userPins, suggestion._id, isProfileSelf]);

	useEffect(() => {
		setLikeCount(suggestion.likes.length);
	}, [suggestion.likes.length]);

	// like and unlike functions

	const likeClick = async () => {
		await dispatch(createLike(suggestion, currentUser._id));
		setLikeDisplay("Liked");
		setLikeCount(likeCount + 1);
	};

	const unlikeClick = async () => {
		await dispatch(deleteLike(suggestion._id));
		setLikeDisplay("Like");
		setLikeCount(likeCount - 1);
	};

	// create and delete pins. backend / actual
	// receive and remove pins. frontend / visual

	// pin and unpin functions

	const pinClick = async () => {
		await dispatch(createPin(suggestion, currentUser._id));
		setPinDisplay("Pinned");
		dispatch(getCurrentUser());
	};

	const unpinCurrentUserClick = async () => {
		await dispatch(deletePin(suggestion._id));
	};

	const unpinTargetUserClick = async () => {
		await dispatch(deleteTargetUserPin(suggestion._id, currentUser._id));
		setPinDisplay("Pin");
		dispatch(getCurrentUser());
	};

	const handleClick = () => {
		if (isProfileSelf) {
			unpinCurrentUserClick();
		} else {
			pinDisplay === "Pin" ? pinClick() : unpinTargetUserClick();
		}
	};

	return (
		<div className="pin-item" style={{ backgroundColor: needsAndColors[lowerCategory] }}>
			<div className="profile-part">
				<i className="fas fa-user-circle fa-2x" />
			</div>
			<div className="suggestion-part">
				<div className="category-tag">{suggestion.categoryTag}</div>
				<h1>{suggestion.body}</h1>
			</div>
			<div className="buttons-part">
				<button
					onClick={likeDisplay === "Like" ? likeClick : unlikeClick}
				>
					<i className="fas fa-heart" /> {likeDisplay}({likeCount})
				</button>
				<button onClick={handleClick}>
					<i className="fas fa-thumbtack" /> {pinDisplay}
				</button>
			</div>
		</div>
	);
}
