import React from "react";
import Need from "./Need";
import "./NeedList.css";

const NeedList = ({ names, colors, widths, ratings, onRatingChange }) => {
	return (
        <div className="need-list">
            {names.map((name, idx) => {
                const color = colors[idx];
                const width = widths[idx];
                const rating = ratings[idx];
                return (
                    <Need
                        key={idx}
                        name={name}
                        presetRating={rating}
                        color={color}
                        width={width}
                        onRatingChange={onRatingChange}
                    />
                );
            })}
        </div>
    );
};

export default NeedList;
