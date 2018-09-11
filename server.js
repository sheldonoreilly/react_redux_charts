const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;

const app = express();

app.use(express.static(__dirname));

app.use(function(req, res, next) {
	if (req.headers["x-forwarded-proto"] === "https") {
		res.redirect("http://" + req.hostname + req.url);
	} else {
		next();
	}
});

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(port);
console.log(`Server started on port: ${port}`);
