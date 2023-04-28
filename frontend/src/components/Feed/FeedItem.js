import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRating } from "../../store/ratings";
import { format } from "date-fns";
import Chart from "chart.js/auto";
import { FormDrawer } from "./FormDrawer";
import { Banner } from "./Banner";
import { getScores, createChartConfig } from "./donutData.js";

import "./FeedItem.css";

export default function FeedItem({ rating, idx }) {
	const chartRef = useRef(null);
	const [formDrawerVisible, setFormDrawerVisible] = useState(false);
	const [clickedLabel, setClickedLabel] = useState(null);
	const [activeDiv, setActiveDiv] = useState(null);
	const [showSuccessBanner, setShowSuccessBanner] = useState(false);
	const [showDeleteSuccessBanner, setShowDeleteSuccessBanner] =
		useState(false);
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.session.user);

	const handleDeleteRating = () => {
		dispatch(deleteRating(rating._id));
		setShowDeleteSuccessBanner(true);
		setTimeout(() => {
			setShowDeleteSuccessBanner(false);
		}, 4000);
	};

	const handleSuccess = () => {
		setShowSuccessBanner(true);
		setTimeout(() => {
			setShowSuccessBanner(false);
		}, 4000);
	};

	useEffect(() => {
		// if the user clicks outside of the form drawer, close it
		const handleOutsideClick = (e) => {
			if (
				formDrawerVisible &&
				!e.target.closest(".form-drawer") &&
				!e.target.closest(".highlight") &&
				!e.target.closest(".lowlight")
			) {
				setFormDrawerVisible(false);
				setActiveDiv(null);
			}
		};

		// add event listener for click outside of form drawer
		document.addEventListener("mousedown", handleOutsideClick);
		return () =>
			document.removeEventListener("mousedown", handleOutsideClick);
	}, [formDrawerVisible]);

	useEffect(() => {
		if (chartRef.current) chartRef.current.destroy();
		const chartCanvas = document.getElementById(`chart-${idx}`);
		const scores = getScores(rating);

		const toggleFormDrawer = (clickedLabelText) => {
			setActiveDiv((prevActiveDiv) => {
				if (clickedLabelText !== prevActiveDiv) {
					setFormDrawerVisible(true);
					setClickedLabel(clickedLabelText);
					return clickedLabelText;
				} else {
					setFormDrawerVisible(false);
					setClickedLabel(null);
					return null;
				}
			});
		};

		const chartConfig = createChartConfig(
			scores,
			chartCanvas,
			toggleFormDrawer
		);

		chartRef.current = new Chart(chartCanvas, chartConfig);
	}, [rating, chartRef, idx, activeDiv]);

	const formatDate = (timestamp) => {
		return format(new Date(timestamp), "MMMM dd, yyyy");
	};

	// render
	return (
		<div className="feed-item-container">
			{/* success banner */}
			{/* takes in type, show, onClose */}
			<Banner
				type="success"
				show={showSuccessBanner}
				onClose={() => setShowSuccessBanner(false)}
			></Banner>

			{/* delete success banner */}
			{/* takes in type, show, onClose */}
			<Banner
				type="delete"
				show={showDeleteSuccessBanner}
				onClose={() => setShowDeleteSuccessBanner(false)}
			></Banner>

			{/* Feed item info section */}
			<div className="feed-item-info">
				<h1 className="user-and-date">
					{" "}
					{rating.user.username} - {formatDate(rating.createdAt)}{" "}
				</h1>
				<div className="canvas-wrapper">
					<i id="profile-picture" className="fas fa-user-circle" />
					<canvas className="chart" id={`chart-${idx}`} />
				</div>
				{currentUser._id === rating.user._id && (
					<button
						className="delete-rating-button"
						onClick={handleDeleteRating}
					>
						Delete
					</button>
				)}
			</div>

			{/* Lights container section */}
			<div className="lights-container">
				{/* Highlight section */}
				<div
					className="highlight"
					// onClick={() => toggleFormDrawer('highlight')}
				>
					{rating.highlight ? (
						<>
							<h2>
								<span id="username">
									{" "}
									{rating.user.username} 's{" "}
								</span>{" "}
								highlight today was:
							</h2>
							<br></br>
							<p> {rating.highlight} </p>
						</>
					) : (
						<h2>
							<span id="username"> {rating.user.username} </span>{" "}
							had no highlight today.
						</h2>
					)}
				</div>

				{/* Lowlight section */}
				<div
					className="lowlight"
					// onClick={() => toggleFormDrawer('lowlight')}
				>
					{rating.lowlight ? (
						<>
							<h3>
								{" "}
								<span id="username">
									{" "}
									{rating.user.username} 's{" "}
								</span>{" "}
								lowlight today was:
							</h3>
							<br></br>
							{rating.lowlight}
						</>
					) : (
						<h3>
							<span id="username"> {rating.user.username} </span>{" "}
							had no lowlight today.
						</h3>
					)}
				</div>
			</div>

			{/* Form Drawer section */}
			<FormDrawer
				onClose={() => setFormDrawerVisible(false)}
				visible={formDrawerVisible}
				rating={rating}
				clickedLabel={clickedLabel}
				onSuccess={handleSuccess}
			/>
		</div>
	);
}
