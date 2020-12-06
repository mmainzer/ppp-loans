$('.dropdown').select2({
    width: '90%'
});

$('#geoLevelSelect').change( () => {


	selectedLevel = $("#select2-geoLevelSelect-container").get().map(el => el.textContent);
	$('.geoSelect').not('.'+selectedLevel[0]).removeClass('active');
	$('.'+selectedLevel[0]).addClass('active');

	selectedGeo = [ $("#"+selectedLevel[0]+" option:selected").text() ];
	
	// if (selectedLevel[0] === "CDRegion" || selectedLevel[0] === "County" || selectedLevel[0] ==="MSA") {
	// 	getData();
	// }

});

$('#datasetSelect').change( () => {
	selectedData = $("#select2-datasetSelect-container").get().map(el => el.textContent);
	$('.styleSelect').not('.'+selectedData[0]).removeClass('active');
	$('.'+selectedData[0]).addClass('active');

	// hide or show the industry select depending on which dataset is selected
	$('.industrySelect').not('.'+selectedData[0]).removeClass('active');
	$('.'+selectedData[0]).addClass('active');
	industry = [ $("#industrySelect option:selected").text() ];
	console.log(industry);

	dataLayer = [ $("#"+selectedData[0]+" option:selected").text() ];
	console.log(dataLayer);
});