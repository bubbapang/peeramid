import React from 'react';
import PinItem from './PinItem';
import './Pin.css';
import Suggestion from '../Suggestion';
import ItemSuggestions from '../Suggestion/ItemSuggestions';


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
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,',
    'hi'
  ];
  
  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  function generateReviews() {
    const suggestions = [];
  
    for (let i = 1; i <= 10; i++) {
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
  

export default function Pin() {
    
    

    return (
        <div className="pins">
            {
                suggestions.map((suggestion) => (
                    <ItemSuggestions key={suggestion.id} suggestion={suggestion} />
                ))

            }
        </div>
    )
}
