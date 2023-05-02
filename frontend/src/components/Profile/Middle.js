import { Line, Radar } from "react-chartjs-2";
import { React, useEffect, useState } from "react";
import {
	getLineChartData,
	getLineChartOptions,
	getRadarChartData,
	getRadarChartOptions,
} from "./chartData";
import PinBox from "./PinBox";
import "./Middle.css";

export default function Middle({ user, finalUser, isProfileSelf, ratings }) {
	const [lineData, setLineData] = useState({ labels: [], datasets: [] });
	const [radarData, setRadarData] = useState({ labels: [], datasets: [] });
	const [lineOptions, setLineOptions] = useState({});
	const [radarOptions, setRadarOptions] = useState({});

	useEffect(() => {
		const radarChartData = getRadarChartData(ratings);
		const lineChartData = getLineChartData(ratings);
		const radarChartOptions = getRadarChartOptions();
		const lineChartOptions = getLineChartOptions();

		setRadarData(radarChartData);
		setLineData(lineChartData);
		setRadarOptions(radarChartOptions);
		setLineOptions(lineChartOptions);	
	}, [ratings]);

	return (
		<div className="middle">
			<div className="charts-container">
				<div className="radar-and-pinbox-container">
					<div className="radar">
						<Radar
							data={radarData}
							options={radarOptions}
						/>
					</div>
					<div className="pin-box">
						<PinBox
							finalUser={finalUser}
							isProfileSelf={isProfileSelf}
							user={user}
						/>
					</div>
				</div>
				<div className="line-chart-container">
					<Line
						key={JSON.stringify(lineData)}
						data={lineData}
						options={lineOptions}
					/>
				</div>
			</div>
		</div>
	);
}
