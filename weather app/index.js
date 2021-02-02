let { getGeoCode } = require("./function");
let { getWeatherData } = require("./function");

// uninistall yargs

let location = process.argv[2];

if (!location) {
  return console.log("Enter proper place name");
}

getGeoCode(location, (err, data) => {
  if (err) {
    return console.log("error");
  }
  getWeatherData(data.lattitude, data.longitude, (err, data) => {
    if (err) {
      return console.log("error");
    }
    console.log(data);
  });
});
