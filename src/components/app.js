import React, { Component } from "react";
import SearchBar from "./searchbar";
import axios from "axios";
import WeatherTable from "./weatherTable";

const API_KEY = "9487cec2b7c38c8aee52f9cc5401f440";

export const FETCH_WEATHER = "FETCH_WEATHER";
export const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: "",
			cityData: []
		};

		this.searchTerm = "";

		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
	}

	organiseCityData(data) {
		const temps = data.list.map(item => {
			return item.main.temp - 273.15;
		});
		const pressures = data.list.map(item => {
			return item.main.pressure;
		});
		const humidities = data.list.map(item => {
			return item.main.humidity;
		});

		//get the avg for each
		let averages = [];
		[temps, pressures, humidities].forEach(item => {
			averages.push(
				item.reduce((total, amount, index, array) => {
					total += amount;
					if (index === array.length - 1) {
						return total / array.length;
					} else {
						return total;
					}
				})
			);
		});

		const theData = {
			name: data.city.name,
			temps: temps,
			pressures: pressures,
			humidities: humidities,
			averages: averages
		};

		console.log("theData :", theData);
		return theData;
	}

	handleSearchSubmit() {
		console.log("handleSearchSubmit");
		const city = this.searchTerm;
		//do the weather search
		const url = `${ROOT_URL}&q=${city},us`;
		axios
			.get(url)
			.then(data => {
				const latestCityData = this.organiseCityData(data.data);
				const arr = [latestCityData];
				arr.concat(arr.concat(this.state.cityData));

				this.setState({
					cityData: arr
				});
			})
			.catch(err => {
				console.log("err :", err);
			});
		// this.setState({ term: this.searchTerm });
	}

	handleSearchChange(e) {
		this.searchTerm = e.target.value;
	}

	render() {
		console.log("app render");
		return (
			<div>
				<SearchBar handleSearchChange={this.handleSearchChange} handleSearchSubmit={this.handleSearchSubmit} />
				<WeatherTable cityStateData={this.state.cityData} />
			</div>
		);
	}
}
