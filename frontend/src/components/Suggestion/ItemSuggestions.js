import React, { useState } from 'react';
import './IS.css';

const categoryEmojiMap = {
  Transcendence: '🌌',
  Actualization: '🌟',
  Aesthetics: '🎨',
  Cognition: '🧠',
  Esteem: '🏆',
  Love: '❤️',
  Safety: '🔒',
  Physiology: '💪',
};

export default function ItemSuggestion({ suggestion }) {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="sugg-wrapper">
      <div className="sugg-item">
        <div className="sugg-item-content">
          <div className="user-emoji-container">
            <h1>{suggestion.user.username} says:</h1>
          </div>

          <div className="sugg-body">
            {editMode ? (
              <textarea className="textarea-edit" defaultValue={suggestion.body}></textarea>
            ) : (
              suggestion.body
            )}
          </div>

          <div className="buttons-parts">
            {editMode ? (
              <>
                <button onClick={toggleEditMode}>
                  <i className="fas fa-save" /> Save
                </button>
                <button onClick={toggleEditMode}>
                  <i className="fas fa-times" /> Cancel
                </button>
              </>
            ) : (
              <>
                <button>
                  <i className="fas fa-heart" /> Like
                </button>
                <button>
                  <i className="fas fa-thumbtack" /> Pin
                </button>
                <button onClick={toggleEditMode}>
                  <i className="fas fa-edit" /> Edit
                </button>
              </>
            )}
          </div>
          <div className="emoji">{categoryEmojiMap[suggestion.category]}</div>
        </div>
      </div>
    </div>
  );
}

