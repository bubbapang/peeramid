const needsAndColors = {
	physiology: "#577590",
	safety: "#4d908e",
	love: "#43aa8b",
	esteem: "#90be6d",
	cognition: "#f9c74f",
	aesthetics: "#f8961e",
	actualization: "#f3722c",
	transcendence: "#f94144",
};

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const needsAndColorsArray = Object.entries(needsAndColors);
const needs = Object.keys(needsAndColors);

const datasets = [];
const monthsAndRatings = {};
const monthsAndAverageRatings = {};

const createDatasets = (ratings) => {
	ratings.forEach((rating) => {
		const currentYear = new Date().getFullYear();
		const ratingTimestamp = Date.parse(rating.createdAt);
		const ratingFullDate = new Date(ratingTimestamp);
		const ratingYear = ratingFullDate.getFullYear();

		if (currentYear === ratingYear) {
			const ratingMonth = ratingFullDate.getMonth();
			monthsAndRatings[ratingMonth] = monthsAndRatings[ratingMonth] || [];
			monthsAndRatings[ratingMonth].push(rating);
		}
	});

	// Populate monthsAndAverageRatings object
	needs.forEach((need, idx) => {
		for (let [month, ratingsArray] of Object.entries(monthsAndRatings)) {
			let sum = 0;
			ratingsArray.forEach((rating) => {
				sum += rating[need];
			});
			const average = sum / ratingsArray.length;
			monthsAndAverageRatings[month] = monthsAndAverageRatings[month] || {};
			monthsAndAverageRatings[month][needs[idx]] = average;
		}	
	});

	return monthsAndAverageRatings;
};

export const getLineChartData = (ratings) => {
	const monthsAndAverageRatings = createDatasets(ratings);
	// console.log("monthsAndRatings", monthsAndRatings)
	// console.log("monthsAndAverageRatings", monthsAndAverageRatings)

	for (let [need, color] of needsAndColorsArray) {
		const data = months.map((_, idx) =>
			monthsAndAverageRatings[idx] ? monthsAndAverageRatings[idx][need] : null
		);

		datasets.push({
			label: need,
			borderColor: color,
			data: data,
			fill: false,
			tension: 0.1,
		});
	}	

	const lineChartData = {
		labels: [...months],
		datasets: datasets,
	};

	return lineChartData;
};

export const getRadarChartData = (ratings) => {
	const getAverage = (need) => {
		let sum = 0;
		ratings.forEach((rating) => {
			sum += rating[need];
		});
		return sum / ratings.length;
	};

	const dataForRadarChart = needs.map((need) => getAverage(need));

	const radarChartData = {
		labels: needs,
		datasets: [
			{
				label: "Average over time",
				data: dataForRadarChart,
				fill: true,
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				borderColor: "rgb(75, 192, 192)",
				pointBackgroundColor: "rgb(75, 192, 192)",
				pointBorderColor: "#fff",
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: "rgb(75, 192, 192)",
			},
		],
	};

	return radarChartData;
};

export const getLineChartOptions = () => {
	const lineChartOptions = {
		maintainAspectRatio: false,
		scales: {
			y: {
				min: 1,
				max: 10,
				ticks: {
					stepSize: 1,
				},
			},
		},
	};

	return lineChartOptions;
};

export const getRadarChartOptions = () => {
	const radarChartOptions = {
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			r: {
				min: 1,
				max: 10,
				ticks: {
					stepSize: 1,
				},
				angleLines: {
					color: [
						"#577590",
						"#4D908E",
						"#43AA8B",
						"#90BE6D",
						"#F9C74F",
						"#F8961E",
						"#F3722C",
						"#F94144",
					],
				},
				grid: {
					color: "darkgrey",
				},
				pointLabels: {
					color: [
						"#577590",
						"#4D908E",
						"#43AA8B",
						"#90BE6D",
						"#F9C74F",
						"#F8961E",
						"#F3722C",
						"#F94144",
					],
					font: {
						size: 17,
					},
				},
			},
		},
	};

	return radarChartOptions;
};
