require("dotenv").config();

//packages and files required
const keys = require("./keys.js");
const axios = require("axios");
const fs = require("fs");
//variables to hold user input 
let command = process.argv[2];
let searchArgs = process.argv;
let search = "";
//loop to get all of the words in the title, artist, etc the user searches 
for (let i = 3; i < searchArgs.length; i++) {
  if (i > 3 && i < searchArgs.length) {
    search = search + "+" + searchArgs[i];
  } else {
    search += searchArgs[i];
  }
}
//movie variables 
let movieQueryURL = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
//spotify variables 
// const spotify = new Spotify(keys.spotify);
const Spotify = require("node-spotify-api");

switch(command) {
  case "movie-this":
    movieThis(search);
    break; 
  }

function movieThis() {

  axios.get(movieQueryURL).then(
    function(response) {
      if (response.data.Response === "False") {
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
      } else {
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
      }
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
  });
}
