$(document).ready(function() {
  var animals = ["Lions", "Tigers", "Cheetahs", "Leopards", "Hyenas"];

// Code to get Gif's
  $(document).on("click", ".animal-button", function() {
    $("#animals").empty();
    $(".animal-button").removeClass("active");
    $(this).addClass("active");

    var clickedAnimal = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + clickedAnimal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div class=\"animal-item\">");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;
        var animalGif = $("<img>");
        animalGif.attr("src", still);
        animalGif.attr("data-still", still);
        animalGif.attr("data-animate", animated);
        animalGif.attr("data-state", "still");
        animalGif.addClass("animal-image");
        animalDiv.append(p);
        animalDiv.append(animalGif);
        $("#animals").append(animalDiv);
      }
    });
  });

// Code to make the Gif start/stop
  $(document).on("click", ".animal-image", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });


// Code to Add new Buttons
function addButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }
  }

$("#add-animal").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("input").eq(0).val();
    if (newAnimal.length > 2) {
      animals.push(newAnimal);
    }
      addButtons(animals, "animal-button", "#animal-buttons");
  });
    addButtons(animals, "animal-button", "#animal-buttons");
});
