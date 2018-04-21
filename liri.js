// Node.js for Liri Homework

// require("./dotenv").config();
// var fs = require("fs");



// fs.readFile("keys.js", "utf8", function(err, data) {
//     if (err) {
//       return console.log(err);
//     }
  
//     // Break the string down by comma separation and store the contents into the output array.
//     var output = data.split(",");
  
//     // Loop Through the newly created output array
//     for (var i = 0; i < output.length; i++) {
  
//       // Print each element (item) of the array/
//       console.log(output[i]);
//     }
//   });



var keys = require("./keys.js");

console.log(keys);

var action = process.argv[2];
console.log("action: " + action);

for (var i = 3; i < process.argv.length; i++) {
    console.log(process.argv[i]);
};  




switch (action) {
    case "my-tweets":
      console.log("option 1")
      doTwitter();
      break;
    case "spotify-this-song":
    console.log("option 2")
      doSpotify();
      break;
    case "movie-this":
      console.log("option 3")
      doOmdb();
      break;
    case "do-what-it-says":
      console.log("option 4")
      doSpotify();
      break;
    default:
      console.log("default branch")
      break;
}

function doOmdb() {
    var movieVar = "";
    if (process.argv[3]) {
        for (var i = 3; i < process.argv.length; i++) {
            if (i === (process.argv.length - 1)) {
                movieVar = movieVar + process.argv[i];
            }
            else
                movieVar = movieVar + process.argv[i] + "+" ;            
        }
    }    
    else {
        movieVar = "Mr.+Nobody";            
    };
    
    console.log("movieVar = " + movieVar);

    var request = require("request");
    request("http://www.omdbapi.com/?t=" + movieVar + "&y=&plot=short&apikey=trilogy", function(error, response, body) {  
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year Released: "+ JSON.parse(body).Released);
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country); 
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);

            console.log(JSON.parse(body));
            
        }
    })
};