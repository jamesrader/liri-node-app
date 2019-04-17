require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var colors = require("colors");
var name = "";

var command = process.argv[2];

if (process.argv[3]){
    name = process.argv.slice(3).join(" ");
}

switch (command){
    case "concert-this":
    concertThis();
    break;
    
    case "spotify-this-song":
    spotifyThis();
    break;

    case "movie-this":
    movieThis();
    break;

    case "do-what-it-says":
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
    axios
    .get("https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp")
    .then(function(response){

        if (response.data.length){
        for (i=0; i<response.data.length; i++){
            var item = response.data[i];
        console.log("\nVenue: ".yellow + item.venue.name);
        var location = "";
        location += item.venue.city + ", ";
        if (item.venue.region != ""){
        location += item.venue.region + ", ";
        }
        location += item.venue.country;
        console.log("Location: ".yellow + location);
        console.log("Date: ".yellow + moment(item.datetime).format("MM/DD/YYYY"));
        }
    } else {
        console.log (("\nNo upcoming performances found for " + name + ".").red);
    }

    })
}

function spotifyThis(){

}

function movieThis(){

}

function doThis(){

}