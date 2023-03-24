import { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import "./FeedItem.css";
import { useDispatch } from "react-redux";
import { createSuggestion } from "../../store/suggestions";

function FormDrawer({
  onClose,
  visible,
  closing,
  rating,
  clickedLabel,
  onSuccess,
}) {
  const dispatch = useDispatch();

  const submitSuggestionForm = async (e) => {
    e.preventDefault();
    const newSuggestion = {
      body: document.getElementById("suggestion_body").value,
      dayRating: rating._id,
      categoryTag: clickedLabel,
    };

    await dispatch(createSuggestion(newSuggestion, rating._id));
    const suggestionCreatedEvent = new CustomEvent("suggestionCreated");
    window.dispatchEvent(suggestionCreatedEvent);

    onSuccess();

    onClose();
  };

  return (
    <div
      className={`form-drawer${visible ? " visible" : ""}${
        closing ? " closing" : ""
      }`}
    >
      <button className="close-button" onClick={onClose}>
        Close
      </button>
      <h2>{rating.user.username}</h2>
      {/* Your form content goes here */}
      <div className="form-drawer-content">
        {/* input text box and label to send a suggestion */}
        <div className="form-drawer-input">
          <label htmlFor="suggestion">Suggestion</label>
          <button>
            {" "}
            You are submitting a suggestion based on the user's:{" "}
            <span id="label">{clickedLabel} </span>{" "}
          </button>
          <br></br>
          <br></br>
          <input
            type="text"
            id="suggestion_body"
            name="suggestion"
            placeholder="Enter a suggestion"
          />
          <button className="form-drawer-button" onClick={submitSuggestionForm}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FeedItem({ rating, idx }) {
  const [showFormDrawer, setShowFormDrawer] = useState(true);
  const [formDrawerClosing, setFormDrawerClosing] = useState(false);
  const chartRef = useRef(null);
  const [formDrawerVisible, setFormDrawerVisible] = useState(false);
  const [clickedLabel, setClickedLabel] = useState(null);
  const [activeDiv, setActiveDiv] = useState(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  const handleSuccess = () => {
    setShowSuccessBanner(true);
    setTimeout(() => {
      setShowSuccessBanner(false);
    }, 4000);
  };

  const toggleFormDrawer = (clickedLabelText) => {
    if (clickedLabelText !== activeDiv) {
      setActiveDiv(clickedLabelText);
      setFormDrawerVisible(true);
      setClickedLabel(clickedLabelText);
    } else {
      setActiveDiv(null);
      setFormDrawerVisible(false);
      setClickedLabel(null);
    }
  };

  const handleOutsideClick = (e) => {
    if (
      formDrawerVisible &&
      !e.target.closest(".form-drawer") &&
      !e.target.closest(".highlight") &&
      !e.target.closest(".lowlight")
    ) {
      setFormDrawerVisible(false);
      setActiveDiv(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [formDrawerVisible]);

  const backgroundColors = [
    "rgba(255, 99, 32, 0.8)",
    "rgba(75, 192, 192, 0.8)",
    "rgba(255, 206, 86, 0.8)",
    "rgba(153, 102, 255, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(201, 203, 07, 0.8)",
    "rgba(255, 159, 64, 0.8)",
    "rgba(255, 99, 132, 0.8)",
  ];

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    const chartCanvas = document.getElementById(`chart-${idx}`);
    const scores = [
      rating.physiological,
      rating.safety,
      rating.love,
      rating.esteem,
      rating.knowledge,
      rating.aesthetics,
      rating.actualization,
      rating.transcendance,
    ];
    const chartColors = backgroundColors.slice(0, scores.length);

    const chartConfig = {
      type: "doughnut",
      data: {
        labels: [
          "Physiology",
          "Safety",
          "Love",
          "Esteem",
          "Cognition",
          "Aesthetics",
          "Actualization",
          "Transcendence",
        ],
        datasets: [
          {
            label: "",
            data: scores,
            fill: true,
            backgroundColor: chartColors,
            borderColor: chartColors,
          },
        ],
      },
      options: {
        onHover: (event, chartElement) => {
          if (chartElement[0]) {
            chartCanvas.style.cursor = "pointer";
          } else {
            chartCanvas.style.cursor = "default";
          }
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const clickedElementIndex = elements[0].index;
            const clickedLabelText =
              chartConfig.data.labels[clickedElementIndex];
            toggleFormDrawer(clickedLabelText);
          }
        },
        cutout: "55%",
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) =>
                `${chartConfig.data.labels[context.dataIndex]}: ${
                  chartConfig.data.datasets[0].data[context.dataIndex]
                }`,
            },
            position: "nearest",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleFont: { size: 14 },
            bodyFont: { size: 14 },
            padding: 10,
            zIndex: 10000,
          },
          hover: { mode: "nearest", intersect: true },
        },
      },
    };
    chartRef.current = new Chart(chartCanvas, chartConfig);
  }, [rating, chartRef]);

  return (
    <div className="feed-item-container">
      {showSuccessBanner && (
        <div className="success-banner">
          <p>Your suggestion has been submitted successfully! </p> &nbsp; &nbsp;
          <br></br>
          <button
            className="close-success-banner"
            onClick={() => setShowSuccessBanner(false)}
          >
            ×
          </button>
          <div className="loading-bar-container">
            <div className="loading-bar"></div>
          </div>
        </div>
      )}

      {/* Feed item info section */}
      <div className="feed-item-info">
        <h1>{rating.user.username}</h1>
        <div className="canvas-wrapper">
          <i id="profile-picture" className="fas fa-user-circle" />
          <canvas className="chart" id={`chart-${idx}`} />
        </div>
      </div>

      {/* Lights container section */}
      <div className="lights-container">
        {/* Highlight section */}
        <div
          className="highlight"
          // onClick={() => toggleFormDrawer('highlight')}
        >
          <>
            <h2>
              {" "}
              <span id="username"> {rating.user.username} 's </span> highlight
              today was:{" "}
            </h2>
            <br></br>
            <p> {rating.highlights} </p>
          </>
        </div>

        {/* Lowlight section */}
        <div
          className="lowlight"
          // onClick={() => toggleFormDrawer('lowlight')}
        >
          {rating.lowlights ? (
            <>
              <h3>
                {" "}
                <span id="username"> {rating.user.username} 's </span> lowlight
                today was:
              </h3>
              <br></br>
              {rating.lowlights}
            </>
          ) : (
            <h3>
              <span id="username"> {rating.user.username} </span> had no
              lowlight today.
            </h3>
          )}
        </div>
      </div>

      {/* Form Drawer section */}
      <FormDrawer
        onClose={() => setFormDrawerVisible(false)}
        visible={formDrawerVisible}
        rating={rating}
        clickedLabel={clickedLabel}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
