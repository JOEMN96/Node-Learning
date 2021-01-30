const getGeoLoc = (stringLoc) => {
  let mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${stringLoc}.json?access_token=pk.eyJ1Ijoiam9lbW9uMDB4IiwiYSI6ImNra2l5dWw0djFyeHUyeHF0Y2ZsZzF0aW4ifQ.bZnKp4_zuSXkiR0YYzwlXA&limit=1`;

  request({ url: mapboxUrl, json: true }, (err, res, body) => {
    let lattitude = body.features[0].geometry.coordinates[1];
    let longitude = body.features[0].geometry.coordinates[0];
    console.log(
      `Your coordinates latitude  ${lattitude} & langitude ${longitude}`
    );
  });
};

module.exports = { getGeoLoc };
