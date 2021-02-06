// APT Url: https://openweathermap.org/current#zip
// API Key: https://home.openweathermap.org/api_keys

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = ',us&appid=2d3027a75e0626f37d311271909d6d02&units=metric';

//  Create a new date

let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear() + " | " + d.getHours() + ":" + d.getMinutes();

// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click', callBack);

/* Function called by event listener */

function callBack(e) {
    const zipCoder = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    getWeather(baseURL, zipCoder, apiKey)
        // New Syntax!
        .then(function (data) {
            // Add data
            // console.log(data);
            postData('/addWeather', {
                date: newDate,
                temperature: data.main.temp,
                content: content
            }).then(
                updateUI()
            )
        })
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zipCoder, key) => {
    const request = await fetch(baseURL + zipCoder + key);
    try {
        // Transform into JSON
        const weatherData = await request.json();
        return weatherData;
    }
    catch (error) {
        console.log("Opps there is a bad error", error);
        // appropriately handle the error
    }
};

/* Function to POST data */

const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("oh! Looks ther is an error", error)
    }
}

//  Update UI
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature + ' C°';
        document.getElementById('content').innerHTML = allData.content;

    } catch (error) {
        console.log("Opps there is a bad error", error);
    }
}