// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// The mapid will reference the id tag in our <div> element on the index.html file.
// The setView() method sets the view of the map with a geographical center, where the first coordinate is latitude and 
// the second is longitude. We set the zoom level on a scale 0–18.
// let map = L.map('mapid').setView([36.1733, -120.1794], 7);

// Create the map object with center at the San Francisco airport.
let map = L.map('mapid').setView([37.6213, -122.3790], 5);

// Coordinates for each point to be used in the line.
// let line = [
// 	[33.9416, -118.4085],
// 	[37.6213, -122.3790]
//   ];

// Coordinates for each point to be used in the polyline.
let line = [
	[33.9416, -118.4085],
	[37.6213, -122.3790],
	[40.7899, -111.9791],
	[47.4502, -122.3088]
  ];

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {color: "yellow"}).addTo(map);

// Get data from cities.js
let cityData = cities;

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
	console.log(city)
	//Create a circular marker with its radius equal to its popuation, must divide population amount for visibility
	L.circleMarker(city.location, {radius: city.population/100000})
	//create popup for each city, toLocaleString adds a comma to each number
	.bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
	.addTo(map);
});


// Use standard marker
// L.marker(city.location)

//  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

// Add a circular marker
// L.circle([34.0522, -118.2437], {
// 	radius: 100
//  }).addTo(map);

// Add circular marker using circleMarker()
// L.circleMarker([34.0522, -118.2437], {
// 	radius: 300,
// 	color: "black",
// 	fillColor: '#ffffa1'
// }).addTo(map);

// We create the tile layer that will be the background of our map.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}'

// Create the tile layer that will be the background of the map.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',

// Create the tile layer that will be the background of the map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
// Then add our 'graymap' tile layer to the map.
streets.addTo(map);