const path = require("path");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: __dirname,
		publicPath: "/",
		filename: "bundle.js"
	},
	mode: "none",
	module: {
		rules: [
			{
				loader: "babel-loader",
				test: /\.js$/,
				exclude: /node_modules/
			}
		]
	},
	devtool: "inline-cheap-module-source-map",
	devServer: {
		contentBase: "./",
		watchContentBase: true,
		publicPath: "/dist/"
	}
};
