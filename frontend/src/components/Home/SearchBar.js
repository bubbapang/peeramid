import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch, users }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);

        const filteredResults = users.filter((user) =>
        user.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setSearchResults(filteredResults);
        setIsDropdownVisible(true);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
        onSearch(searchTerm);
        }
    };

    const handleUserClick = (user) => {
        setSearchTerm(user);
        setIsDropdownVisible(false);
        onSearch(user);
    };

    return (
        <div className="search-container">
            <input type="text" value={searchTerm} onChange={handleChange} onKeyPress={handleKeyPress} placeholder="Search..." className="search-input" />
            {isDropdownVisible && searchResults.length > 0 && (
                <div className="search-dropdown">
                    {searchResults.map((user) => (<div key={user} className="search-result" onClick={() => handleUserClick(user)}>{user}</div>))}
                </div>
            )}
        </div>
    );
}