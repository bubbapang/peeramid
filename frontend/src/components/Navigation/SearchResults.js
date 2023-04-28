import React from 'react';
import './SearchResults.css';

function SearchResults({ searchResults }) {
    return (
    <div className="search-results-container">
        {searchResults.map((user) => (
        <div key={user} className="search-result-item">
            {user}
        </div>
        ))}
    </div>
    );
}

export default SearchResults;
