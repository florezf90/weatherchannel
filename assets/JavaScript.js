const search = $("#search-button");
const inputcity = $(".enter");
const currentday = $(".currentday");
const clearbtn = $(".clear");
const sidebar = $(".card-sidebar");
const dayscontainer = $("<div>").attr("id", "dayscontainer");
currentday.append(dayscontainer);
let listcities = JSON.parse(localStorage.getItem("city: ")) || [];

function clearLocalStorage() {
    localStorage.removeItem("city: ");
    listcities = [];
    $(".cities").remove();
}

function renderDayInfo(data, dayIndex, dayCard) {
    const dayData = data.list?.[dayIndex];
    if (dayData) {
        const date = new Date(dayData.dt * 1000).toLocaleDateString();
        dayCard.find(".card-header").text("Date: " + date);
        const body = dayCard.find(".card-body").empty();
        const description = dayData.weather[0].description;
        const weatherIconClass = description.includes("rain") ? "fa-cloud-showers-heavy" :
            description.includes("cloud") ? "fa-cloud" :
            description.includes("sun") ? "fa-sun" : "fa-brands fa-skyatlas";
        body.append(
            $("<p>").addClass("card-text").text("Weather: " + description),
            $("<i>").addClass("fas " + weatherIconClass),
            $("<p>").addClass("card-text").text("Temperature: " + dayData.main.temp + "°C"),
            $("<p>").addClass("card-text").text("Humidity: " + dayData.main.humidity + "%"),
            $("<p>").addClass("card-text").text("Wind Speed: " + dayData.wind.speed + " m/s")
        );
    }
}

$(document).ready(function() {
    clearbtn.on("click", clearLocalStorage);

    search.on("click", function() {
        const inputValue = inputcity.val().trim();
        const urlink = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=4d1ecce74c1b33b84518f1a209b03951&units=metric`;
    
        fetch(urlink)
        .then(response => {
            if (!response.ok) throw new Error("Invalid city name. Please try again.");
            return response.json();
        })
        .then(data => {
            const lysting = $("<button>").addClass("btn btn-primary cities").attr("id", inputValue).text(inputValue);
            sidebar.append(lysting);
            currentday.css("visibility", "visible");
            listcities.push(lysting.attr("id"));
            localStorage.setItem("city: ", JSON.stringify(listcities));
            dayscontainer.empty();
            for (let i = 0; i < 5; i++) {
                const days = $("<div>").addClass("card text-dark bg-light mb-3").css("max-width", "18rem").attr("id", "day" + i);
                dayscontainer.append(days);
                const header = $("<div>").addClass("card-header").text("Date: Loading...");
                const body = $("<div>").addClass("card-body");
                days.append(header, body);
                renderDayInfo(data, i * 8, days);
            }
        })
        .catch(error => {
            console.error("Error validating city:", error);
            const alert = $("<div>").addClass("alert alert-danger").attr("role", "alert").text(error.message);
            const button = $("<button>").attr("id", "closealert").attr("type", "button").addClass("close").attr("data-dismiss", "alert").attr("aria-label", "Close").text("X");
            button.on("click", function() {
                alert.remove();
            });
            $(".alert").remove();
            alert.append(button);
            $("header").append(alert);
        });
    });
    
    $(document).on("click", ".cities", function() {
        const cityName = $(this).attr("id");
        const urlink = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=4d1ecce74c1b33b84518f1a209b03951&units=metric`;
        fetch(urlink)
        .then(response => {
            if (!response.ok) throw new Error("Invalid city name. Please try again.");
            return response.json();
        })
        .then(data => {
            dayscontainer.empty();
            for (let i = 0; i < 5; i++) {
                const days = $("<div>").addClass("card text-dark bg-light mb-3").css("max-width", "18rem").attr("id", "day" + i);
                dayscontainer.append(days);
                const header = $("<div>").addClass("card-header").text("Date: Loading...");
                const body = $("<div>").addClass("card-body");
                days.append(header, body);
                renderDayInfo(data, i * 8, days);
            }
        });
    });

    if (listcities) {
        listcities.forEach(city => {
            const history = $("<button>").text(city).addClass("btn btn-primary cities");
            sidebar.append(history);
        });
    }
});
