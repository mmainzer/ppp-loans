// function to fly to a new feature after certain events are fired
const flyToBounds = (bbox, left, right) => {
		
	map.fitBounds(bbox, {
      padding : {left: left, right: right}
    });

}

// when reset icon is clicked, fly to the original center of map
$(".reset-map-icon").click(function() {
	
	flyToBounds(bbox, 10, 10);

});

// When the user moves their mouse over the state-fill layer, we'll update the
// feature state for the feature under the mouse.

map.on('mousemove', 'pppZipFill', function(e) {
	// Change the cursor style as a UI indicator.
	map.getCanvas().style.cursor = 'pointer';

	if (e.features.length > 0) {
		hoveredBoundary = e.features[0].id;
		if (hoveredBoundary) {
			map.setFeatureState(
				{ source: 'pppZipSource', sourceLayer:'pppZipRoll', id: hoveredBoundary },
				{ hover: false }
			);
		}
		
		
		map.setFeatureState(
			{ source: 'pppZipSource', sourceLayer:'pppZipRoll', id: hoveredBoundary },
			{ hover: true }
		);
	}

	let lngLat = e.lngLat;
	let zip = [ e.features[0].properties.ZCTA ];
	console.log(zip);
	console.log(fillField);
	let amount = e.features[0].properties[fillField];
	console.log(amount);
	zip = '<h1 class="popup-header">'+zip[0]+'</h1>';
	amount = '<strong> '+'$'+amount.format()+' </strong>';
	let html = zip+'<p class="popup-description">A total of '+amount+' was issued to businesses in this zip code.</p>'
	fillPopup
		.setLngLat(lngLat)
		.setHTML(html)
		.addTo(map);

});

map.on('mouseleave', 'pppZipFill', function() {
	// Change the cursor style as a UI indicator.
	map.getCanvas().style.cursor = 'grab';
	fillPopup.remove();

	if (hoveredBoundary) {
		map.setFeatureState(
			{ source: 'pppZipSource', sourceLayer:'pppZipRoll', id: hoveredBoundary },
			{ hover: false }
		);
	}

	hoveredBoundary = null;
});

// function to change a style layer based on the layer id and field input
const stylePoints = (layer, field) => {
	console.log(layer);
	map.setPaintProperty(layer,
						'circle-radius',
						["interpolate",["linear"],["get",field],
							  0,3,1,5,5,10,10,15,20,20,40,30,50,40
						]);
}