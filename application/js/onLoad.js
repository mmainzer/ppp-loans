// function to detect Internet Explorer

const isInternetExplorer = () => {
	return window.navigator.userAgent.match(/(MSIE|Trident)/);
}

const showBrowserAlert = () => {
	if(isInternetExplorer()){
       // Do not show initial form
       $("#form").hide();
       $("#browserAlert").show();
    } else {
    	console.log('All good');
    }
}

// function for number formatting
Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
}

// Initialize the dropdowns as select2 dropdowns via jquery plugin
$(document).ready(function() {
    $('.dropdown').select2({
	    width: '90%'
	});

    showBrowserAlert();

    loadData();

});

const loadData = () => {

	$(".loader").show();

	// if Datatable currently exists, then clear and kill it
	if ( $.fn.dataTable.isDataTable('#pointsTable') ) {
		$('#pointsTable').DataTable().destroy();
	}
	$("#pointsTable_paginate").remove();
	// clear existing html from table
  	$("#pointsTable tbody").empty();
	
	let folder = (selectedData[0]).toLowerCase()+'Sub/';
	let area = (selectedData[0]).toLowerCase()+(selectedGeo[0]).replace(/ /g, "");
	area = area.replace(",","%2C");

	let url = urlStart+'/'+folder+area+'.csv';

	console.log(url);

	d3.csv(url, d3.autoType)
		.then( (data) => {
			console.log("data retrieved");
			console.log(data);
			buildTable(data);

		});
}