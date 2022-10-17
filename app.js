const express = require("express");
const app = express();
const ejs = require("ejs");
const https = require("https");

const api_key = "f8ce1f4cf4ccc0a3fe5068ffd3e49942";
// async fetch API data
async function getWeather(url) {
  let d = await fetch(url);
  let ad = await d.json();
  console.log(ad);
}

// k to c
function ktoC(k) {
  return (k - 273.15).toFixed(2);
}

app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/:city", (req, res) => {
  let { city } = req.params;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  https
    .get(url, (response) => {
      console.log(response.statusCode);
      console.log(response.headers);
      response.on("data", (d) => {
        let djs = JSON.parse(d);
        let { temp } = djs.main;
        let nt = ktoC(temp);
        res.render("weather.ejs", { djs, nt });
      });
    })
    .on("error", (e) => {
      console.log(e);
    });
});
app.listen(3000, () => {
  console.log("port 3000 is listened");
});
