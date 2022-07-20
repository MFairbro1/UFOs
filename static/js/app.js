// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// Creating a variable to keep track of all the filters as an object
var filters = {};

// Using this function to update the filters
function updateFilters() {

    // Saving the element that was changed as a variable
    let changedElement = d3.select(this);

    // Saving the value that was changed as a variable
    let elementValue = changedElement.property("value");
    console.log(elementValue);

    // Saving the id of the filter that was changed as a variable
    let filterId = changedElement.attr("id");
    console.log(filterId);

  
    // If a filter value was entered then adding that filterId and value
    // to the filters list or otherwise clear filter from filters object
    if (elementValue) {
      filters[filterId] = elementValue;
    }
    else {
      delete filters[filterId];
    }
 
  
    // Calling function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // Using this function to filter the table when data is entered
  function filterTable() {
  
    // Setting the filtered data to the tableData
    let filteredData = tableData;
  
    // Looping through all of the filters and keeping any data that
    // matches the filter values
    Object.entries(filters).forEach(([key, value]) => {
      filteredData = filteredData.filter(row => row[key] === value);
    });
    
  
    // Rebuilding the table using the filtered data
    buildTable(filteredData);
  }
  
  // Attaching an event to listen for changes to each filter
  d3.selectAll("input").on("change", updateFilters);
  
  // Building the table when the page loads
  buildTable(tableData);
