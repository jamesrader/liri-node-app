require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var name = "";

var command = process.argv[2];

if (process.argv[3]){
    name = process.argv.slice(3).join(" ");
    console.log(name);
}

switch (command){
    case "concert-this":
    console.log("1");
    concertThis();
    break;
    
    case "spotify-this-song":
    console.log("2");
    spotifyThis();
    break;

    case "movie-this":
    console.log("3");
    movieThis();
    break;

    case "do-what-it-says":
    console.log("4");
    doThis();
    break;

    default:
    console.log("\nSorry...I didn't understand the command. Please try again.");
    console.log("\nAvailable commands are:");
    console.log("1) node liri.js concert-this <artist/band name here>");
    console.log("2) node liri.js spotify-this-song <song name here>");
    console.log("3) node liri.js movie-this <movie name here>");
    console.log("4) node liri.js do-what-it-says\n");

}

function concertThis(){

}

function spotifyThis(){

}

function movieThis(){

}

function doThis(){

}