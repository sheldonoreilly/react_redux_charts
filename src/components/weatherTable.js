import React from "react";

import SparkLineChart from "./SparklineChart";

/* Constructs a simple table that displays a row container a google map and three sparkline chart components (weather data) for each given city. */

export default props => {
	//if no data - return an empty div
	if (props.cityStateData.length === 0) return <h3>Please choose your city.</h3>;

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>City</th>
						<th>Temperature (C) </th>
						<th>Pressure (hPa)</th>
						<th>Humidity (%)</th>
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
	return (
		<tr key={cityData.name}>
			<td>{cityData.name}</td>
			<td>
				<SparkLineChart
					data={cityData.temps}
					units={"Temperature (C)"}
					average={cityData.averages[0].toFixed(2)}
				/>
			</td>
			<td>
				<SparkLineChart
					data={cityData.pressures}
					units={"Pressure (hPa)"}
					average={cityData.averages[1].toFixed(2)}
				/>
			</td>
			<td>
				<SparkLineChart
					data={cityData.humidities}
					units={"Humidity (%)"}
					average={cityData.averages[2].toFixed(2)}
				/>
			</td>
		</tr>
	);
}
