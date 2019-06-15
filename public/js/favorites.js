// Grab the articles as a json
$.getJSON("/favorites", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        if(isSaved === true){

            $("#articles").append("<div class='div1' data-id='" + data[i]._id + "'><h5>" + data[i].title + "</h5><a >" + data[i].link + "</a></div>");
        }
      // Display the apropos information on the page
      // $("#articles").append("<div class='div1'>  </div>")
      
    }
  });
  
  
  // Whenever someone clicks a p tag
  $(document).on("click", ".div1", function() {
    // Empty the notes from the note section
    $('#myModal').modal(open);
    
    $(".modal-title").empty();
    $("#summary").empty();
    $("#notes").empty();
    $("#noteButton").empty();
  
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $(".modal-title").append("<h4>" + data.title + "</h4>");
  
        $("#summary").append("<p>" + data.summary + "</p>");
        // An input to enter a new title
        // $("#notes").append("<input id='titleinput' class='form-control' name='title' ><br>");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput'class='form-control' placeholder='Comment here' name='body'></textarea><br>");
        // A button to submit a new note, with the id of the article saved to it
        $("#noteButton").append("<button data-id='" + data._id + "' class='btn btn-primary m-2' id='isSaved'>Add to Favorites</button>");
        $("#noteButton").append("<button data-id='" + data._id + "' class='btn btn-primary' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
    
    $('#myModal').modal('hide');
  
    // window.location.reload();
  });
  $(document).on("click", "#isSaved", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
      method: "POST",
      url: "/favorites/" + thisId
    })
      .then(function() {
        // If we were able to successfully update an Article, send it back to the client
        console.log("there")
      });
    })
  
  
  
  $(document).on("click", ".close", function() {
  
    $(".modal-title").empty();
    $("#summary").empty();
    $("#notes").empty();
    $("#noteButton").empty();
  
    $('#myModal').modal('hide');
  
    // window.location.reload();
  });