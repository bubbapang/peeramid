import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchUsers } from "../../store/session";
import { useHistory } from "react-router-dom";

import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
    const allSearchResults = useSelector(
        (state) => state.session.searchResults || []
    );    

    console.log(allSearchResults)

	const dispatch = useDispatch();
    const history = useHistory();

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);

	useEffect(() => {
        if (searchTerm === "") {
            setSearchResults([]);
            return;
        }
		setSearchResults(allSearchResults);
	}, [allSearchResults]);

	const handleChange = (event) => {
		setSearchTerm(event.target.value);
        setIsDropdownVisible(true);
        dispatch(searchUsers(event.target.value));
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
            setSearchTerm("");
            setIsDropdownVisible(false);
            onSearch(searchTerm);
        }
	};

    const handleUserClick = (user) => {
        console.log(user)
        setSearchTerm(user.firstName + " " + user.lastName);
        setIsDropdownVisible(false);
        onSearch(user.firstName + " " + user.lastName);
        history.push(`/profile/${user._id}`);
    };
    

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
                    {searchResults.map((user) => (
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
