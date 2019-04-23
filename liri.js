require("dotenv").config();
var fs = require("fs");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var colors = require("colors");
var name = "";
var artist = "";

var command = process.argv[2];

if (process.argv[3]) {
  name = process.argv.slice(3).join(" ");
} 

doCommand(command);

function doCommand(command) {
  switch (command) {
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
      console.log(
        "\nSorry...I didn't understand the command. Please try again."
      );
      console.log("\nAvailable commands are:");
      console.log("1) node liri.js concert-this <artist/band name here>");
      console.log("2) node liri.js spotify-this-song <song name here>");
      console.log("3) node liri.js movie-this <movie name here>");
      console.log("4) node liri.js do-what-it-says\n");
  }
}

function concertThis() {
  if (name === ""){
    name = "caro emerald";
  }
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        name +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      if (response.error) {
        return console.log("Error occurred: " + error);
      } else {
      if (response.data.length) {
        for (i = 0; i < response.data.length; i++) {
          var item = response.data[i];
          console.log("\nLineup: ".cyan + (item.lineup.join(", ")).yellow);
          console.log("Venue: ".cyan + item.venue.name.yellow);
          var location = "";
          location += item.venue.city + ", ";
          if (item.venue.region != "") {
            location += item.venue.region + ", ";
          }
          location += item.venue.country;
          console.log("Location: ".cyan + location.yellow);
          console.log(
            "Date: ".cyan + moment(item.datetime).format("MM/DD/YYYY").yellow
          );
        }
      } else {
        console.log(("\nNo upcoming performances found for " + name + ".").red);
      }
    }
    });
}

function spotifyThis() {
  if (name === ""){
    name = "the sign ace of base";
  }
  spotify.search({ type: "track", query: name, limit: 10 }, function(
    err,
    response
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    } else {
      //console.log(JSON.stringify(response, null, 2));
      var items = response.tracks.items;
      for (i = 0; i < items.length; i++) {
        artist = "";
        for (j = 0; j < items[i].artists.length; j++) {
          if (j === 0) {
            artist += items[i].artists[j].name;
          } else {
            artist += ", " + items[i].artists[j].name;
          }
        }
        console.log("\nArtist: ".cyan + artist.yellow);
        console.log("Title: ".cyan + items[i].name.yellow);
        if (items[i].preview_url) {
          console.log("Preview: ".cyan + items[i].preview_url.yellow);
        } else {
          console.log(
            "Preview: ".cyan +
              ("https://open.spotify.com/track/" + items[i].id).yellow
          );
        }
        console.log("Album: ".cyan + items[i].album.name.yellow);
      }
    }
  });
}

function movieThis() {
  if (name === ""){
    name = "mr nobody";
  }
  axios
    .get("https://www.omdbapi.com/?apikey=3d5f8d07&t=" + name)
    .then(function(response) {
      var imdbRating = "";
      var rtRating = "";
      console.log("\nTitle: ".cyan + response.data.Title.yellow);
      console.log("Year: ".cyan + response.data.Year.yellow);
      for (i = 0; i < response.data.Ratings.length; i++) {
        if (response.data.Ratings[i].Source === "Internet Movie Database") {
          imdbRating = response.data.Ratings[i].Value;
        } else if (response.data.Ratings[i].Source === "Rotten Tomatoes") {
          rtRating = response.data.Ratings[i].Value;
        }
      }
      console.log("IMDB Rating: ".cyan + imdbRating.yellow);
      console.log("Rotten Tomatoes Rating: ".cyan + rtRating.yellow);
      console.log("Country: ".cyan + response.data.Country.yellow);
      console.log("Language: ".cyan + response.data.Language.yellow);
      console.log("Plot: ".cyan + response.data.Plot.yellow);
      console.log("Actors: ".cyan + response.data.Actors.yellow);

      //console.log(response.data);
    })
    .catch(function(error){
      console.log(error);
    })
}

function doThis() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    var dataArr = data.split(",");
    command = dataArr[0];
    name = dataArr[1];
    doCommand(command);
  });
}
