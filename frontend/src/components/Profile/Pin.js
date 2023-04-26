// import react dependencies
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// store tings
import { fetchPins } from "../../store/pins";
import { fetchLikes } from "../../store/likes";

// importing pin item
import PinItem from "./PinItem";

// css
import "./Pin.css";

// pin component
export default function Pin({ finalUser, sessionUser }) {
	// set up dispatch
	const dispatch = useDispatch();

	// get current user, pins, and likes from the store
	const user = finalUser;

	const pins = useSelector((state) => state.pins);
	const likes = useSelector((state) => state.likes);

	useEffect(() => {
		if (user && user._id) {
			dispatch(fetchPins(user._id));
			dispatch(fetchLikes(user._id));
		}
	}, [dispatch, user]);

	if (pins) {
		if (Object.values(pins).length > 0) {
			return (
				<div className="pins">
					{Object.values(pins).map((object, idx) => (
						<PinItem
							key={idx}
							suggestion={object}
							likes={likes}
							sessionUserPins={sessionUser.pins}
							isProfileSelf={user._id === sessionUser._id}
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
