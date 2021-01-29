let request = require("postman-request");

let url =
  "http://api.weatherstack.com/current?access_key=67c165f0096dfa421735a106e07c751f&query=london";

request({ url, json: true }, (err, res, body) => {
  console.log(
    `temp is ${body.current.temperature} and wind speed is ${body.current.wind_speed}`
  );
  console.log(body.current.temperature);
});
