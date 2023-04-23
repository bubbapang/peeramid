// init arrays for the chart setup
const needsAndColors = {
	"physiology": "#577590",
	"safety": "#4d908e",
	"love": "#43aa8b",
	"esteem": "#90be6d",
	"cognition": "#f9c74f",
	"aesthetics": "#f8961e",
	"actualization": "#f3722c",
	"transcendence": "#f94144",
};

const needsAndColorsArray = Object.entries(needsAndColors);

// init needs
const needs = Object.keys(needsAndColors);

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

// init the dataset array for both charts
// a dataset has: label, borderColor, data, fill, tension
const datasets = [];

// i want to rename the next two arrays to be more descriptive, but i'm not sure what to call them because of how they're used in the chart setup

// init for line chart
// key=month, value=ratings
	// what is a rating though? is a rating an object with the need as key and THAT day's rating as value?
		// i should take a look at what the frontend state for ratings looks like
const monthsAndRatings = {};

const monthsAndRatingsArray = Object.entries(monthsAndRatings);

// init for radar chart
// key=month, value=avg rating for each need
// average rating is calculated by summing all ratings for a given need and dividing by the number of ratings
const ratingAvgByNeed = {};

// the question now is... how do we 1) populate these arrays?, then 2) put them in the get functions, to be exported into the profile react component?

// this iterates over the needsAndColors object, and for each need, it creates a dataset object and pushes it into the datasets array, for BOTH charts
for (let [need, color] of needsAndColorsArray) {
	datasets.push({
		label: need,
		borderColor: color,
		data: months.map((month) =>
			ratingAvgByNeed[month] ? ratingAvgByNeed[month][need] : null
		),
		fill: false,
		tension: 0.1,
	});
}

// idk where to put this, because the ratings are only going to come in the "get" methods as an argument, so this block needs to be in one of those

// this loop populates the ratingAvgByNeed object
// for each need
needs.forEach((need, idx) => {
	for (let [month, ratingsArray] of monthsAndRatingsArray) {
		let sum = 0;	
		ratingsArray.forEach((rating) => {
			sum += rating[need];
		});
		const average = sum / ratingsArray.length;
		ratingAvgByNeed[month] = ratingAvgByNeed[month] || {};
		ratingAvgByNeed[month][needs[idx]] = average;
	}
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// THE "GET" FUNCTIONS //

// data functions

export const getLineChartData = (ratings) => {
	// this loop populates the monthsAndRatings object
	// for each rating, over 100+ of them...
	ratings.forEach((rating) => {
		// init the current year
		const currentYear = new Date().getFullYear();
		// parse the date from the rating object
		const ratingTimestamp = Date.parse(rating.createdAt);
		// make a new date object from the above parsing
		const ratingFullDate = new Date(ratingTimestamp);
		const ratingYear = ratingFullDate.getFullYear()
		// if the rating was created within the current year...
		if (currentYear === ratingYear) {
			// get the month from the date object
			const ratingMonth = ratingFullDate.getMonth();
			// if the monthsAndRatings object doesn't have a key for that month, then create it and set the value to an empty array
			monthsAndRatings[ratingMonth] = monthsAndRatings[ratingMonth] || [];
			// push the whatever the above line created into the monthsAndRatings object
			monthsAndRatings[ratingMonth].push(rating);
	}
});
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

	const dataForRadarChart = [];
	for (let i = 0; i < needs.length; i++) {
		dataForRadarChart.push(getAverage(needs[i]));
	}

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

// options functions

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
