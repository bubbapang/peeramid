// importing react dependencies
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// importing chart data
import {
	getLineChartData,
	getLineChartOptions,
	getRadarChartData,
	getRadarChartOptions,
} from "./chartData";

// import store stuff
import { fetchUserRatings, getRatings } from "../../store/ratings";
import { createFollow, deleteFollow } from "../../store/follows";

// import the top and bottom components
import Top from "./top";
import Bottom from "./bottom";

// css
import "./Profile.css";

// start of Profile component
export default function Profile() {
	// set up state
	const [lineData, setLineData] = useState({ labels: [], datasets: [] });
	const [radarData, setRadarData] = useState({ labels: [], datasets: [] });
	const [lineOptions, setLineOptions] = useState({});
	const [radarOptions, setRadarOptions] = useState({});

	const [isLoading, setIsLoading] = useState(true);

	// set up dispatch
	const dispatch = useDispatch();

	// get the target user id from the url
	// const targetUserId = useParams().userId;

	// get current user and ratings from the store
	const user = useSelector((state) => state.session.user);
	const targetUser = useSelector((state) => state.session.targetUser);

	// final user
	const finalUser = targetUser ? targetUser : user;

	// get the pertinent ratings from the store, be it the current user's or the target user's
	const ratings = useSelector(getRatings);

	// fetch target user ratings or current user ratings
	// Fetch user ratings
	// Fetch user ratings
	useEffect(() => {
		// why am I trying to fetch for the target user from the backend?
		// dispatch();
		dispatch(fetchUserRatings(finalUser._id));
	}, [dispatch, finalUser]);

	// Update chart data and options
	useEffect(() => {
		if (finalUser) {
			setIsLoading(false);
		}

		const lineChartData = getLineChartData(ratings);
		const radarChartData = getRadarChartData(ratings);
		const lineChartOptions = getLineChartOptions();
		const radarChartOptions = getRadarChartOptions();

		setLineData(lineChartData);
		setRadarData(radarChartData);
		setLineOptions(lineChartOptions);
		setRadarOptions(radarChartOptions);
	}, [ratings, finalUser]);

	// setup sorted ratings
	const sortedRatings = ratings
		.slice()
		.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // sorting by date to make the finaluser's ratings LIFO

	// init the top and bottom functions.
	// extract these to their own components at a later point, as this file is getting too big: 400+ lines

	if (isLoading) {
		return <div>Loading...</div>;
	}

	// render the page
	return (
		<div className="profile-page">
			{Top({
				user,
				targetUser,
				finalUser,
				sortedRatings,
				followUser: createFollow,
				unfollowUser: deleteFollow,
				// Add any other necessary properties and functions for the top function
			})}
			{Bottom({
				finalUser,
				radarData,
				radarOptions,
				lineData,
				lineOptions,
				sortedRatings,
				// Add any other necessary properties and functions for the bottom function
			})}
		</div>
	);
}
