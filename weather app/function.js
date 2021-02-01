const request = require("postman-request");

const getGeoCode = (address, callback) => {
  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoiam9lbW9uMDB4IiwiYSI6ImNra2l5dWw0djFyeHUyeHF0Y2ZsZzF0aW4ifQ.bZnKp4_zuSXkiR0YYzwlXA&limit=1`;
  request({ url, json: true }, (err, res, body) => {
    if (err) {
      callback("Unable to connect to network", undefined);
    } else if (body.features.length == 0) {
      callback("No such place ", undefined);
    } else {
      callback(undefined, {
        lattitude: body.features[0].geometry.coordinates[1],
        longitude: body.features[0].geometry.coordinates[0],
        placeName: body.features[0].place_name,
      });
    }
  });
};

const getWeatherData = (lat, long, callback) => {
  let url = `http://api.weatherstack.com/current?access_key=67c165f0096dfa421735a106e07c751f&query=${lat},${long}
  `;
  request({ url, json: true }, (err, res, body) => {
    if (err) {
      callback("Unknown error", undefined);
    } else {
      callback(undefined, body);
    }
  });
};
module.exports = { getGeoCode, getWeatherData };
