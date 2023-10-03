var search = $("#search-button")
var inputcity = $(".enter")
var currentday = $(".currentday")
var clearbtn = $(".clear")
var sidebar = $(".card-sidebar")
var listcities = JSON.parse(localStorage.getItem("city: ")) || [];
var dayscontainer = $("<div>").attr("id", "dayscontainer")
currentday.append(dayscontainer)
var loopExecuted  = false;


function clearLocalStorage() {
    localStorage.removeItem("city: ");
    listcities = [];
    $(".cities").remove();
}

function renderDayInfo(data, dayIndex, dayCard) {
    // Assuming the API response has an array of daily forecasts in 'data.list'
    if (data.list && data.list.length > dayIndex) {
        var dayData = data.list[dayIndex];

        // Format the date
        var date = new Date(dayData.dt * 1000).toLocaleDateString();

        // Update the card elements with the detailed day information
        dayCard.find(".card-header").text("Date: " + date);
        dayCard.find(".card-body").empty(); // Clear previous content

        // Weather description
        dayCard.find(".card-body").append($("<p>").addClass("card-text").text("Weather: " + dayData.weather[0].description));

        // Temperature
        var temperature = $("<p>").addClass("card-text").text("Temperature: " + dayData.main.temp + "°C");
        dayCard.find(".card-body").append(temperature);

        // Humidity
        var humidity = $("<p>").addClass("card-text").text("Humidity: " + dayData.main.humidity + "%");
        dayCard.find(".card-body").append(humidity);
    }
}

$(document).ready(function() {

    clearbtn.on("click", function() {
        clearLocalStorage();
    });

    search.on("click", function() {
        // Get the value entered in the input with class "enter"
        var inputValue = inputcity.val().trim();
        var urlink = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=4d1ecce74c1b33b84518f1a209b03951&units=metric`;
    
        fetch(urlink)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Invalid city name. Please try again.");
            }
        })
        .then(function(data) {
            // Handle valid response data here
            console.log(data);
    
            // Create and append a list item below the button with class "clear"
            var lysting = $("<button>").addClass("btn btn-primary cities").attr("id", inputValue).text(inputValue);
            sidebar.append(lysting);
    
            currentday.css("visibility", "visible");
            listcities.push(lysting.attr("id"));
            localStorage.setItem("city: ", JSON.stringify(listcities));
            console.log(listcities);
    
            // Clear the existing cards
            dayscontainer.empty();
    
            // Create and append forecasts for the next 5 days
            for (let i = 0; i < 5; i++) {
                var days = $("<div>").addClass("card text-dark bg-light mb-3").css("max-width", "18rem").attr("id", "day" + i);
                dayscontainer.append(days);
    
                // Initialize card with loading text
                var header = $("<div>").addClass("card-header").text("Date: Loading...");
                days.append(header);
    
                var body = $("<div>").addClass("card-body");
                days.append(body);
    
                // Call renderDayInfo to update the card with actual data
                renderDayInfo(data, i * 8, days); // Data for every 8th element (represents a day)
            }
            lysting.on("click", function() {
                // Update the cards with data for the selected city
                for (let i = 0; i < 5; i++) {
                    renderDayInfo(data, i, $("#day" + i));
                }
            });
        })
        .catch(function(error) {
            // Handle errors here
            console.error("Error validating city:", error);
    
            // Display an error message
            var alert = $("<div>").addClass("alert alert-danger").attr("role", "alert").text(error.message);
            var button = $("<button>").attr("id", "closealert").attr("type", "button").addClass("close").attr("data-dismiss", "alert").attr("aria-label", "Close").text("X");
    
            button.on("click", function() {
                alert.remove();
            });
    
            $(".alert").remove();
            alert.append(button);
            $("header").append(alert);
        });
    });

    // Populate sidebar with saved cities
    if (listcities !== null) {
        for (let i = 0; i < listcities.length; i++) {
            var history = $("<button>").text(listcities[i]).addClass("btn btn-primary cities");
            sidebar.append(history);
        }
    }
});
