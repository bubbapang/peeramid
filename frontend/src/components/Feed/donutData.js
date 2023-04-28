// donutData.js

export const backgroundColors = [
	"#264653",
	"#287271",
	"#2a9d8f",
	"#8ab17d",
	"#e9c46a",
	"#efb366",
	"#f4a261",
	"#ee8959",
	"#F3E1DD",
];

export const needs = [
	"Physiology",
	"Safety",
	"Love",
	"Esteem",
	"Cognition",
	"Aesthetics",
	"Actualization",
	"Transcendence",
];

export function getScores(rating) {
	const scores = [];
	for (let need of needs) {
		const lowercaseNeed = need.toLowerCase();
		scores.push(rating[lowercaseNeed]);
	}
	return scores;
}

export function createChartConfig(scores, chartCanvas, toggleFormDrawer) {
	const maxScore = 80;
	const totalScore = scores.reduce((a, b) => a + b, 0);
	const labels = [...needs, "Potential"];
	scores.push(maxScore - totalScore);

	const chartColors = backgroundColors.slice(0, scores.length);

	const chartConfig = {
		type: "doughnut",
		data: {
			labels,
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
			onClick: function (event) {
				const elements = this.getElementsAtEventForMode(
					event,
					"nearest",
					{ intersect: false },
					true
				);
				if (elements.length > 0) {
					const clickedElementIndex = elements[0].index;
					const clickedLabelText = labels[clickedElementIndex];
					if (clickedElementIndex < needs.length) {
						toggleFormDrawer(clickedLabelText);
					}
				}
			},

			cutout: "55%",
			plugins: {
				legend: { display: false },
				tooltip: {
					callbacks: {
						label: (context) =>
							`${labels[context.dataIndex]}: ${
								context.dataset.data[context.dataIndex]
							}`,
					},
					position: "nearest",
					backgroundColor: "rgba(0, 0, 0, 0.8)",
					titleFont: { size: 14 },
					bodyFont: { size: 14 },
					padding: 10,
					zIndex: 10000,
				},
				hover: { mode: "nearest", intersect: false },
			},
		},
	};

	return chartConfig;
}
