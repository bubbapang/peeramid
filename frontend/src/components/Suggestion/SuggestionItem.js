import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SuggestionItem.css';
import { createLike, deleteLike } from '../../store/likes'
import { createPin, deletePin, fetchPins } from '../../store/pins';
import { updateSuggestion } from '../../store/suggestions';
import { deleteSuggestion } from '../../store/suggestions';

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

export default function SuggestionItem({ suggestion, pinIds }) {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const currentUser = useSelector(state => state.session.user);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const deleteSugg = () => {
    console.log('delete suggestion', suggestion._id);
    dispatch(deleteSuggestion(suggestion._id));
  }

  const submitEdit = () => {
    const newSuggestion = {
      id: suggestion._id,
      body: document.getElementById('update-suggestion-body').value,
      dayRating: suggestion.dayRating,
      categoryTag: suggestion.categoryTag,
    }
    dispatch(updateSuggestion(newSuggestion));
    suggestion.body = newSuggestion.body;
    toggleEditMode();
  }
  

  const likeDisplay = currentUser && currentUser.likes.includes(suggestion._id) ? "Liked" : "Like";
  const [pinDisplay, setPinDisplay] = useState(pinIds.includes(suggestion._id) ? "Pinned" : "Pin")

  const likeClick = () => {
    dispatch(createLike(suggestion._id))
  };
  const unlikeClick = () => {
    dispatch(deleteLike(suggestion._id))
  };

  const pinClick = () => {
    dispatch(createPin(suggestion, currentUser._id))
    setPinDisplay("Pinned");
  };
  const unpinClick = () => {
    dispatch(deletePin(suggestion._id, currentUser._id))
    setPinDisplay("Pin");
  }

  return (
    <div className="sugg-wrapper">
      <div className="sugg-item">
        <div className="sugg-item-content">
          <div className="user-emoji-container">
            <h1>{suggestion.user.username} says:</h1>
          </div>

          <div className="sugg-body">
            {editMode ? (
              <form onSubmit={updateSuggestion}> 
              <textarea id="update-suggestion-body" defaultValue={suggestion.body}></textarea>
            
              </form>
            ) : (
              suggestion.body
            )}
          </div>

          <div className="buttons-parts">
            {editMode ? (
              <>
                <button onClick={submitEdit}>
                  <i className="fas fa-save" /> Save
                </button>
                <button onClick={toggleEditMode}>
                  <i className="fas fa-times" /> Cancel
                </button>
                <button onClick={deleteSugg}>
                  <i className="fas fa-trash" /> Delete
                </button>
              </>
            ) : (
              <>
                <button onClick={likeDisplay === "Like" ? likeClick : unlikeClick}>
                  <i className="fas fa-heart" /> {likeDisplay} ({suggestion.likes.length})
                </button>
                <button onClick={pinDisplay === "Pin" ? pinClick : unpinClick}>
                  <i className="fas fa-thumbtack" /> {pinDisplay} ({suggestion.pins.length})
                </button>
                {currentUser && currentUser._id === suggestion.user._id && (
                <button onClick={toggleEditMode}>
                  <i className="fas fa-edit" /> Edit
                </button>
                )}

              </>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
