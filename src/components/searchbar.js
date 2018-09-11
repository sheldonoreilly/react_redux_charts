import React, { Component } from "react";

export default class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.formSubmitted = this.formSubmitted.bind(this);
	}

	formSubmitted(e) {
		e.preventDefault();
		this.props.handleSearchSubmit();
	}

	render() {
		return (
			//using form gives a submit on Enter key press.
			<form className="input-group" onSubmit={this.formSubmitted}>
				<input type="text" onChange={this.props.handleSearchChange} placeholder="Search NA cites..." />
				<button type="submit">Submit</button>
			</form>
		);
	}
}
