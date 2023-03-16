import React from 'react';
import './Sidebar.css';

function Sidebar({ setFilter }) {
  const buttons = [
    { label: "All Suggestions", emoji: "🔎" },
    { label: "Transcendence", emoji: "🌌" },
    { label: "Actualization", emoji: "🌟" },
    { label: "Aesthetics", emoji: "🎨" },
    { label: "Cognition", emoji: "🧠" },
    { label: "Esteem", emoji: "🏆" },
    { label: "Love", emoji: "❤️" },
    { label: "Safety", emoji: "🔒" },
    { label: "Physiology", emoji: "💪" },
  ];

  return (
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
  );
}

export default Sidebar;
