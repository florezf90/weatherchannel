var search = $("#search-button")
var inputcity = $(".enter")




$(document).ready(function() {
          search.on("click", function() {
        // Get the value entered in the input with class "enter"
        var inputValue = inputcity.val();

        // Create a new list item with the entered value
        var listItem = $("<li>").text(inputValue);

        // Append the list item to the div with class "aside"
        $(".aside").append(listItem);

        // Clear the input field
        inputcity.val("");

        // Create and append a list item below the button with class "clear"
        var clearButton = $("<button>").addClass("btn btn-primary citylist").text( inputValue);
        $(".card-sidebar").append(clearButton);
    });
});