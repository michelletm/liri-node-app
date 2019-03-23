const axios = require("axios");
const keys = require("./keys.js");
const fs = require("fs");
let moment = require("moment");
const chalk = require('chalk');

const userInput = process.argv[2].toLowerCase();
let userQuery = process.argv[3];


//////CONCERT-THIS///////////////////////

var concertThis = function(userQuery) {
 
  axios.get(`https://rest.bandsintown.com/artists/${userQuery}/events?app_id=${keys.BAND_ID}`)
  .then( function(response) {
    
    let data = "";
    //console.log(response.data);
    
    console.log(chalk.magenta("Tour/Venue: " + response.data[0].venue.name));
    console.log("Location: " + response.data[0].venue.city);
    console.log("Date: " + (moment(response.data[0].datetime).format("MM/DD/YYYY")));
    data = `Tour/Venue: ${response.data[0].venue.name}\nLocation: ${response.data[0].venue.city}\nDate: ${(moment(response.data[0].datetime).format("MM/DD/YYYY"))}\n\n`
    output(data);
  
  });
};


/////SPOTIFY-THIS-SONG////////////////////////////

var spotifyThis = function(userQuery) {

  const Spotify = require("node-spotify-api");
  const spotify = new Spotify(keys.SPOTIFY_KEY);

  if (!userQuery) {
    userQuery = "The Sign, Ace of Base";

  };

  spotify.search({type: 'track', query: userQuery}, function(err, response) {
     
    let data = "";

    if (err) {
      return console.log(chalk.red('Error Occurred: ' + err));
    }

    console.log(chalk.greenBright("Song: " + response.tracks.items[0].name));
    console.log("Album: " + response.tracks.items[0].album.name);
    console.log("Artist: " + response.tracks.items[0].artists[0].name);
    console.log("Preview: " + response.tracks.items[0].preview_url);

    data = `Song: ${response.tracks.items[0].name}\nArtist: ${response.tracks.items[0].artists[0].name}\n\n`
    output(data);
  
  });

};


////////MOVIE-THIS/////////////////

var movieThis = function(userQuery) {

  if(!userQuery) {
    userQuery = "Mr. Nobody";
  }
  
  axios.get(`http://www.omdbapi.com/?t=${userQuery}&y=&plot=short&apikey=${keys.OMDB_KEY}`).then(
    function(response) {
      
      let data = "";

      console.log(chalk.blueBright("Movie Title: " + response.data.Title));
      console.log("Released: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes: " + response.data.Metascore);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    
    data = `Movie Title: ${response.data.Title}\nReleased: ${response.data.Year}\nActors: ${response.data.Actors}\n\n`;
    output(data);

  });
};


////DO WHAT IT SAYS/////////////////////

var doWhat = function() {
  
  let data = "";
  
  fs.readFile("random.txt", 'utf-8', function(err, response) {

    var result = response.split(",");
    console.log(response.split(','));

      if (err) {
        console.log(chalk.red('Error Occurred: ' + err));
      }
      if(result[0] === "concert-this") {
        console.log(result[1]);
        concertThis(result[1]);
        //console.log(result[1]);
      }
      if(result[0] === "spotify-this-song") {
        spotifyThis(result[1]);
      }
      if(result[0] === "movie-this") {
        movieThis(result[1]);
      }
    
      output(data);
  
  });
  
};


////////BONUS-OUTPUT//////

var output = function(data) {

  fs.appendFile("log.txt", data, function(err) {

    if (err) {
      console.log(err);
    }
 
    else {
      console.log(chalk.yellowBright("Data Added"));
    }
  
  });
};


switch(userInput) {
  case "concert-this":
    concertThis(userQuery);
    break;
  case "spotify-this-song":
    spotifyThis(userQuery);
    break;
  case "movie-this":
    movieThis(userQuery);
    break;
  case "do-what-it-says":
    doWhat();
};  


