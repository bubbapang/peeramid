// import dependencies
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchUsers } from "../../store/session";
import { useHistory } from "react-router-dom";
import { setTargetUser } from "../../store/session";
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

	// using the useEffect hook to dispatch the searchUsers action creator
	useEffect(() => {
		if (searchTerm !== "") {
			dispatch(searchUsers(searchTerm));
		}
	}, [searchTerm, dispatch]);

	// handling the change in the input field
	const handleChange = (event) => {
		setSearchTerm(event.target.value);
		if (searchTerm === "") {
			setIsDropdownVisible(false);
		} else {
			setIsDropdownVisible(true);
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
		console.log("just set the target user")
		history.push(`/profile/${user._id}`);
	};

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
			/>
			{isDropdownVisible && (
				<div className="search-dropdown">
					{allSearchResults.map((user) => (
						<div
							key={user._id}
							className="search-result"
							onClick={() => handleUserClick(user)}
						>
							{user.firstName} {user.lastName}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
