import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
	createRating,
	fetchUserRatings,
	getRatings,
	updateRating,
} from "../../store/ratings";
import { setRatedToday } from "../../store/session";

import LightModal from "./LightModal";
import InfoModal from "./InfoModal";
import NeedList from "./NeedList";

import "./Rating.css";

const isSameDay = (timestamp) => {
	const date1 = new Date(timestamp);
	const date2 = new Date();
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
};

export default function Rating() {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.session.user);
	const ratings = useSelector(getRatings);
	const [samedayRating] = ratings.filter((rating) =>
		isSameDay(rating.createdAt)
	);

	const [transcendence, setTranscendence] = useState(null);
	const [actualization, setSelfActualization] = useState(null);
	const [aesthetics, setAesthetic] = useState(null);
	const [cognition, setCognition] = useState(null);
	const [esteem, setEsteem] = useState(null);
	const [love, setLove] = useState(null);
	const [safety, setSafety] = useState(null);
	const [physiology, setPhysiology] = useState(null);

	const [highlight, setHighlight] = useState("");
	const [lowlight, setLowlight] = useState("");

	const highlightRef = useRef();
	const infoRef = useRef();
	const lowlightRef = useRef();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				highlightRef.current &&
				!highlightRef.current.contains(event.target)
			) {
				setShowHighlight(false);
			}
			if (infoRef.current && !infoRef.current.contains(event.target)) {
				setShowInfo(false);
			}
			if (
				lowlightRef.current &&
				!lowlightRef.current.contains(event.target)
			) {
				setShowLowlight(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		dispatch(fetchUserRatings(currentUser._id));
	}, [dispatch, currentUser]);

	useEffect(() => {
		if (samedayRating) {
			setTranscendence(samedayRating.transcendence);
			setSelfActualization(samedayRating.actualization);
			setAesthetic(samedayRating.aesthetics);
			setCognition(samedayRating.cognition);
			setEsteem(samedayRating.esteem);
			setLove(samedayRating.love);
			setSafety(samedayRating.safety);
			setPhysiology(samedayRating.physiology);
			setHighlight(samedayRating.highlight);
			setLowlight(samedayRating.lowlight);
		}
	}, [samedayRating]);

	const handleRating = (name, rating) => {
		switch (name) {
			case "Transcendence":
				setTranscendence(rating);
				break;
			case "Actualization":
				setSelfActualization(rating);
				break;
			case "Aesthetics":
				setAesthetic(rating);
				break;
			case "Cognition":
				setCognition(rating);
				break;
			case "Esteem":
				setEsteem(rating);
				break;
			case "Love":
				setLove(rating);
				break;
			case "Safety":
				setSafety(rating);
				break;
			case "Physiology":
				setPhysiology(rating);
				break;
			default:
				break;
		}
	};

	const namesOfNeeds = [
		"Transcendence",
		"Actualization",
		"Aesthetics",
		"Cognition",
		"Esteem",
		"Love",
		"Safety",
		"Physiology",
	];

	let ratingsPreset = [
		transcendence,
		actualization,
		aesthetics,
		cognition,
		esteem,
		love,
		safety,
		physiology,
	];

	const colorsOfNeeds = [
		"#f94144",
		"#f3722c",
		"#f8961e",
		"#f9c74f",
		"#90be6d",
		"#43aa8b",
		"#4d908e",
		"#577590",
	];

	const widthsOfNeeds = [500, 600, 700, 800, 900, 1000, 1100, 1200];
	const [showHighlight, setShowHighlight] = useState(false);
	const [showInfo, setShowInfo] = useState(false);
	const [showLowlight, setShowLowlight] = useState(false);
	const history = useHistory();

	// left button click handlers
	const handleHighlightClick = () => {
		setShowHighlight(!showHighlight);
	};

	const handleInfoClick = () => {
		setShowInfo(!showInfo);
	};

	const handleLowlightClick = () => {
		setShowLowlight(!showLowlight);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(highlight, lowlight);
		const rating = {
			transcendence,
			actualization,
			aesthetics,
			cognition,
			esteem,
			love,
			safety,
			physiology,
			highlight,
			lowlight,
			userId: currentUser._id,
		};
		if (
			transcendence === null ||
			actualization === null ||
			aesthetics === null ||
			cognition === null ||
			esteem === null ||
			love === null ||
			safety === null ||
			physiology === null
		) {
			alert("Please rate all needs before submitting.");
		} else if (
			samedayRating &&
			transcendence === samedayRating.transcendence &&
			actualization === samedayRating.actualization &&
			aesthetics === samedayRating.aesthetics &&
			cognition === samedayRating.cognition &&
			esteem === samedayRating.esteem &&
			love === samedayRating.love &&
			safety === samedayRating.safety &&
			physiology === samedayRating.physiology &&
			highlight === samedayRating.highlight &&
			lowlight === samedayRating.lowlight
		) {
			alert("Please change rating before updating");
		} else if (samedayRating) {
			rating.id = samedayRating._id;
			rating.highlight = highlight;
			rating.lowlight = lowlight;
			dispatch(updateRating(rating));
			dispatch(setRatedToday(true));
			history.push("/profile");
		} else {
			dispatch(createRating(rating));
			dispatch(setRatedToday(false));
			history.push("/profile");
		}
	};

	return (
		<div className="today">
			<div className="left-side">
				<button className="highlight" onClick={handleHighlightClick}>
					Highlight
				</button>
				<button className="info" onClick={handleInfoClick}>
					Info
				</button>
				<button className="lowlight" onClick={handleLowlightClick}>
					Lowlight
				</button>
			</div>
			<LightModal
				buttonText={"Highlight"}
				value={highlight}
				setValue={setHighlight}
				show={showHighlight}
				setShow={setShowHighlight}
				onClose={() => setShowHighlight(false)}
			/>
			{showInfo && (
				<InfoModal
					infoRef={infoRef}
					onClose={() => setShowInfo(false)}
				/>
			)}
			<LightModal
				buttonText={"Lowlight"}
				value={lowlight}
				setValue={setLowlight}
				show={showLowlight}
				setShow={setShowLowlight}
				onClose={() => setShowLowlight(false)}
			/>
			<NeedList
				names={namesOfNeeds}
				ratings={ratingsPreset}
				colors={colorsOfNeeds}
				widths={widthsOfNeeds}
				onRatingChange={handleRating}
			/>
			<button className="submit" onClick={handleSubmit}>
				{samedayRating ? "Update" : "Submit"}
			</button>
		</div>
	);
}
