import React, { useEffect, useState } from "react";
import "./Need.css";

export default function Need({
	name,
	presetRating,
	color,
	width,
	onRatingChange,
	onNeedHover,
	onNeedLeave,
}) {

	const buttonColors = [
		"#b76935",
		"#a56336",
		"#935e38",
		"#815839",
		"#6f523b",
		"#5c4d3c",
		"#4a473e",
		"#38413f",
		"#263c41",
		"#143642",
	];
	const reversedButtonColors = buttonColors.reverse();
	const [hoveredButton, setHoveredButton] = useState(-1);
	const [rating, setRating] = useState(presetRating);

	useEffect(() => {
		setRating(presetRating);
	}, [presetRating]);

	const handleClick = (e) => {
		e.preventDefault();
		const buttonNumber = e.target.innerText;
		setRating(buttonNumber);
		onRatingChange(name, buttonNumber); // Call the function passed from the parent
	};

	const handleMouseEnter = (e) => {
		onNeedHover(name);
	};

	return (
		<div
			className="container"
			onMouseEnter={() => handleMouseEnter()}
			onMouseLeave={onNeedLeave}
		>
			<div
				className="need"
				style={{ backgroundColor: color, width: `${width}px` }}
			>
				<h1>{rating}</h1>
				<h1 className="middle">{name}</h1>
			</div>
			<div className="buttons">
				{reversedButtonColors.map((buttonColor, idx) => {
					return (
						<button
							id={name}
							onClick={handleClick}
							key={idx}
							style={{
								backgroundColor:
									idx === hoveredButton
										? "#1A1A1A"
										: buttonColor,
							}}
							onMouseEnter={() => setHoveredButton(idx)}
							onMouseLeave={() => setHoveredButton(-1)}
						>
							{idx + 1}
						</button>
					);
				})}
			</div>
		</div>
	);
}
