import { Link } from "react-router-dom";
import { Line, Radar } from "react-chartjs-2";

import { React, useEffect, useState } from "react";

import {
	getLineChartData,
	getLineChartOptions,
	getRadarChartData,
	getRadarChartOptions,
} from "./chartData";

import FeedItem from "../Feed/FeedItem";
import Pin from "./Pin";

export default function Bottom({
	finalUser,
    sortedRatings,
	isProfileSelf,
    sessionUser,
    ratings,
}) {

	const [lineData, setLineData] = useState({ labels: [], datasets: [] });
	const [radarData, setRadarData] = useState({ labels: [], datasets: [] });
	const [lineOptions, setLineOptions] = useState({});
	const [radarOptions, setRadarOptions] = useState({});

    // Update chart data and options

	useEffect(() => {

		const radarChartData = getRadarChartData(ratings);
		const lineChartData = getLineChartData(ratings);
		const radarChartOptions = getRadarChartOptions();
		const lineChartOptions = getLineChartOptions();

		setRadarData(radarChartData);
		setLineData(lineChartData);
		setRadarOptions(radarChartOptions);
		setLineOptions(lineChartOptions);
	}, [ratings, finalUser]);

	const renderRatingsList = () => {
		if (sortedRatings.length > 0) {
			return sortedRatings.map((rating, idx) => (
				<FeedItem key={idx} rating={rating} idx={idx} />
			));
		}
		return (
			<div className="no-ratings">
				<h2 className="no-rating-heading">No ratings yet!</h2>
				<Link to="/rating" className="no-decor">
					<div className="no-rating-nav">
						Click to add your first rating on Today's page
					</div>
				</Link>
			</div>
		);
	};

	return (
		<div className="bottom">
			<div className="charts-container">
				<div className="radar-chart-container">
					<Radar data={radarData} options={radarOptions} />
					<div className="suggestions">
						<Pin
							finalUser={finalUser}
							isProfileSelf={isProfileSelf}
                            sessionUser={sessionUser}
						/>
					</div>
				</div>
				<div className="line-chart-container">
					<Line data={lineData} options={lineOptions} />
				</div>
				<div className="ratings">
					<div className="ratings-list">{renderRatingsList()}</div>
				</div>
			</div>
		</div>
	);
}
