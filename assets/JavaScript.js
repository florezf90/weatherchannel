// var search = $("#search-button")
// var inputcity = $(".enter")
// var currentday = $(".currentday")
// var clearbtn = $(".clear")
// var sidebar = $(".card-sidebar")
// var listcities = JSON.parse(localStorage.getItem("city: ")) || [];
// var dayscontainer = $("<div>").attr("id", "dayscontainer")
// currentday.append(dayscontainer)
// var loopExecuted  = false;


// $(document).ready(function() {


//           search.on("click", function renderdays() {
            
//         // Get the value entered in the input and appends it to the API link so it is ready to make the call based on the city the user wants 
//         var inputValue = inputcity.val().trim();
//         var urlink = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=4d1ecce74c1b33b84518f1a209b03951`;

//          // this code makes the call to the API in order to get the info we're looking for, and also makes input validation, set's what we 
//          // want to tell the user in case they entered an invalid city name.
//         fetch(urlink)
//         .then(function(response) {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error("Invalid city name. Please try again.");
//             }
//         })
//         .then(function(data) {
//             // Handle valid response data here
//             console.log(data);

//             // the following code creates and appends to the sidebar a history list of all valid cities in the format of buttons 
//             var lysting = $("<button>").addClass("btn btn-primary cities").attr("id", inputValue).text(inputValue);
//             sidebar.append(lysting);
//             currentday.css("visibility", "visible");

//             // this catches the history of search and pushes it to an empty array, which is added to LocalStorage in order to be able to render the items in case the user close the app and come back later
//             listcities.push(lysting.attr("id"));
//             console.log(listcities);
//             localStorage.setItem("city: ", JSON.stringify(listcities))

      
//             clearbtn.on("click", function () {
        
//                 lysting.remove();
//                 localStorage.clear();

        
//               });

//             // Create and append the following day's forecasts to the layout 
//             if (!loopExecuted) {
//                 for (let i = 0; i < 5; i++) {
//                     var days = $("<div>").addClass("card text-dark bg-light mb-3").css("max-width", "18rem").attr("id", "day" + i)
//                     dayscontainer.append(days);

//                     var header = $("<div>").addClass("card-header").text(" date day: " + i)
//                     days.append(header)

//                     var body = $("<div>").addClass("card-body").text(" Icon weather type day: " + i)
//                     days.append(body)

//                     var temp = $("<p>").addClass("card-text").text("Temp: " + i )
//                     body.append(temp)

//                     var humidity = $("<p>").addClass("card-text").text("Humidity: " + i )
//                     body.append(humidity)
//                 }

//                 // this make sure that the following days forecast cards are only generated once.
//                 loopExecuted = true; 
//             }

//              // this clears the history of the search history
//         })

//            // The following code renders an alert with a close button in case the user enter an invalid input
//         .catch(function(error) {
//             console.error("Error validating city:", error);

//             var alert = $("<div>").addClass("alert alert-danger").attr("role", "alert").text(error.message);
//             var button = $("<button>").attr("id", "closealert").attr("type", "button").addClass("close").attr("data-dismiss", "alert").attr("aria-label", "Close").text("X");

//             button.on("click", function() {
//                 alert.remove();
//             });

//             $(".alert").remove();
//             alert.append(button);
//             $("header").append(alert);
//         });


//     });

    
  
//     if (listcities !== null ) {
//         for (let i = 0; i < listcities.length; i++) {
//          listcities[i];
//          var history = $("<button>").text(listcities[i]).addClass("btn btn-primary cities")
//          sidebar.append(history)
         

         
//         clearbtn.on("click", function () {
        
//             history.remove()
    
//           });
      
//         }

//         clearbtn.on("click", function () {
        
//             localStorage.clear();
    
    
//           });
      
//       }
    

  
// });





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
    // Clear local storage
    localStorage.removeItem("city: ");
    
    // Empty the listcities array
    listcities = [];
    
    // Remove the buttons created when #search-button is clicked
    $(".cities").remove();
}


$(document).ready(function() {
    
    clearbtn.on("click", function() {
        clearLocalStorage();
    });

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
            localStorage.setItem("city: ", JSON.stringify(listcities))
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

    if (listcities !== null ) {
            if (listcities !== null ) {
        for (let i = 0; i < listcities.length; i++) {
         listcities[i];
         var history = $("<button>").text(listcities[i]).addClass("btn btn-primary cities")
         sidebar.append(history)
        }
      }
    }
  
     


});










