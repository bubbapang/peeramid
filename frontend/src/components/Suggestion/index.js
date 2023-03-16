import './Suggestion.css';
import Sidebar from './Sidebar';
import ItemSuggestions from './ItemSuggestions';
import { useState } from 'react';
import Pin from '../Profile/Pin';
import PinItem from '../Profile/PinItem';


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
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu,',
    'Have you considered doing this?ooooooooooooooooooooooooooI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try this',
    'This could be a great option for youoooooooooooooooooooI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try this',
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
  
    for (let i = 1; i <= 50; i++) {
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
