

// Node.js for Liri Homework

require("dotenv").config();
var fs = require("fs");
var Spotify = require("node-spotify-api");
var Twitter = require('twitter');
var keys = require("./keys.js");

var songName = "";

var action = process.argv[2];
console.log("action: " + action);


switch (action) {
    case "my-tweets":
      console.log("option 1")
      doTweets();
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
      doWhat();
      break;
    default:
      console.log("default branch")
      break;
}

function doTweets() {
    var client = new Twitter({
        consumer_key: keys.twitter.consumer_key,
        consumer_secret: keys.twitter.consumer_secret,
        access_token_key: keys.twitter.access_token_key,
        access_token_secret: keys.twitter.access_token_secret
    });

    console.log(client);
    var params = {
        screen_name: "node.js",
        id: "987145663493427200"
    }
    client.get('statuses/lookup', params, function(error, tweets, response) {
        if (error) {
            console.log(error);
        } 
        console.log(JSON.stringify(tweets));   
        console.log(JSON.stringify(response));  
      });
}




function doSpotify() { 
    
    if (songName === "") {
        if (process.argv[3]) {
            for (var i = 3; i < process.argv.length; i++) {
                if (i === (process.argv.length - 1)) {
                    songName = songName + process.argv[i];
                }
                else
                    songName = songName + process.argv[i] + " " ;            
            }
        }    
        else {
            songName = "The Sign";            
        };
    }
    console.log(songName);

    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    
    spotify.search({ type: 'track', query: songName, limit: "1" }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

        console.log("Artists: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song Title: " + data.tracks.items[0].name);
        console.log("Preview URL: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
       
    // console.log(JSON.stringify(data)); 
    });
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
            var movieInfo = JSON.parse(body);
            console.log("Title: " + movieInfo.Title);
            console.log("Year Released: "+ movieInfo.Released);
            console.log("IMDB Rating: " + movieInfo.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
            console.log("Country: " + movieInfo.Country); 
            console.log("Language: " + movieInfo.Language);
            console.log("Plot: " + movieInfo.Plot);
            console.log("Actors: " + movieInfo.Actors);

            console.log(movieInfo);
            
        }
    })
};

function doWhat() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if(error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        
        songName = dataArr[1];
        doSpotify();
    })
};