import React from "react";

import SparkLineChart from "./SparklineChart";

/* Constructs a simple table that displays a row container a google map and three sparkline chart components (weather data) for each given city. */

export default props => {
	console.log("the data is recieved: ", props.cityStateData);

	//if no data - return an empty div
	if (props.cityStateData.length === 0) return <div />;

	// const cityName = props.cityStateData[0].name;
	// const avgTemp = Math.floor(props.cityStateData[0].averages[0]);

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>City</th>
						<th>Temperature (C) </th>
						<th>Pressure</th>
						<th>Humidity</th>
					</tr>
				</thead>
				<tbody>
					{props.cityStateData.map(item => {
						return renderCharts(item);
					})}
				</tbody>
			</table>
		</div>
	);
};

function renderCharts(cityData) {
	console.log("render charts ", cityData);
	return (
		<tr>
			<td>{cityData.name}</td>
			<td>
				<SparkLineChart data={cityData.temps} average={cityData.averages[0].toFixed(2)} />
			</td>
			<td>
				<SparkLineChart data={cityData.pressures} average={cityData.averages[1].toFixed(2)} />
			</td>
			<td>
				<SparkLineChart data={cityData.humidities} average={cityData.averages[2].toFixed(2)} />
			</td>
		</tr>
	);
}

// <tbody>{renderCharts(props.cityStateData[0])}</tbody>
