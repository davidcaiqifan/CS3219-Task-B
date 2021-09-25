// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialize the app
let app = express();

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable

//var mongoUrl = 'mongodb://mongo:27017/resthub'
const production_uri = "mongodb+srv://david:david@cluster0.tz6dx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var connectWithRetry = function() {
    return mongoose.connect(production_uri, function(err) {
      if (err) {
        console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
        setTimeout(connectWithRetry, 5000);
      } else {
          console.log('DB connection success!')
      }
    }, { useNewUrlParser: true});
  };
connectWithRetry();

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

// Heroku Mongoose connection
// mongoose.connect('mongodb://heroku_5686p02g:sia8l3fni4jmu7qbn0ac1t75mf@ds349857.mlab.com:49857/heroku_5686p02g', { useNewUrlParser: true });

var db = mongoose.connection;

// Added check for DB connection

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 3000;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port

app.all('*', function(req, res){
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

app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});
module.exports = app