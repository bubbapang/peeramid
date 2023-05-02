import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTargetUser } from "../../store/session";
import { fetchUserRatings, getRatings } from "../../store/ratings";
import Top from "./Top";
import Middle from "./Middle";
import Bottom from "./Bottom";
import "./Profile.css";

export default function Profile() {
	const dispatch = useDispatch();
	const pins = useSelector((state) => state.pins);

	const user = useSelector((state) => state.session.user);
	const ratings = useSelector(getRatings);

	const targetUserId = useParams().userId;
	const targetUser = useSelector((state) => state.session.targetUser);

	const finalUser = targetUser ? targetUser : user;

	const isProfileSelf = user && finalUser && user._id === finalUser._id;

	const sortedRatings = ratings
		.slice()
		.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (targetUserId) {
			dispatch(getTargetUser(targetUserId));
		}
	}, [dispatch, targetUserId]);

	useEffect(() => {
		async function fetchData() {
			if (targetUserId) {
				await dispatch(fetchUserRatings(targetUserId));
			} else if (finalUser) {
				await dispatch(fetchUserRatings(finalUser._id));
			}
				setLoading(false);
		}
		fetchData();
	}, [dispatch, finalUser, targetUserId, pins]);

	return (
		<div className="profile-page">
			{loading ? (
				<div className="loading-screen">
					<div className="loading-spinner"></div>
				</div>
				) : (
				user &&
				finalUser && (
					<>
						<Top
							user={user}
							finalUser={finalUser}
							ratingsLength={sortedRatings.length}
						/>
						<Middle
							user={user}
							finalUser={finalUser}
							isProfileSelf={isProfileSelf}
							ratings={ratings}
						/>
						<Bottom sortedRatings={sortedRatings} />
					</>
				)
			)}
		</div>
	);
}
