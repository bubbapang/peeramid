import React from "react";
import { useClickOutside } from "./useClickOutside";
import "./InfoModal.css";

const InfoModal = ({ infoRef, onClose }) => {
    const ref = React.useRef();
    useClickOutside(ref, onClose);

    return (
        <div className="modal">
					<div className="modal-content" ref={infoRef}>
						<h3>
							Maslow's extended Hierarchy of Needs builds upon his
							initial five-tier model, which includes:
							<br />
							<p></p>
							&nbsp;&#x2022;
							<span className="phys"> physiology</span> - food,
							shelter, clothing, etc.
							<br />
							&nbsp;&#x2022;
							<span className="safety"> safety</span> - security,
							health, employment
							<br />
							&nbsp;&#x2022;
							<span className="love"> love/belonging</span> -
							emotional intimacy
							<br />
							&nbsp;&#x2022;
							<span className="esteem"> esteem</span> -
							self-respect and independence
							<br />
							&nbsp;&#x2022;
							<span className="act"> self-actualization</span> -
							reaching one's full potential
							<br />
							<br />
							In the extended version, Maslow added three more
							levels:
							<br />
							<p></p>
							&nbsp;&#x2022;
							<span className="cog"> cognitive</span> - cognition
							and understanding
							<br />
							&nbsp;&#x2022;
							<span className="aes"> aesthetic</span> - beauty and
							order
							<br />
							&nbsp;&#x2022;
							<span className="trans"> transcendence</span> - the
							highest level, helping others achieve
							self-actualization
							<br />
							<br />
							The extended hierarchy offers a more comprehensive
							view of human motivation, emphasizing the pursuit of
							cognition, appreciation of beauty, and the desire to
							help others grow.
						</h3>
                        <button onClick={onClose}>Close</button>
					</div>
				</div>
    );
};

export default InfoModal;