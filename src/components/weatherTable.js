import React from "react";

export default props => {
	console.log("weather table render");
	console.log("the data is recieved: ", props.cityStateData);

	if (props.cityStateData.length === 0) return <div />;

	const cityName = props.cityStateData[0].name;
	const avgTemp = Math.floor(props.cityStateData[0].averages[0]);

	console.log("cityName :", cityName);
	console.log("Ave temp: " + avgTemp);
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>City</th>
						<th>Average temp</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{cityName}</td>
						<td>{avgTemp}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
