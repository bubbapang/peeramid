import React from "react";
import { useClickOutside } from "./useClickOutside";
import "./LightModal.css";

const LightModal = ({ buttonText, value, setValue, show, setShow, onClose}) => {
	const ref = React.useRef();
	useClickOutside(ref, onClose);

	return (show && (
		<div className="modal">
			<div className="modal-content" ref={ref}>
				<h3>{buttonText}</h3>
				<textarea
					type="text"
					value={value}
					onChange={(e) => {
						setValue(e.target.value)
					}}
					style={{ width: "300px", height: "50px" }}
				/>
				<button onClick={() => setShow(false)}>Ok</button>
			</div>
		</div>
	));
};

export default LightModal;
