import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createLike, deleteLike } from "../../store/likes";
import { createPin, deletePin } from "../../store/pins";
import { updateSuggestion } from "../../store/suggestions";
import { deleteSuggestion } from "../../store/suggestions";
import "./SuggestionItem.css";

export default function SuggestionItem({ suggestion, pinIds, likeIds }) {
	const dispatch = useDispatch();

	const currentUser = useSelector((state) => state.session.user);

	const [editMode, setEditMode] = useState(false);
	const [showSuccessBanner, setShowSuccessBanner] = useState(false);
	const [showDeleteSuccessBanner, setShowDeleteSuccessBanner] = useState(false);
	const [likeDisplay, setLikeDisplay] = useState("Like");
	const [pinDisplay, setPinDisplay] = useState("Pin");
	const [likeCount, setLikeCount] = useState(suggestion.likes.length);
	const [pinCount, setPinCount] = useState(suggestion.pins.length);

	useEffect(() => {
		if (likeIds.includes(suggestion._id)) {
			setLikeDisplay("Liked");
		} else {
			setLikeDisplay("Like");
		}
	}, [likeIds, suggestion._id]);

	useEffect(() => {
		if (pinIds.includes(suggestion._id)) {
			setPinDisplay("Pinned");
		} else {
			setPinDisplay("Pin");
		}
	}, [pinIds, suggestion._id]);

	const displayDeleteSuccessBanner = () => {
		setShowDeleteSuccessBanner(true);
		setTimeout(() => {
			setShowDeleteSuccessBanner(false);
		}, 3000);
	};

	const displaySuccessBanner = () => {
		setShowSuccessBanner(true);
		setTimeout(() => {
			setShowSuccessBanner(false);
		}, 3000);
	};

	const toggleEditMode = () => {
		setEditMode(!editMode);
	};

	const deleteSugg = () => {
		dispatch(deleteSuggestion(suggestion._id));
		toggleEditMode();
		displayDeleteSuccessBanner();
	};

	const submitEdit = () => {
		const newSuggestion = {
			id: suggestion._id,
			body: document.getElementById("update-suggestion-body").value,
			dayRating: suggestion.dayRating,
			categoryTag: suggestion.categoryTag,
		};
		dispatch(updateSuggestion(newSuggestion));
		suggestion.body = newSuggestion.body;
		toggleEditMode();
		displaySuccessBanner();
	};

	const likeClick = async () => {
		await dispatch(createLike(suggestion, currentUser._id));
		setLikeDisplay("Liked");
		setLikeCount(likeCount + 1);
	};

	const unlikeClick = async () => {
		await dispatch(deleteLike(suggestion._id, currentUser._id));
		setLikeDisplay("Like");
		setLikeCount(likeCount - 1);
	};

	const pinClick = async () => {
		await dispatch(createPin(suggestion, currentUser._id));
		setPinDisplay("Pinned");
		setPinCount(pinCount + 1);
	};

	const unpinClick = async () => {
		await dispatch(deletePin(suggestion._id, currentUser._id));
		setPinDisplay("Pin");
		setPinCount(pinCount - 1);
	};

	return (
		<div className="sugg-wrapper">
			{showSuccessBanner && (
				<div className="success-banner">
					<span>Suggestion successfully updated!</span>
					<button
						className="close-success-banner"
						onClick={() => setShowSuccessBanner(false)}
					>
						&times;
					</button>
				</div>
			)}

			{showDeleteSuccessBanner && (
				<div className="success-banner">
					<span>Suggestion successfully deleted!!</span>
					<button
						className="close-success-banner"
						onClick={() => setShowDeleteSuccessBanner(false)}
					>
						&times;
					</button>
				</div>
			)}

			<div className="sugg-item">
				<div className="sugg-item-content">
					<div className="user-emoji-container">
						<h1>{suggestion.user.username} says:</h1>
					</div>

					<div className="sugg-body">
						{editMode ? (
							<form onSubmit={updateSuggestion}>
								<textarea
									id="update-suggestion-body"
									defaultValue={suggestion.body}
								></textarea>
							</form>
						) : (
							suggestion.body
						)}
					</div>

					<div className="buttons-parts">
						{editMode ? (
							<>
								<button onClick={submitEdit}>
									<i className="fas fa-save" /> Save
								</button>
								<button onClick={toggleEditMode}>
									<i className="fas fa-times" /> Cancel
								</button>
								<button onClick={deleteSugg}>
									<i className="fas fa-trash" /> Delete
								</button>
							</>
						) : (
							<>
								<button
									onClick={
										likeDisplay === "Like"
											? likeClick
											: unlikeClick
									}
								>
									<i className="fas fa-heart" /> {likeDisplay}{" "}
									({likeCount})
								</button>
								<button
									onClick={
										pinDisplay === "Pin"
											? pinClick
											: unpinClick
									}
								>
									<i className="fas fa-thumbtack" />{" "}
									{pinDisplay} ({pinCount})
								</button>
								{currentUser &&
									currentUser._id === suggestion.user._id && (
										<button onClick={toggleEditMode}>
											<i className="fas fa-edit" /> Edit
										</button>
									)}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
