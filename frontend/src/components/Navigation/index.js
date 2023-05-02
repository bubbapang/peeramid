import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchUsers, clearTargetUser } from "../../store/session";
import { logout } from "../../store/session";
import SearchBar from "./SearchBar";
import About from "../About";
import { Link } from "react-router-dom";
import "./Navigation.css";


export default function Navigation() {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.session.user);
	const ratedToday = useSelector((state) => state.session.ratedToday);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const history = useHistory();


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

	const handleModalToggle = () => {
		setIsModalOpen(!isModalOpen);
	};

	const handleBackgroundClick = (e) => {
		if (e.target.classList.contains("modal-background")) {
			setIsModalOpen(false);
		}
	};

	const handleLogout = async (e) => {
		e.preventDefault();
		await (dispatch(logout()));
		history.push('/');
	};

	const handleSearch = (searchTerm) => {
		dispatch(searchUsers(searchTerm));
	};

	const handleProfileClick = () => {
        if (currentUser) {
            dispatch(clearTargetUser());
            history.push("/profile");
        } else {
            history.push("/");
        }
    };

	return (
		<div className="nav-bar-container">
			<button className="logout-icon" onClick={handleLogout}>
				Logout
			</button>
			<div className="profile-today-search">
				<div className="profile-today">
				<button className="profile-icon" onClick={handleProfileClick}>
                        <i className="fas fa-user-circle fa-2x" />
                    </button>

					<Link to="/rating">
						<button
							className={
								ratedToday ? "rated-today" : "not-rated-today"
							}
						>
							Today
						</button>
					</Link>
				</div>
				<SearchBar onSearch={handleSearch} />
			</div>
			<button className="about-us-icon" onClick={handleModalToggle}>
				About
			</button>
			{isModalOpen && (
				<div className="modal modal-background">
					<div className="about-modal-content">
						<button
							onClick={handleModalToggle}
							className="close-modal"
						>
							<p>X</p>
						</button>
						<About />
					</div>
				</div>
			)}
			<div className="feed-suggestions">
				<Link to="/feed">
					<button className="feed-icon">Feed</button>
				</Link>
				<Link to="/suggestions">
					<button className="suggestions-icon">Suggestions</button>
				</Link>
			</div>
		</div>
	);
}
