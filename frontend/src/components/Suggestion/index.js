import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPublicSuggestions } from '../../store/suggestions';
import SuggestionItem from './SuggestionItem';
import './Suggestion.css';
import './Sidebar.css';

export default function Suggestion() {
  const user = useSelector((state) => state.session.user);
  const suggestions = useSelector((state) => state.suggestions);
  // const [suggestionsVersion, setSuggestionsVersion] = useState(0);
  const dispatch = useDispatch();

 // make a useEffect that listens for changes in the suggestions in the state
//  const [suggestions, setSuggestions] = useState([]);

 useEffect(() => {
   // Perform any side effects you need when the suggestions state changes.
   console.log('suggestions state changed:', suggestions);
 }, [suggestions]);

  useEffect(() => {
    const handleSuggestionCreated = () => {
      dispatch(fetchAllPublicSuggestions());
    };
  
    window.addEventListener('suggestionCreated', handleSuggestionCreated);
  
    // Fetch suggestions initially
    dispatch(fetchAllPublicSuggestions());
  
    return () => {
      window.removeEventListener('suggestionCreated', handleSuggestionCreated);
    };
  }, [dispatch]);

  const categories = [
    'Transcendence',
    'Actualization',
    'Aesthetics',
    'Cognition',
    'Esteem',
    'Love',
    'Safety',
    'Physiology',
  ];

  const [filter, setFilter] = useState('All Suggestions');

  const buttons = [
    { label: 'All Suggestions', emoji: '🔎' },
    { label: 'Transcendence', emoji: '🌌' },
    { label: 'Actualization', emoji: '🌟' },
    { label: 'Aesthetics', emoji: '🎨' },
    { label: 'Cognition', emoji: '🧠' },
    { label: 'Esteem', emoji: '🏆' },
    { label: 'Love', emoji: '❤️' },
    { label: 'Safety', emoji: '🔒' },
    { label: 'Physiology', emoji: '💪' },
  ];

  const filteredSuggestions =
    filter === 'All Suggestions'
      ? suggestions
      : suggestions.filter((suggestion) => suggestion.categoryTag === filter);


  return (
    <div className="suggestion-page">
      <div className="sidebar">
        {buttons.map((button, index) => (
          <button
            key={index}
            className="sidebar-button"
            title={button.label}
            onClick={() => setFilter(button.label)}
          >
            {button.emoji} {button.label}
          </button>
        ))}
      </div>
      <div className="suggestion-list">
        {Object.values(filteredSuggestions).map((suggestion, idx) => (
          <SuggestionItem key={idx} suggestion={suggestion} />
        ))}
      </div>
    </div>
  );

}
