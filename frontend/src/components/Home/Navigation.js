import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { searchUsers, clearTargetUser } from "../../store/session";
import { logout } from "../../store/session";

import SearchBar from "./SearchBar";
import AboutUs from "../AboutUs";

import "./Navigation.css";

export default function Navigation() {
	// init dispatch and history
	const dispatch = useDispatch();
	const history = useHistory();

	// get the ratedToday boolean from frontend state
	const ratedToday = useSelector((state) => state.session.ratedToday);

	// set up state for modal
	const [isModalOpen, setIsModalOpen] = useState(false);

	// add event listener for background click
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

	// handle modal toggle
	const handleModalToggle = () => {
		setIsModalOpen(!isModalOpen);
	};

	// handle background click
	const handleBackgroundClick = (e) => {
		if (e.target.classList.contains("modal-background")) {
			setIsModalOpen(false);
		}
	};

	// handle logout
	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());

		// send back to '/'
		history.push("/");
	};

	// handle button click
	const handleButtonClick = (buttonName) => {
		history.push(`/${buttonName.toLowerCase()}`);

		if (buttonName === "Profile") {
			history.push("/profile");
			// clear the target user somehow
			dispatch(clearTargetUser());
		}
	};

	// handle search
	const handleSearch = (searchTerm) => {
		dispatch(searchUsers(searchTerm));
	};

	// render
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
						className={
							ratedToday ? "rated-today" : "not-rated-today"
						}
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
					<div className="about-modal-content">
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
