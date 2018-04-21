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

console.log(action);



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



}