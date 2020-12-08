const buildTable = (data) => {
	console.log("Building table");

	if (selectedData[0] === "PPP" && selectedIndustry[0] != "All") {
		console.log("Filtering for industry on PPP data");
		data = data.filter(d => { return selectedGeo.includes(d[selectedLevel[0]]) && selectedIndustry.includes(d['Industry-2'])});
	} else if (selectedData[0] === "PPP" && selectedIndustry[0] === "All") {
		console.log("Getting all industries in selected area");
		data.filter(d => { return d[selectedLevel[0]] === selectedGeo[0] });
	} else if (selectedData[0] === "EIDL") {
		data = data.filter(d => {return d[selectedLevel[0]] === selectedGeo[0] });
	}
	console.log(data);

	// if Datatable currently exists, then clear and kill it
	if ( $.fn.dataTable.isDataTable('#pointsTable') ) {
		$('#pointsTable').DataTable().destroy();
	}
	$("#pointsTable_paginate").remove();
	// clear existing html from table
  	$("#pointsTable tbody").empty();

  	// get list of headers
	let str = '<tr>';
	let headers = ['Date','Company','City','County','Amount'];
	if (selectedData[0] === "PPP") {
		headers.push('Industry-3','Industry','Race/Ethnicity','Gender','Veteran','Jobs')
	}
	headers.forEach(function(header) {
		str += '<th>' + header + '</th>';
	});
	str += '</tr>';
	$('#pointsTable thead').html(str);

	let amountTotal = 0;
	let loansTotal = data.length;
	let jobsTotal = 0;

	// create empty array to put all data in correct format into
	let arrAll = [];
	data.forEach(function(d) {
		let tempArray = [];
		let date = formatTime( d.Date );
		let company = d.Recipient;
		let industryThree = d['Industry-3'];
		let industry = d.Industry;
		let race = d.RaceEthnicity;
		let gender = d.Gender;
		let veteran = d.Veteran;
		let city = d.City;
		let county = d.County;
		let amount = d.Amount;
		let jobs = d.Jobs;
		jobsTotal = jobsTotal += jobs;
		amountTotal = amountTotal += amount;
		tempArray.push(date,company,city,county,("$"+amount.format()));
		if (selectedData[0] === "PPP") {
			tempArray.push(industryThree,industry,race,gender,veteran,jobs.format());
			arrAll.push(tempArray);
		} else {
			arrAll.push(tempArray);
		}
		
	});

	$("#amountTotal").text("$"+amountTotal.format());
	
	$("#loansTotal").text(loansTotal.format());
	if (selectedData[0] === "PPP") {
		$("#jobsTotal").text(jobsTotal.format());
	} else {
		$(".jobsTotal").hide();
	}

	// build row and send to html table
	arrAll.forEach(function(rowData) {
		let row = document.createElement('tr');
		rowData.forEach(function(cellData) {
			let cell = document.createElement('td');
			cell.appendChild(document.createTextNode(cellData));
			row.appendChild(cell);
		});
		$("#pointsTable tbody").append(row);
	});

	$(".loader").hide();

	$(".graphic-container-table").show();

	$('#pointsTable').DataTable({
        "pageLength" : 10,
        "paging" : true,
        "searching" : false,
        "bInfo" : false,
        "autoWidth" : true,
        "dom" : "Bfrtip",
        "pagingType" : "full",
        "buttons" : [
	        {extend: 'pdf', text:'Export PDF', title:'Closures/Layoffs in '+selectedGeo[0]},
	        {extend: 'excel',  title:'Closures/Layoffs in '+selectedGeo[0]}
        ],
        
        "colReorder" : false
    });

    // move the pagination element to a fixed position at the bottom of a container
    $("#pointsTable_paginate").appendTo(".table-container");


}