import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTargetUser, searchUsers } from "../../store/session";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
	const allSearchResults = useSelector(
		(state) => state.session.searchResults || []
	);

	const dispatch = useDispatch();
	const history = useHistory();

	const [searchTerm, setSearchTerm] = useState("");
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);

	useEffect(() => {
		if (searchTerm !== "") {
			dispatch(searchUsers(searchTerm));
		}
	}, [searchTerm, dispatch]);

	const handleChange = (event) => {
		setSearchTerm(event.target.value);
		setIsDropdownVisible(true);
		if (searchTerm === "") {
			setIsDropdownVisible(false);
		} else {
		}
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			setSearchTerm("");
			onSearch(searchTerm);
			setIsDropdownVisible(false);
		}
	};

	// handling the click on the search result
	const handleUserClick = (user) => {
		setSearchTerm("");
		onSearch(user.firstName + " " + user.lastName);
		setIsDropdownVisible(false);
		dispatch(getTargetUser(user._id)); // Dispatch the receiveTargetUser action
		history.push(`/profile/${user._id}`);
	};

	const handleClickOutside = (event) => {
		if (event.target.className !== "search-input") {
			setIsDropdownVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<div className="search-container">
			<input
				type="text"
				value={searchTerm}
				onChange={handleChange}
				onKeyPress={handleKeyPress}
				placeholder="Search..."
				className="search-input"
				onClick={() => setIsDropdownVisible(true)}
			/>
			{isDropdownVisible && (
				<div className="search-dropdown">
					{allSearchResults.map((user) => (
						<div
							key={user._id}
							className="search-result"
							onClick={() => handleUserClick(user)}
						>
							{/*  <img src={user.profileImageUrl} alt={`${user.username}'s profile`} />  */}
							<span id="bold">{user.username }</span> &nbsp;( <span id="ital"> {user.firstName} {user.lastName} </span>&nbsp;)
						</div>
					))}
				</div>
			)}
		</div>
	);
}
