import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchUsers } from '../../store/session';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
    const allSearchResults = useSelector(state => state.session.searchResults);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        dispatch(searchUsers(event.target.value));
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