import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchUsers } from "../../store/session";
// import SearchResults from './SearchResults';
import "./Navigation.css";
import SearchBar from "./SearchBar";
import { logout } from "../../store/session";
import { useState } from "react";
import AboutUs from "../AboutUs";
import { useEffect } from "react";

export default function Navigation() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleModalToggle = () => {
		setIsModalOpen(!isModalOpen);
	};

	const handleBackgroundClick = (e) => {
		if (e.target.classList.contains("modal-background")) {
			setIsModalOpen(false);
		}
	};

	useEffect(() => {
		if (isModalOpen) {
			document.addEventListener("click", handleBackgroundClick);
		} else {
			document.removeEventListener("click", handleBackgroundClick);
		}

		return () => {
			document.removeEventListener("click", handleBackgroundClick);
		};
	}, [isModalOpen]);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		// send back to '/'
		history.push("/");
	};

	const handleButtonClick = (buttonName) => {
		history.push(`/${buttonName.toLowerCase()}`);
	};

	const handleSearch = (searchTerm) => {
		dispatch(searchUsers(searchTerm));
		// Perform search here or navigate to the search results page
		console.log("Search term:", searchTerm);
	};

	return (
		<div className="nav-bar-container">
			<button className="logout-icon" onClick={handleLogout}>
				Logout
			</button>
			<div className="profile-today-search">
				<div className="profile-today">
					<button
						className="profile-icon"
						onClick={() => handleButtonClick("Profile")}
					>
						<i className="fas fa-user-circle fa-2x" />
					</button>
					<button
						className="today"
						onClick={() => handleButtonClick("Rating")}
					>
						Today
					</button>
				</div>
				<SearchBar onSearch={handleSearch} />
			</div>
			<button className="about-us-icon" onClick={handleModalToggle}>
				About Us
			</button>
			{isModalOpen && (
				<div className="modal modal-background">
					<div className="modal-content">
						<button
							onClick={handleModalToggle}
							className="close-modal"
						>
							{" "}
							<p>X</p>
						</button>
						<AboutUs />
					</div>
				</div>
			)}
			<div className="feed-suggestions">
				<button
					className="feed-icon"
					onClick={() => handleButtonClick("Feed")}
				>
					Feed
				</button>
				<button
					className="suggestions-icon"
					onClick={() => handleButtonClick("Suggestions")}
				>
					Suggestions
				</button>
			</div>
		</div>
	);
}
