import React, { Component } from "react";
import SearchBar from "./searchbar";
import axios from "axios";
import WeatherTable from "./weatherTable";
const keys = require("../config/keys");

export const FETCH_WEATHER = "FETCH_WEATHER";
export const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${keys.WEATHER_API_KEY}`;

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

		//improve
		const theData = {
			name: data.city.name,
			coord: data.city.coord,
			temps: temps,
			pressures: pressures,
			humidities: humidities,
			averages: averages
		};
		return theData;
	}

	handleSearchSubmit() {
		const city = this.searchTerm;
		//do the weather search
		const url = `${ROOT_URL}&q=${city},us`;
		axios
			.get(url)
			.then(data => {
				const latestCityData = this.organiseCityData(data.data);
				//this needs to improve
				const arr = [latestCityData];
				const finalArr = arr.concat(this.state.cityData);

				this.setState({
					cityData: finalArr
				});
			})
			//handle this error
			.catch(err => {
				console.log("err :", err);
			});
	}

	handleSearchChange(e) {
		this.searchTerm = e.target.value;
	}

	render() {
		return (
			<div>
				<SearchBar handleSearchChange={this.handleSearchChange} handleSearchSubmit={this.handleSearchSubmit} />
				<WeatherTable cityStateData={this.state.cityData} />
			</div>
		);
	}
}
