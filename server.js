/* Empty JS object to act as endpoint for all routes */
const projectData = [];

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('website'));

const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening() {
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};

// GET route
app.get('/all', sendData);

function sendData(req, res) {
    res.send(projectData[projectData.length - 1]);
};

// POST route
app.post('/addWeather', addWeather);
//create add Weather function
function addWeather(req, res) {
    const temporary_object = {}

    temporary_object.date = req.body.date;

    temporary_object.temperature = req.body.temperature;

    temporary_object.content = req.body.content;

    projectData.push(temporary_object);

    res.send(projectData[projectData.length - 1]);

}