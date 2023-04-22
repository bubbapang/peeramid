import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createLike, deleteLike } from "../../store/likes";
import { createPin, deletePin, deleteTargetUserPin } from "../../store/pins";
import { getCurrentUser } from "../../store/session";
import "./PinItem.css";

export default function PinItem({ suggestion, likes, sessionUserPins, isProfileSelf }) {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.session.user);
	const [likeCount, setLikeCount] = useState(suggestion.likes.length);
	const [pinDisplay, setPinDisplay] = useState("Unpin");
	// const [pinCount, setPinCount] = useState(suggestion.pins.length);

	const [likeDisplay, setLikeDisplay] = useState(
		likes[suggestion._id] ? "Liked" : "Like"
	);

	useEffect(() => {
		setLikeDisplay(likes[suggestion._id] ? "Liked" : "Like");
		// setLikeCount(suggestion.likes.length)
	}, [likes, suggestion._id]);

	useEffect(() => {
		if (!isProfileSelf) {
			setPinDisplay(sessionUserPins.includes(suggestion._id) ? "Pinned" : "Pin")
		} else {
			setPinDisplay("Unpin")
		}
	})

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

	const unpinCurrentUserClick = async () => {
		await dispatch(deletePin(suggestion._id));
	};

	const pinClick = async () => {
		await dispatch(createPin(suggestion, currentUser._id));
		setPinDisplay("Pinned");
		dispatch(getCurrentUser());
		// setPinCount(pinCount + 1);
	};
	const unpinTargetUserClick = async () => {
		await dispatch(deleteTargetUserPin(suggestion._id, currentUser._id));
		setPinDisplay("Pin");
		dispatch(getCurrentUser());
		// setPinCount(pinCount - 1);
	};

	// useEffect(() => {
	// 	dispatch(getCurrentUser());
	// }, [dispatch, pinClick])

	useEffect(() => {
		setLikeCount(suggestion.likes.length);
	}, [suggestion.likes.length]);

	const handleClick = () => {
		if (isProfileSelf) {
			unpinCurrentUserClick();
		} else {
			pinDisplay === "Pin" ? pinClick() : unpinTargetUserClick();
		}
	}

	return (
		<div className="pin-item">
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
