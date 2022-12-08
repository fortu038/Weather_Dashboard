var search_button = $("#search_button");
var city_name_search = $("#city_name_search");
var city_list = $("#city_list");

let city_name = "";
var stored_cities = ["Minneapolis"];
var holding_cities = [];

// Helper function that initializes stored_cities from local storage if it is available, setting it to an empty array if it is not
function init() {
    var holder = JSON.parse(localStorage.getItem("stored_cities"));

    if(holder === null) {
        // var startup_city = "Minneapolis";
        // stored_cities = [startup_city];
        // get_API(startup_city);
        // build_page_layout(startup_city);
        stored_cities = [];
    } else {
        stored_cities = holder;
    }
}

// Helper function that saves stored_cities into local storage
// Note: Use this in the future if I want to save stored cities between refreshes
function save() {
    localStorage.setItem("stored_cities", JSON.stringify(stored_cities));
}

// Helper function that retrieves an API and deep copies it to holding_cities
function get_API(name) {
    var request_url = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&units=imperial&appid=345c2b977bf428b0cb7c91b0d2ca9226`;

    fetch(request_url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            holding_cities = JSON.parse(JSON.stringify(data.list)); // I hate the need for deep copies so much, why are pointers so dumb
            localStorage.setItem("holding_cities", JSON.stringify(holding_cities));
            build_page_layout(name, holding_cities);
            return;
        })
}

// Helper function that adds buttons to the sidebar and builds the main display forecast
function build_page_layout(name, weather_list) {
    $("#banner_header").text(`${name} (${moment.unix(weather_list[0].dt).format("L")})`);
    $("#banner_image").attr("src", `http://openweathermap.org/img/wn/${weather_list[0].weather[0].icon}@2x.png`);
    $("#banner_image").attr("alt", weather_list[0].weather[0].description)
    $("#banner_temp").text(weather_list[0].main.temp);
    $("#banner_wind_speed").text(weather_list[0].wind.speed);
    $("#banner_humidity").text(weather_list[0].main.humidity);
    var counter = 1;
    for(var i = 7; i < 40; i+=7) {
        $(`#date_${counter}`).text(moment.unix(weather_list[i].dt).format("L"));
        $(`#image_${counter}`).attr("src", `http://openweathermap.org/img/wn/${weather_list[i].weather[0].icon}@2x.png`);
        $(`#image_${counter}`).attr("alt", weather_list[i].weather[0].description);
        $(`#temp_${counter}`).text(weather_list[i].main.temp);
        $(`#wind_speed_${counter}`).text(weather_list[i].wind.speed);
        $(`#humidity_${counter}`).text(weather_list[i].main.humidity);
        counter++;
    }
}

// Event listener for search button
search_button.on("click", function(event) {
    event.preventDefault();

    if(stored_cities.length < 1) {
        $("#side_area").removeClass("col-12");
        $("#side_area").addClass("col-3");

        $("#display_area").removeClass("d-none");
    }

    city_name = city_name_search.val();
    let city_name_replaced = city_name_search.val().replace(" ", "_")

    if(!stored_cities.includes(city_name)) {
        var button_tag = $(`<button type="button" 
        class="btn btn-secondary btn-lg btn-block list-group-item list-group-item-action"
        id="${city_name_replaced}_button">
        ${city_name}
        </button>`)
        city_list.append(button_tag);
        stored_cities.push(city_name);
        // save();

        get_API(city_name);

        // Event listener for city buttons
        $("#" + city_name_replaced + "_button").on("click", function(event) {
            event.preventDefault();
            var holder = $(`#${city_name_replaced}_button`).text().trim();
            get_API(holder);
        });
    } else {
        console.log("already here");
    }
});

init();
