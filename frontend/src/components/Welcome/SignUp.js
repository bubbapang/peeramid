import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signup } from "../../store/session";
import { clearSessionErrors } from "../../store/sessionErrors";
import ErrorMessage from "./ErrorMessage";
import "./SignUp.css";

export default function SignUp() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();
	const dispatch = useDispatch();
	const errors = useSelector((state) => state.sessionErrors);

	useEffect(() => {
		dispatch(clearSessionErrors());
	}, [dispatch]);

	let readableErrors;
	if (errors) {
		readableErrors = Object.entries(errors.errors);
		readableErrors = readableErrors.map((error) => {
			let errorType = error[0];
			let errorMessage = error[1];

			// Split and capitalize first and last names
			errorType = errorType.replace(/_/g, " ");
			errorType = errorType.replace(/\b\w/g, (l) => l.toUpperCase());

			return `${errorType}: ${errorMessage}`;
		});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		const userCredentials = {
			firstName,
			lastName,
			username,
			email,
			password,
		};
		const success = await dispatch(signup(userCredentials));

		if (success) {
			history.push("/feed");
		}
	};

	const renderFormFields = () => {
		return (
			<>
				<form onSubmit={handleSubmit}>
					<label>
						First Name:
						<input
							type="text"
							name="firstName"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</label>

					<label>
						Last Name:
						<input
							type="text"
							name="lastName"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</label>

					<label>
						Username:
						<input
							type="text"
							name="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</label>

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
				</form>
			</>
		);
	};

    return (
        <div className="form-container signup-form">
            <h2>Sign Up Form</h2>

            <form onSubmit={handleSubmit}>
                {/* Display errors right before the form fields */}
                {readableErrors &&
                    readableErrors.map((error, idx) => (
                        <ErrorMessage key={idx} message={error} />
                    ))}
                {renderFormFields()}

                <div className="signup-buttons">
                    <input type="submit" value="Signup" />
                </div>
            </form>
        </div>
    );
}