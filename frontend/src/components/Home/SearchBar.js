// import dependencies
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// import session actions
import { setTargetUser, searchUsers } from "../../store/session";

// css
import "./SearchBar.css";

// making the search bar component
export default function SearchBar({ onSearch }) {
	// getting the search results from the store
	const allSearchResults = useSelector(
		(state) => state.session.searchResults || []
	);

	// getting the dispatch function from the store and the history object from react-router-dom
	const dispatch = useDispatch();
	const history = useHistory();

	// setting up the state variables
	const [searchTerm, setSearchTerm] = useState("");
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);

	// using the useEffect hook to dispatch the searchUsers action creator when the searchTerm changes
	useEffect(() => {
		if (searchTerm !== "") {
			dispatch(searchUsers(searchTerm));
		}
	}, [searchTerm, dispatch]);

	// handling the change in the input field
	const handleChange = (event) => {
		setSearchTerm(event.target.value);
		setIsDropdownVisible(true);
		if (searchTerm === "") {
			setIsDropdownVisible(false);
		} else {
		}
	};

	// handling the key press in the input field
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
		dispatch(setTargetUser(user)); // Dispatch the setTargetUser action
		history.push(`/profile/${user._id}`);
	};

	// handling the click outside of the search bar
	const handleClickOutside = (event) => {
		if (event.target.className !== "search-input") {
			setIsDropdownVisible(false);
		}
	};

	// using the useEffect hook to add the event listener
	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	// rendering the search bar
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
							{user.username} ({user.firstName} {user.lastName})
						</div>
					))}
				</div>
			)}
		</div>
	);
}
