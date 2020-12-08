console.log("Map is loaded");

const map = new mapboxgl.Map({
	container: 'map', // container id
	style: 'mapbox://styles/gpcecondev/ckfgusueg0dcb19oy9vf3oudn',
	center: [-84.5742,33.4331], // starting position [lng, lat]
	zoom: 8.8, // starting zoom
	scrollZoom: true
});

let currentZoom = map.getZoom();

// Create a popup, but don't add it to the map yet.
const fillPopup = new mapboxgl.Popup({
	closeButton: false,
	closeOnClick: false
});

const pointPopup = new mapboxgl.Popup({
	closeButton: false,
	closeOnClick: false
});

// add zoom and rotation controls to the map
const nav = new mapboxgl.NavigationControl({showCompass:false});
map.addControl(nav, 'top-left');

// add another control at the bottom with a zoom to extent button
const resetIcon = "<button class='mapboxgl-ctrl-reset' type='button' title='Reset Map' aria-label='Reset Map'><span class='reset-map-icon' aria-hidden='true'><img class='reset-icon' src='./assets/images/map-regular.svg'></span></button>"
$(".mapboxgl-ctrl.mapboxgl-ctrl-group").append(resetIcon);

// after the map loads, bring in the source and layer you want displayed
map.on('load', function() {
	
	// add sources
	map.addSource('pppCitySource', {
		type: 'vector',
		url: 'mapbox://gpcecondev.43n5i9jz?latest=true'
	});

	map.addSource('pppZipSource', {
		type: 'vector',
		url: 'mapbox://gpcecondev.0bwinx1k?latest=true'
	});

	// map.addSource('pppCountySource', {
	// 	type: 'vector',
	// 	url: 'mapbox://gpcecondev.3jga33vh?latest=true'
	// });

	map.addSource('eidlCitySource', {
		type: 'vector',
		url: 'mapbox://gpcecondev.5n31drl7?latest=true'
	});

	map.addSource('eidlZipSource', {
		type: 'vector',
		url: 'mapbox://gpcecondev.be6n6c06?latest=true'
	});

	// map.addSource('eidlCountySource', {
	// 	type: 'vector',
	// 	url: 'mapbox://gpcecondev.0qm1ixwd?latest=true'
	// });

	// add layers
	loadData();

	// loadData(zipRoll, cityRoll);

});