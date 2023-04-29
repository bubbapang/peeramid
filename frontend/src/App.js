import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { getCurrentUser } from "./store/session";
import Login from "./components/Welcome/Login";
import Navigation from "./components/Navigation";
import Feed from "./components/Feed";
import Suggestion from "./components/Suggestion";
import Rating from "./components/Rating";
import SignUp from "./components/Welcome/SignUp";
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
					<Route exact path="/" component={Login} />
					<Route exact path="/signup" component={SignUp} />
					<Route path="/">
						<Navigation />
						<Route path="/feed" component={Feed} />
						<Route path="/suggestions" component={Suggestion} />
						<Route path="/rating" component={Rating} />
						<Route path="/profile" component={Profile} />
					</Route>
				</Switch>
			</>
		)
	);
}
export default App;
