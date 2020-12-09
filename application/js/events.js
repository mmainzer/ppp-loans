
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

$('#geoLevelSelect').change( () => {


	selectedLevel = $("#geoLevelSelect option:selected").get().map(el => el.textContent);
	$('.geoSelect').not('.'+selectedLevel[0]).removeClass('active');
	$('.'+selectedLevel[0]).addClass('active');

	selectedGeo = [ $("#"+selectedLevel[0]+" option:selected").text() ];
	filterGeo = selectedGeo;
	
	if (selectedLevel[0] === "County") {
		
		selectedGeo = selectedGeo.map(id => dataObj[selectedLevel].find(({ area }) => area === id).msa);
	}

	console.log(selectedLevel);

	console.log(selectedGeo);
	console.log(filterGeo);
	loadData();

});

$('#'+selectedLevel[0]).change( () => {

	console.log(selectedLevel);

	selectedGeo = $("#" + selectedLevel[0] +" option:selected").get().map(el => el.textContent);
	filterGeo = selectedGeo;	
	
	if (selectedLevel[0] === "County") {
		
		selectedGeo = selectedGeo.map(id => dataObj[selectedLevel].find(({ area }) => area === id).msa);
	}

	console.log(selectedGeo);
	console.log(filterGeo);
	loadData();

});

$('#County').change( () => {

	console.log(selectedLevel);

	selectedGeo = $("#County option:selected").get().map(el => el.textContent);
	filterGeo = selectedGeo;
	selectedGeo = selectedGeo.map(id => dataObj[selectedLevel].find(({ area }) => area === id).msa);

	console.log(selectedGeo);
	console.log(filterGeo);
	loadData();

});

$('#CDRegion').change( () => {

	console.log(selectedLevel);

	selectedGeo = $("#CDRegion option:selected").get().map(el => el.textContent);
	filterGeo = selectedGeo;	

	console.log(selectedGeo);
	console.log(filterGeo);
	loadData();

});

$('#MSA').change( () => {

	console.log(selectedLevel);

	selectedGeo = $("#MSA option:selected").get().map(el => el.textContent);
	filterGeo = selectedGeo;	

	console.log(selectedGeo);
	console.log(filterGeo);
	loadData();

});

$('#industrySelect').change( () => {

	console.log(selectedLevel);

	selectedIndustry = $("#industrySelect option:selected").get().map(el => el.textContent);	

	console.log(selectedGeo);
	console.log(filterGeo);
	console.log(selectedIndustry);
	loadData();

});

