var search = $("#search-button")
var inputcity = $(".enter")
var currentday = $(".currentday")
var clearbtn = $(".clear")
var listcities = [];
var dayscontainer = $("<div>").attr("id", "dayscontainer")
currentday.append(dayscontainer)
var loopExecuted  = false;





$(document).ready(function() {


          search.on("click", function renderdays() {
        // Get the value entered in the input with class "enter"
        var inputValue = inputcity.val().trim();
        console.log(inputValue);
        var urlink = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=4d1ecce74c1b33b84518f1a209b03951`;
        console.log(urlink);


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
            $(".card-sidebar").append(lysting);

            currentday.css("visibility", "visible");
            listcities.push(lysting.attr("id"));
            console.log(listcities);

            // Create and append the following day's forecasts to the layout
            if (!loopExecuted) {
                for (let i = 0; i < 5; i++) {
                    var days = $("<div>").addClass("card text-dark bg-light mb-3").css("max-width", "18rem").attr("id", "day" + i)
                    dayscontainer.append(days);

                    var header = $("<div>").addClass("card-header").text(" date day: " + i)
                    days.append(header)

                    var body = $("<div>").addClass("card-body").text(" Icon weather type day: " + i)
                    days.append(body)

                    var temp = $("<p>").addClass("card-text").text("Temp: " + i )
                    body.append(temp)

                    var humidity = $("<p>").addClass("card-text").text("Humidity: " + i )
                    body.append(humidity)
                }
                loopExecuted = true; 
            }


            clearbtn.on("click", function () {
        
              listcities.length = 0;
              lysting.remove();
      
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

    
  
});










