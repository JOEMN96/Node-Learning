let request = require("postman-request");

let mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/chennai.json?access_token=pk.eyJ1Ijoiam9lbW9uMDB4IiwiYSI6ImNra2l5dWw0djFyeHUyeHF0Y2ZsZzF0aW4ifQ.bZnKp4_zuSXkiR0YYzwlXA&limit=1`;

request({ url: mapboxUrl, json: true }, (err, res, body) => {
  let lattitude = body.features[0].geometry.coordinates[1];
  let longitude = body.features[0].geometry.coordinates[0];
  console.log(
    `Your coordinates latitude  ${lattitude} & langitude ${longitude}`
  );
});

// let url =
//   "http://api.weatherstack.com/current?access_key=67c165f0096dfa421735a106e07c751f&query=london";

// request({ url, json: true }, (err, res, body) => {
//   console.log(
//     `temp is ${body.current.temperature} and wind speed is ${body.current.wind_speed}`
//   );
//   console.log(body.current.temperature);
// });

// Yargs

// let yargs = require("yargs");
// const { command, demandOption } = require("yargs");
// yargs.command({
//   command: "weather",
//   describe: "weather",
//   builder: {
//     location: {
//       describe: "location to search",
//       demandOption: true,
//       type: "string",
//     },
//   },
//   handler({ location }) {
//     log()
//   },
// });

// yargs.parse();
