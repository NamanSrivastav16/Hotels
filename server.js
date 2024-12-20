const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hotel Is live");
});

// Import the router files
const personRoutes = require("./routes/routesPerson");
const menuRoutes = require("./routes/routesMenu");

// Use the routes
app.use("/person", personRoutes);
app.use("/menuitem", menuRoutes);

app.listen(3000, () => console.log("Server is live on port 3000"));
