import './ItemSuggestion.css';

const categoryEmojiMap = {
  'Transcendence': '🌌',
  'Actualization': '🌟',
  'Aesthetics': '🎨',
  'Cognition': '🧠',
  'Esteem': '🏆',
  'Love': '❤️',
  'Safety': '🔒',
  'Physiology': '💪',
};

export default function ItemSuggestion({ suggestion }) {
  return (
    <div className="suggestion-item">
      <div className="suggestion-item-content">
        <h1>{suggestion.user.username} says: </h1>
         <div className="suggestion-body">
        <br/>
          {suggestion.body} 
          </div>

          <div className="emoji">
            {categoryEmojiMap[suggestion.category]}  
          </div>

      </div>
    </div>
  );
}
