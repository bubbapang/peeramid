import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import "./Welcome.css";

export default function Welcome() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const history = useHistory();
	const currentUser = useSelector((state) => state.session.user);
	const errors = useSelector((state) => state.errors.session);

	let objectErrors;
	if (errors) {
		objectErrors = Object.values(errors);
	}

	// const firstError = Object.values(errors)[0] || null;
	// if (errors) alert(firstError);

	const handleDemo = (e) => {
		e.preventDefault();
		const demoCredentials = {
			email: "demo@user.io",
			password: "password",
		};
		dispatch(login(demoCredentials));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const userCredentials = {
			email,
			password,
		};

		dispatch(login(userCredentials));
	};

	useEffect(() => {
		if (currentUser) {
			history.push("/feed");
		}
	}, [currentUser, history]);

	return (
		<div className="background">
			<div className="welcome-modal">
				<div className="welcome-form">
					<h1 id="title">Peeramid</h1>
					<div className="fas fa-user-circle fa-6x" />

					{objectErrors &&
						objectErrors.map((error, idx) => (
							<div key={idx} className="error-message">
								{error}
							</div>
						))}

					<form onSubmit={handleSubmit}>
						<div className="login-box"></div>
						<label>
							Email:
							<input
								type="text"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</label>
						<label>
							Password:
							<input
								type="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</label>
						<div className="welcome-buttons">
							<button>Login</button>
							<NavLink to="/signup">
								<button>Signup</button>
							</NavLink>
							<button onClick={handleDemo}>Demo</button>
						</div>
					</form>
				</div>
				<div className="welcome-image" />
			</div>
		</div>
	);
}
