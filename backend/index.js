const functions = require('firebase-functions');
// Import express
const express = require('express');
// Import Mongoose
const mongoose = require('mongoose');
// Initialize the app
const app = express();

// Import routes
const apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Connect to Mongoose and set connection variable

const dev_uri = 'mongodb://localhost:27017/zoom'
const production_uri = "mongodb+srv://david:david@cluster0.tz6dx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(dev_uri, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database.', err);
  process.exit();
});

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

// Heroku Mongoose connection
// mongoose.connect('mongodb://heroku_5686p02g:sia8l3fni4jmu7qbn0ac1t75mf@ds349857.mlab.com:49857/heroku_5686p02g', { useNewUrlParser: true });

// Setup server port
var port = process.env.PORT || 4000;
const cors = require('cors');
app.use(cors())

// Send message for default URL
app.get('/', (req, res) => {res.send('Hello World with Express')});

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port

app.all('*', function (req, res) {
  res.send('what???', 404);
});

//An error handling middleware
app.use(function (err, req, res, next) {
  res.status(500);
  res.send("Oops, something went wrong.", 404)
});

//An error handling middleware
app.use(function (err, req, res, next) {
  res.status(503);
  res.send("Oops, unable to connect to database.", 404)
});

// app.listen(port, function () {
//   console.log("Running zoomclasses on port " + port);
// });

module.exports = app

exports.expressApi = functions.https.onRequest(app);
