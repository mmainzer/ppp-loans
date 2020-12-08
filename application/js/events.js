
$('#geoLevelSelect').change( () => {


	selectedLevel = $("#select2-geoLevelSelect-container").get().map(el => el.textContent);
	$('.geoSelect').not('.'+selectedLevel[0]).removeClass('active');
	$('.'+selectedLevel[0]).addClass('active');

	selectedGeo = [ $("#"+selectedLevel[0]+" option:selected").text() ];

});

$('#datasetSelect').change( () => {

	selectedData = [ $("#datasetSelect option:selected").text() ];
	$('.'+selectedData[0]).addClass('active');

	// hide or show the industry select depending on which dataset is selected
	$('.industrySelect').not('.'+selectedData[0]).removeClass('active');
	$('.'+selectedData[0]).addClass('active');
	selectedIndustry = [ $("#industrySelect option:selected").text() ];

	console.log(selectedIndustry);

	loadData();

});

