import './Suggestion.css';
import Sidebar from './Sidebar';
import ItemSuggestions from './ItemSuggestions';
import { useState } from 'react';


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
  
  const bodySamples = [
    'I think you should try thisooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
    'Have you considered doing this?oooooooooooooooooooooooooo',
    'This could be a great option for youooooooooooooooooooo',
    'Maybe give this a shotooooooooooooooooooooooooo',
    'This is worth exploringoooooooooooooooooooooooooo',
    'I believe this could help youooooooooooooooooooooooo',
    'This might be a good ideaooooooooooooooooooooooooooooooooooooooooo',
    'Why not try this out?ooooooooooooooooooooooooooooooo',
    'You should give this a g0000000000000000000000000o',
    'Check this outcdjschsduvhuisvksvgkysgviygvyigisvuy',
  ];
  
  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  function generateReviews() {
    const suggestions = [];
  
    for (let i = 1; i <= 500; i++) {
      suggestions.push({
        id: i,
        user: {
          id: i,
          username: `user${i}`,
          profilePic:
            'https://www.pngfind.com/download/hJmwxix_image-placeholder-png-user-profile-placeholder-image-png/',
        },
        body: getRandomElement(bodySamples),
        category: getRandomElement(categories),
      });
    }
  
    return suggestions;
  }
  
  const suggestions = generateReviews();
  

export default function Suggestion() {
    const [filter, setFilter] = useState('All Suggestions');

    const filteredSuggestions = filter === 'All Suggestions'
  ? suggestions
  : suggestions.filter((suggestion) => suggestion.category === filter);

    return (
        <div className="suggestion-page">
            <div className="sidebar">
            <Sidebar setFilter={setFilter} />
            </div>
            <div className="suggestion-list">
            {filteredSuggestions.map((suggestion) => (
                <ItemSuggestions key={suggestion.id} suggestion={suggestion} />
            ))}
        </div>
        </div>
    )
}
