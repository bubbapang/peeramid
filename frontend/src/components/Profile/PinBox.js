import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPins } from "../../store/pins";
import { fetchLikes } from "../../store/likes";
import PinItem from "./PinItem";
import "./PinBox.css";

export default function PinBox({ finalUser, user }) {
	const dispatch = useDispatch();

	const pins = useSelector((state) => state.pins);
	const likes = useSelector((state) => state.likes);

	useEffect(() => {
		if (finalUser && finalUser._id) {
			dispatch(fetchPins(finalUser._id));
			dispatch(fetchLikes(finalUser._id));
		}
	}, [dispatch, finalUser]);

	if (pins) {
		if (Object.values(pins).length > 0) {
			return (
				<div className="pins">
					{Object.values(pins).map((object, idx) => (
						<PinItem
							key={idx}
							suggestion={object}
							likes={likes}
							userPins={user.pins}
							isProfileSelf={finalUser._id === user._id}
						/>
					))}
				</div>
			);
		} else {
			return (
				<div className="pins">
					<h1 id="pin-banner">
						Head to the&nbsp;{" "}
						<Link to="/suggestions">
							<span id="sugg-prof-button">
								<em>suggestions</em>
							</span>
						</Link>
						&nbsp;page to pin suggestion
					</h1>
				</div>
			);
		}
	}
}
