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
var holding_cities = [];

// Helepr function that initializes stored_cities from local storage if it is available, setting it to an empty array if it is not
function init() {
    var holder = JSON.parse(localStorage.getItem("stored_cities"));

    if(holder === null) {
        stored_cities = [];
    } else {
        stored_cities = holder;
    }
}

// Helper function that saves stored_cities into local storage
function save() {
    localStorage.setItem("stored_cities", JSON.stringify(stored_cities));
}

// Helper function 
function get_API(name) {
    var request_url = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&units=imperial&appid=345c2b977bf428b0cb7c91b0d2ca9226`;

    fetch(request_url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data.list);
            // localStorage.setItem("holding_cities", JSON.stringify(data.list));
            holding_cities = JSON.parse(JSON.stringify(data.list)); // I hate the need for deep copies so much, why are pointers so dumb
            return ;
        })
}

// Need a builder function for page layout
function build_page_layout(name, weather_list) {
    // var time = moment();
    // $("#banner_header").text(`${name} (${time.format("L")})`);
    // $("#date_1").text(time.add(1, "days").format("L"));
    // $("#date_2").text(time.add(1, "days").format("L"));
    // $("#date_3").text(time.add(1, "days").format("L"));
    // $("#date_4").text(time.add(1, "days").format("L"));
    // $("#date_5").text(time.add(1, "days").format("L"));

    // console.log(weather_list[0]);
    $("#banner_header").text(`${name} (${moment.unix(weather_list[0].dt).format("L")})`);
    var counter = 1;
    for(var i = 7; i < 40; i+=7) {
        $(`#date_${counter}`).text(moment.unix(weather_list[i].dt).format("L"));
        $(`#image_${counter}`).text(name);
        counter++;
    }
}

// Event listener for search button
search_button.on("click", function(event) {
    event.preventDefault();
    city_name = city_name_search.val();

        var button_tag = $(`<button type="button" 
        class="btn btn-secondary btn-lg btn-block list-group-item list-group-item-action"
        id="${city_name}_button">
        ${city_name}
        </button>`)
        city_list.append(button_tag);
        if(!stored_cities.includes(city_name)) {
            stored_cities.push(city_name);
            save();
        }

        // get_API(city_name);
        
        // var banner_header = document.querySelector("#banner_header");
        // banner_header.textContent = `${city_name} (${time.format("L")})`; 

        // holding_cities = get_API(city_name);
        // holding_cities = JSON.parse(localStorage.getItem("holding_cities"));
        console.log(holding_cities);
        // build_page_layout(city_name, holding_cities);

        // Event listener for city buttons
        $("#" + city_name + "_button").on("click", function(event) {
            event.preventDefault();
            console.log("clicked " + city_name + " side button");
        });
});

init();