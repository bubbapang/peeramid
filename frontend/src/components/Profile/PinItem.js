import React from "react";
import "./PinItem.css";

export default function PinItem({suggestion}) {
    return (
        <div className="pin-item">
            <div className="profile-part">
                <i className="fas fa-user-circle fa-2x" />
            </div>
            <div className="suggestion-part">
                <h1>{suggestion}</h1>
            </div>
            <div className="buttons-part">
                <button>
                    <i className="fas fa-heart" /> Like
                </button>
                <button>
                    <i className="fas fa-thumbtack" /> Pin
                </button>
            </div>
        </div>
    );
}
