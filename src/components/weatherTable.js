import React from "react";

import SparkLineChart from "./SparklineChart";

export default props => {
	console.log("the data is recieved: ", props.cityStateData);

	if (props.cityStateData.length === 0) return <div />;

	const cityName = props.cityStateData[0].name;
	const avgTemp = Math.floor(props.cityStateData[0].averages[0]);

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
				<tbody>{renderCharts(props.cityStateData[0])}</tbody>
			</table>
		</div>
	);
};

function renderCharts(cityData) {
	return (
		<tr>
			<td>{cityData.name}</td>
			<td>
				<SparkLineChart data={cityData.temps} />
			</td>
			<td>
				<SparkLineChart data={cityData.pressures} />
			</td>
			<td>
				<SparkLineChart data={cityData.humidities} />
			</td>
		</tr>
	);
}
