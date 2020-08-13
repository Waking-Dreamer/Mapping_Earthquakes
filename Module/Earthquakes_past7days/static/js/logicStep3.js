// Add console.log to check to see if our code is working.
// console.log("working");

// Create the map object with a center and zoom level.
// The mapid will reference the id tag in our <div> element on the index.html file.
// The setView() method sets the view of the map with a geographical center, where the first coordinate is latitude (40.7) and 
// the second is longitude (-94.5). We set the zoom level of “4” on a scale 0–18.
//let map = L.map('mapid').setView([40.7, -94.5], 4);
// let map = L.map('mapid').setView([34.0522, -118.2437], 14);

// Create the map object with center at the San Francisco airport
// let map = L.map('mapid').setView([37.5, -122.5], 10);

// Create the map object with center of earth and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);

// Add GeoJSON data
// NOTE: The coordinates appear in reverse order, compared to their order in the setView() method. The GeoJSON data coordinates are set with the first
// parameter as X (longitude) and the second parameter as Y (latitude) The L.geoJSON() layer reverses the coordinates to plot them on the map.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// Grab GeoJSON data and add to map
// L.geoJson(sanFranAirport, {
//     // We turn each feature into a marker on the map using pointToLayer
//     pointToLayer: function(feature, latlng) {
//     	console.log(feature);
// 		return L.marker(latlng)
// 		// Create popup and use dot notation to traverse through the JSON object to get the city
// 		.bindPopup("<h2>" + feature.properties.city + "</h2>")
//     }
//   }).addTo(map);

// Grab GeoJSON data and add to map
// L.geoJson(sanFranAirport, {
//     // We turn each feature into a marker on the map using
//     onEachFeature: function(feature, layer) {
//     	console.log(layer);
// 		layer.bindPopup();
//     }
// }).addTo(map);

// Get data from cities.js
// let cityData = cities;

// Loop through the cities array and create one marker for each city.
// cityData.forEach(function(city) {
// 	console.log(city)
// 	//Create a circular marker with its radius equal to its popuation, must divide population amount for visibility
// 	L.circleMarker(city.location, {radius: city.population/100000})
// 	//create popup for each city, toLocaleString adds a comma to each number
// 	.bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
// 	.addTo(map);
// });

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

// Create the tile layer that will be the background of the map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
	"Streets": streets,
	"Satellite Streets": satelliteStreets
  };

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [39.5, -98.5],
	zoom: 3,
	layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
	return {
	opacity: 1,
	fillOpacity: 1,
	fillColor: getColor(feature.properties.mag),
	color: "#000000",
	radius: getRadius(feature.properties.mag),
	stroke: true,
	weight: 0.5
	};
}

// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
	if (magnitude > 5) {
	  return "#ea2c2c";
	}
	if (magnitude > 4) {
	  return "#ea822c";
	}
	if (magnitude > 3) {
	  return "#ee9c00";
	}
	if (magnitude > 2) {
	  return "#eecc00";
	}
	if (magnitude > 1) {
	  return "#d4ee00";
	}
	return "#98ee00";
  }

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
	function getRadius(magnitude) {
		if (magnitude === 0) {
		return 1;
		}
		return magnitude * 4;
	}

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
	L.geoJson(data, {
		// We turn each feature into a circleMarker on the map.
		pointToLayer: function(feature, latlng) {
					  console.log(data);
					  return L.circleMarker(latlng);
				},
			// We set the style for each circleMarker using our styleInfo function.
			style: styleInfo,
			// We create a popup for each circleMarker to display the magnitude and
    		//  location of the earthquake after the marker has been created and styled.
    		onEachFeature: function(feature, layer) {
			layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
	  		}
			}).addTo(map);
		});

// // Accessing the Toronto neighborhoods GeoJSON URL.
// let torontoHoods = "https://raw.githubusercontent.com/Waking-Dreamer/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/JSON/torontoNeighborhoods.json";

// // Grabbing our GeoJSON data.
// d3.json(torontoHoods).then(function(data) {
//     console.log(data);
//   	// Creating a GeoJSON layer with the retrieved data.
// 	  L.geoJson(data).addTo(map);
// 	});

// // Accessing the airport GeoJSON URL
// // Having the tileLayer() method before accessing large datasets ensures that the map gets loaded before the data is added to it.
// let TorontoData = "https://raw.githubusercontent.com/Waking-Dreamer/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/JSON/torontoRoutes.json";

// // Create a style for the lines.
// let myStyle = {
// 	color: "#ffffa1",
// 	weight: 2
// }

// // Grabbing our GeoJSON data.
// d3.json(TorontoData).then(function(data) {
//     console.log(data);
//   	// Creating a GeoJSON layer with the retrieved data.
//   	L.geoJson(data, {
// 		style: myStyle,
// 	  	onEachFeature: function(feature, layer) {
// 			// Each airline route has a popup marker that shows the airline code and destination.
// 		  	layer.bindPopup("<h3> Aitline: " + feature.properties.airline + "<h3> <hr><h3> Destination: "
// 		  	+ feature.properties.dst + "/h3>");
// 	  	}
//   	})
//   	.addTo(map);
// 	});