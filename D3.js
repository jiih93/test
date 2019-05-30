'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function () {
  $(document).ready(function () {
    tableau.extensions.initializeAsync().then(function () {
      	tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "category-sales")
    .getDataSourcesAsync().then(datasources =>{
    	dataSource = datasources.find(datasource => datasource.name === "Sample - Superstore");
  		return dataSource.getUnderlyingDataAsync();
  	})
  	.then(dataTable => {
  		let field = dataTable.columns.find(column => column.fieldName === "Sub-Category");
    	let list = [];
    	for (let row of dataTable.data) {
        	list.push(row[field.index].value);
    	}
    	let values = list.filter((el, i, arr) => arr.indexOf(el) === i);
    
    	console.log(values)
		});
    }, function (err) {
      // Something went wrong in initialization.
      console.log('Error while Initializing: ' + err.toString());
    });
  });


})();
