import React, { Component } from "react";
import SearchBar from "./searchbar";
import axios from "axios";

const API_KEY = "9487cec2b7c38c8aee52f9cc5401f440";

export const FETCH_WEATHER = "FETCH_WEATHER";
export const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: ""
		};

		this.searchTerm = "";

		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
	}

	componentWillUpdate() {
		console.log("componentDidMount");
		const city = this.searchTerm;
		console.log("city :", city);
		//const city = "New York";
		//do the weather search
		const url = `${ROOT_URL}&q=${city},us`;
		axios
			.get(url)
			.then(data => {
				console.log("data :", data);
			})
			.catch(err => {
				console.log("err :", err);
			});
	}

	handleSearchSubmit() {
		this.setState({ term: this.searchTerm });
	}

	handleSearchChange(e) {
		this.searchTerm = e.target.value;
	}

	render() {
		return (
			<div>
				<SearchBar handleSearchChange={this.handleSearchChange} handleSearchSubmit={this.handleSearchSubmit} />
			</div>
		);
	}
}
