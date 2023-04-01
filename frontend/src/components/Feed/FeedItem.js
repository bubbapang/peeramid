import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRating } from "../../store/ratings";
import { format } from "date-fns";
import Chart from "chart.js/auto";
import "./FeedItem.css";
import { FormDrawer } from "./FormDrawer";

export default function FeedItem({ rating, idx }) {
	// const [showFormDrawer, setShowFormDrawer] = useState(true);
	// const [formDrawerClosing, setFormDrawerClosing] = useState(false);
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

	// upon mounting
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

	// upon mounting
	useEffect(() => {
		// setting up background colors for the chart
		const backgroundColors = [
			"rgba(255, 99, 32, 0.8)",
			"rgba(75, 192, 192, 0.8)",
			"rgba(255, 206, 86, 0.8)",
			"rgba(153, 102, 255, 0.8)",
			"rgba(54, 162, 235, 0.8)",
			"rgba(201, 203, 07, 0.8)",
			"rgba(255, 159, 64, 0.8)",
			"rgba(255, 99, 132, 0.8)",
		];

		// if the chart exists, destroy it
		if (chartRef.current) chartRef.current.destroy();

		// get the canvas element
		const chartCanvas = document.getElementById(`chart-${idx}`);

		// create the scores array
		const scores = [
			rating.physiological,
			rating.safety,
			rating.love,
			rating.esteem,
			rating.knowledge,
			rating.aesthetics,
			rating.actualization,
			rating.transcendance,
		];

		// create the chart colors array
		const chartColors = backgroundColors.slice(0, scores.length);

		// create the chart config
		const chartConfig = {
			type: "doughnut",
			data: {
				labels: [
					"Physiology",
					"Safety",
					"Love",
					"Esteem",
					"Cognition",
					"Aesthetics",
					"Actualization",
					"Transcendence",
				],
				datasets: [
					{
						label: "",
						data: scores,
						fill: true,
						backgroundColor: chartColors,
						borderColor: chartColors,
					},
				],
			},
			options: {
				onHover: (event, chartElement) => {
					if (chartElement[0]) {
						chartCanvas.style.cursor = "pointer";
					} else {
						chartCanvas.style.cursor = "default";
					}
				},
				onClick: (event, elements) => {
					if (elements.length > 0) {
						const clickedElementIndex = elements[0].index;
						const clickedLabelText =
							chartConfig.data.labels[clickedElementIndex];
						toggleFormDrawer(clickedLabelText);
					}
				},
				cutout: "55%",
				plugins: {
					legend: { display: false },
					tooltip: {
						callbacks: {
							label: (context) =>
								`${
									chartConfig.data.labels[context.dataIndex]
								}: ${
									chartConfig.data.datasets[0].data[
										context.dataIndex
									]
								}`,
						},
						position: "nearest",
						backgroundColor: "rgba(0, 0, 0, 0.8)",
						titleFont: { size: 14 },
						bodyFont: { size: 14 },
						padding: 10,
						zIndex: 10000,
					},
					hover: { mode: "nearest", intersect: true },
				},
			},
		};

		// function to toggle the form drawer
		const toggleFormDrawer = (clickedLabelText) => {
			if (clickedLabelText !== activeDiv) {
				setActiveDiv(clickedLabelText);
				setFormDrawerVisible(true);
				setClickedLabel(clickedLabelText);
			} else {
				setActiveDiv(null);
				setFormDrawerVisible(false);
				setClickedLabel(null);
			}
		};

		// create the chart
		chartRef.current = new Chart(chartCanvas, chartConfig);
	}, [rating, chartRef, idx, activeDiv]);

	const formatDate = (timestamp) => {
		return format(new Date(timestamp), "MMMM dd, yyyy");
	};

	return (
		<div className="feed-item-container">
			{showSuccessBanner && (
				<div className="success-banner">
					<p>Your suggestion has been submitted successfully! </p>{" "}
					&nbsp; &nbsp;
					<br></br>
					<button
						className="close-success-banner"
						onClick={() => setShowSuccessBanner(false)}
					>
						×
					</button>
					<div className="loading-bar-container">
						<div className="loading-bar"></div>
					</div>
				</div>
			)}

			{showDeleteSuccessBanner && (
				<div
					className="delete-success-banner"
					style={{ backgroundColor: "red" }}
				>
					<p>Your rating has been deleted successfully! </p> &nbsp;
					&nbsp;
					<br></br>
					<button
						className="close-delete-success-banner"
						onClick={() => setShowDeleteSuccessBanner(false)}
					>
						×
					</button>
					<div className="loading-bar-container">
						<div className="loading-bar"></div>
					</div>
				</div>
			)}

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
					{rating.highlights ? (
						<>
							<h2>
								<span id="username">
									{" "}
									{rating.user.username} 's{" "}
								</span>{" "}
								highlight today was:
							</h2>
							<br></br>
							<p> {rating.highlights} </p>
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
					{rating.lowlights ? (
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
							{rating.lowlights}
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
