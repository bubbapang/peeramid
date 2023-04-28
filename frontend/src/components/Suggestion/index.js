import { useState } from "react";
import { useSelector } from "react-redux";
import SuggestionBox from "./SuggestionBox";
import "./Suggestion.css";
import "./Sidebar.css";

export default function Suggestion() {
	const user = useSelector((state) => state.session.user);
	const [filter, setFilter] = useState("All Suggestions");

	const buttons = [
		{ label: "All Suggestions", emoji: "🔎" },
		{ label: "Transcendence", emoji: "🌌" },
		{ label: "Actualization", emoji: "🌟" },
		{ label: "Aesthetics", emoji: "🎨" },
		{ label: "Cognition", emoji: "🧠" },
		{ label: "Esteem", emoji: "🏆" },
		{ label: "Love", emoji: "❤️" },
		{ label: "Safety", emoji: "🔒" },
		{ label: "Physiology", emoji: "💪" },
	];

	return (
		<div className="suggestion-page">
			<div className="sidebar">
				{buttons.map((button, index) => (
					<button
						key={index}
						className="sidebar-button"
						title={button.label}
						onClick={() => setFilter(button.label)}
					>
						{button.emoji} <span>{button.label}</span>
					</button>
				))}
			</div>
			<SuggestionBox user={user} filter={filter} />
		</div>
	);
}
