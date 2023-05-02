import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPublicSuggestions } from "../../store/suggestions";
import { fetchPins } from "../../store/pins";
import { fetchLikes } from "../../store/likes";
import SuggestionItem from "./SuggestionItem";
import "./Suggestion.css";

export default function SuggestionBox({ user, filter }) {
	const dispatch = useDispatch();

	const suggestions = useSelector((state) => state.suggestions);
	const pins = Object.keys(useSelector((state) => state.pins));
	const likes = Object.keys(useSelector((state) => state.likes));

	useEffect(() => {
		dispatch(fetchAllPublicSuggestions());
	}, [dispatch]);

	useEffect(() => {
		if (user && user._id) {
			dispatch(fetchPins(user._id));
			dispatch(fetchLikes(user._id));
		}
	}, [dispatch, user]);
	

	const filteredSuggestions =
		filter === "Explore"
			? Object.values(suggestions).sort(
					(a, b) => b.likes.length - a.likes.length
			)
			: Object.values(suggestions)
					.filter((suggestion) => suggestion.categoryTag === filter)
					.sort((a, b) => b.likes.length - a.likes.length);

	return (
		<div className="suggestion-box">
			{Object.values(filteredSuggestions).map((suggestion, idx) => (
				<SuggestionItem
					key={idx}
					suggestion={suggestion}
					pins={pins}
					likes={likes}
				/>
			))}
		</div>
	);
}
