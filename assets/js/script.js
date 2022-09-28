// const weatherDays = []  
// let currDay = null

// sampleData.list.forEach( function(tsObj){

//   // Makes a moment date object for each record
//   const dateObj = moment.unix(tsObj.dt)

//   // Generate the day # for the day in the date object
//   const dateNum = dateObj.format("DDD")

//   // If the current date in tsObj hasn't had a record put into weatherDays, do that now 
//   // Then skip over all other records for this day
//   if( dateNum !== currDay && weatherDays.length < 5 ){
//     weatherDays.push( tsObj )
//     currDay = dateNum
//   }

// })

var search_button = $("#search_button");
var city_name_search = $("#city_name_search");
var city_list = $("#city_list");

var city_name = "";
var stored_cities = [];

// Need an init function from local storage

// Need a save function for local storage

// Need a fetch calling function for the API

search_button.on("click", function(event) {
    event.preventDefault();
    city_name = city_name_search.val();

    var button_tag = $(`<button type="button" 
    class="btn btn-secondary btn-lg btn-block list-group-item list-group-item-action"
    id="${city_name}_button">
    ${city_name}
    </button>`)
    city_list.append(button_tag);
    stored_cities.push(city_name);

    $(`#${city_name}_button`).on("click", function(event) {
        event.preventDefault();
        console.log(`clicked ${city_name}`);
    });
});