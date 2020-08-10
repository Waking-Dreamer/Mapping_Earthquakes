// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// The mapid will reference the id tag in our <div> element on the index.html file.
// The setView() method sets the view of the map with a geographical center, where the first coordinate is latitude (40.7) and 
// the second is longitude (-94.5). We set the zoom level of “4” on a scale 0–18.
// let map = L.map('mapid').setView([40.7, -94.5], 4);

let map = L.map('mapid').setView([34.0522, -118.2437], 14);

//  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

// Add a circular marker
// L.circle([34.0522, -118.2437], {
// 	radius: 100
//  }).addTo(map);

// Add circular marker using circleMarker()
L.circleMarker([34.0522, -118.2437], {
	radius: 300,
	color: "black",
	fillColor: '#ffffa1'
}).addTo(map);

// We create the tile layer that will be the background of our map.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}'

// Create the tile layer that will be the background of the map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
// Then add our 'graymap' tile layer to the map.
streets.addTo(map);