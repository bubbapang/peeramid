import React, { useState, useEffect } from "react";
import "./ErrorMessage.css";

const ErrorMessage = ({ message }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 100000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return visible ? (
        <div className="error-message">
            {message}
        </div>
    ) : null;
};

export default ErrorMessage;
