var search = $("#search-button")
var inputcity = $(".enter")
var currentday = $(".currentday")
var clearbtn = $(".clear")
var listcities = [];
var dayscontainer = $("<div>").attr("id", "dayscontainer")
currentday.append(dayscontainer)
var validCities = ["New York", "Los Angeles", "Chicago", "Miami"]; // Add your valid city names here

var loopExecuted  = false;

$(document).ready(function() {

  
          search.on("click", function renderdays() {
        // Get the value entered in the input with class "enter"
        var inputValue = inputcity.val().trim();
        console.log(inputValue);


        // validation to make sure that the user input a valid city 
        if (!isValidCity(inputValue)) {
          var alert = $("<div>").addClass("alert alert-danger").attr("role", "alert").text("Invalid city name. Please try again!");
          var button = $("<button>").attr("id", "closealert").attr("type", "button").addClass("close").attr("data-dismiss", "alert").attr("aria-label", "Close").text("X")
          
          // code to remove the alert when displayed
          button.on("click", function(){
           alert.remove();

          })
          // Clear any previous alerts
            $(".alert").remove();

            // Append the alert to the header
            alert.append(button);
            $("header").append(alert);

            return; // Stop the function execution
      }
        // Clear the input field

        // Create and append a list item below the button with class "clear"
        var lysting = $("<button>").addClass("btn btn-primary cities").attr("id", inputValue).text( inputValue);
        $(".card-sidebar").append(lysting);


        // inputValue =  "";
        
        currentday.css("visibility", "visible");

          listcities.push(lysting.attr("id"));
          console.log(listcities)


        // creates and appends the following day's forecats to the layout 

      if (!loopExecuted) {
        for (let i = 0; i < 4; i++) {

          var days = $("<div>").addClass("card text-dark bg-light mb-3").css("max-width", "18rem").attr("id", "day" + i)
          dayscontainer.append(days);
  
          var header = $("<div>").addClass("card-header").text(" date day: " + i)
          days.append(header)
  
          var body = $("<div>").addClass("card-body").text(" Icon wheaather type day: " + i)
          days.append(body)
  
          var temp = $("<p>").addClass("card-text").text("Tempt: " + i )
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
    });
    function isValidCity(inputValue) {
      return validCities.includes(inputValue);
  }
});