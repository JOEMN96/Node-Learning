let { getGeoCode } = require("./function");
let { getWeatherData } = require("./function");

// uninistall yargs

getGeoCode("colachel", (err, data) => {
  console.log("====================");
  //dataFrom mapbox to get longitude and lattitude
  // console.log(data);
  getWeatherData(data.lattitude, data.longitude, (err, data) => {
    console.log(data);
  });
});
