import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import "./Welcome.css";

export default function Welcome() {
	const [showLogin, setShowLogin] = useState(true);

	const toggleForm = (form) => {
		setShowLogin(form === "login");
	};

    return (
        <div className="background">
            <div className="welcome-modal">
                <div className="welcome-form">
                    <div className="top">
                        <h1 id="title">Peeramid</h1>
                        <div className="toggle-form">
                            <button
                                className={`toggle-btn ${
                                    showLogin ? "active" : ""
                                }`}
                                onClick={() => toggleForm("login")}
                            >
                                Login
                            </button>
                            <button
                                className={`toggle-btn ${
                                    !showLogin ? "active" : ""
                                }`}
                                onClick={() => toggleForm("signup")}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                    {showLogin ? <Login /> : <SignUp />}
                </div>
                <div className="welcome-image" />
            </div>
        </div>
    );
}
