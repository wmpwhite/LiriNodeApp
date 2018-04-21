// Node.js for Liri Homework

require("dotenv").config();
var fs = require("fs");
var Spotify = require("node-spotify-api");
var Twitter = require('twitter');
var keys = require("./keys.js");
console.log(keys);



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

    client.get('statuses/show/987145663493427200', function(error, tweets, response) {
        if(error) throw error;
        console.log(JSON.stringify(tweets));   
        console.log(JSON.stringify(response));  
      });
}




function doSpotify() { 
    var songVar = "";
    if (process.argv[3]) {
        for (var i = 3; i < process.argv.length; i++) {
            if (i === (process.argv.length - 1)) {
                songVar = songVar + process.argv[i];
            }
            else
                songVar = songVar + process.argv[i] + " " ;            
        }
    }    
    else {
        songVar = "The Sign";            
    };

    console.log(songVar);

    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    
    spotify.search({ type: 'track', query: songVar, limit: "1" }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    var trackInfo = data;
    console.log("track information" + trackInfo);

    // console.log(trackInfo.items.album.name);
    // console.log(trackInfo.items.artists.name);
    
    console.log(JSON.stringify(data)); 
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

function doWhat() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if(error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        for (var i = 0; i < dataArr.length; i++) {
            console.log(dataArr[i]);
        }
    })
};