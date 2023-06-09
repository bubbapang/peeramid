import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { getCurrentUser } from "./store/session";
import Welcome from "./components/Welcome";
import Navigation from "./components/Navigation";
import Feed from "./components/Feed";
import Suggestion from "./components/Suggestion";
import Rating from "./components/Rating";
import Profile from "./components/Profile";

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCurrentUser()).then(() => setLoaded(true));
	}, [dispatch]);

	return (
		loaded && (
			<>
				<Switch>
					<Route exact path="/" component={Welcome} />
					<Route path="/">
						<Navigation />
						<Route path="/profile" component={Profile} />
						<Route path="/rating" component={Rating} />
						<Route path="/feed" component={Feed} />
						<Route path="/suggestions" component={Suggestion} />
					</Route>
				</Switch>
			</>
		)
	);
}
export default App;
