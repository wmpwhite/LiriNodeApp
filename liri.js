

// Node.js for Liri Homework

// the following statements require the necessary npm packages
require("dotenv").config();
var fs = require("fs");
var Spotify = require("node-spotify-api");
var Twitter = require('twitter');
var keys = require("./keys.js");

// variable declared globally for use in both "doSpotify" and "doWhat" functions
var songName = "";

// takes command line input and puts into a variable for use as switch condition, then console logs it
var action = process.argv[2];
console.log("\n" + "action: " + action + "\n");

// switch function to determine which action is required and directs to appropriate function
switch (action) {
    case "my-tweets":
    //   console.log("option 1")
      doTweets();
      break;
    case "spotify-this-song":
    //   console.log("option 2")
      doSpotify();
      break;
    case "movie-this":
    //   console.log("option 3")
      doOmdb();
      break;
    case "do-what-it-says":
    //   console.log("option 4")
      doWhat();
      break;
    default:
    //   console.log("default branch")
      break;
}

// this function fired by "my-tweets" case of switch
function doTweets() {
    // the following assigntwitter keys from keys into client object
    var client = new Twitter({
        consumer_key: keys.twitter.consumer_key,
        consumer_secret: keys.twitter.consumer_secret,
        access_token_key: keys.twitter.access_token_key,
        access_token_secret: keys.twitter.access_token_secret
    });

    // console.log(client);
    
    // client method to get tweets from twitter API
    client.get('statuses/user_timeline', function(error, tweets, response) {
        if (error) {
            console.log(error);
        } 
        // console logs 20 tweets and the dates they were created
        for (var i = 0; i < 20; i++) {
            console.log("Tweet: " + tweets[i].text);
            console.log("Created: " + tweets[i].created_at + "\n");
        }        
    });
}

function doSpotify() { 
    // checks to see if songName is empty or not.  If doSpotify is fired from switch it will be empty.
    // If doSpotify is fired from inside doWhat function it arrives with a value. 
    if (songName === "") {
        // If songName arrives empty, the following code builds it from command line input
        if (process.argv[3]) {
            for (var i = 3; i < process.argv.length; i++) {
                if (i === (process.argv.length - 1)) {
                    songName = songName + process.argv[i];
                }
                else
                    songName = songName + process.argv[i] + " " ;            
            }
        }
        // If songName arrived empty and there is no command line input, defaults to "The Sign"  
        else {
            songName = "The Sign";            
        };
    }
    // console.log(songName);
    // Inserts api keys into spotify object 
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    // The following is the call to spotify api
    spotify.search({ type: 'track', query: songName, limit: "1" }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
        // console logs required information that has been extracted from API
        console.log("Artists: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song Title: " + data.tracks.items[0].name);
        console.log("Preview URL: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
       
    // console.log(JSON.stringify(data)); 
    });
}


function doOmdb() {
    // Initializes a variable movieVar to hold movie name for OMDB API search
    var movieVar = "";
    // This if statement checks to see if there is command line input.
    // If there is, it build the movieVar variable.  Otherwise it default to
    // the movie Mr. Nobody. 
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
    
    // console.log("movieVar = " + movieVar);
    // The following code gets movie data from the OMDB API
    var request = require("request");
    request("http://www.omdbapi.com/?t=" + movieVar + "&y=&plot=short&apikey=trilogy", function(error, response, body) {  
        if (!error && response.statusCode === 200) {
            // the following console logs required information extracted from movie API
            var movieInfo = JSON.parse(body);
            console.log("Title: " + movieInfo.Title);
            console.log("Year Released: "+ movieInfo.Released);
            console.log("IMDB Rating: " + movieInfo.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
            console.log("Country: " + movieInfo.Country); 
            console.log("Language: " + movieInfo.Language);
            console.log("Plot: " + movieInfo.Plot);
            console.log("Actors: " + movieInfo.Actors);

            // console.log(movieInfo);
            
        }
    })
};
// This function reads from a text file, splits the text into two elements of a data array and uses 
// the second element of the array as a song name to use in the doSpotify function that it fires.
function doWhat() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if(error) {
            return console.log(error);
        }
        console.log(data + "\n");
        var dataArr = data.split(",");
        
        songName = dataArr[1];
        doSpotify();
    })
};