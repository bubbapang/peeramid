import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSuggestion } from "../../store/suggestions";

export function FormDrawer({
	onClose, visible, closing, rating, clickedLabel, onSuccess,
}) {
	const dispatch = useDispatch();
	const [suggestionBody, setSuggestionBody] = useState("");

	const submitSuggestionForm = async (e) => {
		e.preventDefault();
		const newSuggestion = {
			body: suggestionBody,
			dayRating: rating._id,
			categoryTag: clickedLabel,
		};
		if (newSuggestion.body.length === 0) {
			alert("Please enter a suggestion before submitting");
		} else {
			await dispatch(createSuggestion(newSuggestion, rating._id));
			const suggestionCreatedEvent = new CustomEvent("suggestionCreated");
			window.dispatchEvent(suggestionCreatedEvent);
			setSuggestionBody("");

			onSuccess();

			onClose();
		}
	};

	return (
		<div
			className={`form-drawer${visible ? " visible" : ""}${closing ? " closing" : ""}`}
		>
			<button className="close-button" onClick={onClose}>
				Close
			</button>
			<h2>{rating.user.username}</h2>
			{/* Your form content goes here */}
			<div className="form-drawer-content">
				{/* input text box and label to send a suggestion */}
				<div className="form-drawer-input">
					<button id="form-button">
						{" "}
						You are submitting a suggestion based on the user's:{" "}
						<span id="label">{clickedLabel} </span>{" "}
					</button>
					<br></br>
					<br></br>
					<input
						type="text"
						id="suggestion_body"
						name="suggestion"
						placeholder="Enter a suggestion"
						value={suggestionBody}
						onChange={(e) => setSuggestionBody(e.target.value)} />

					<br></br>
					<br></br>
					<button
						className="form-drawer-button"
						onClick={submitSuggestionForm}
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}
