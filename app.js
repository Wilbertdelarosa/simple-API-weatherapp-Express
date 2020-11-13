const express = require('express');
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){

        res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const apiKey = "b2265c91327d69d303f083ba852869b1";
    const query = req.body.cityName;
    const unit = "metric"

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metrics";
    
    https.get(url, function(response){
        response.on("data", function(data){
           const weatherdata =  JSON.parse(data);
           const temp = weatherdata.main.temp;
           const weatherdescription = weatherdata.weather[0].description;
           const icon = weatherdata.weather[0].icon;
           const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
           res.write("<p>Express and API of Openweather</p>");
           res.write("<h1>The weather is currently "+ weatherdescription + "</h1>");
           res.write("<h1>The temperature in " + query + " is "+ temp + " degrees Celcius.</h1>");
           res.write("Icon: <img src = " + imageURL + ">");
           res.send();
        })
    })

})

app.listen(3000, function(){
    console.log("server is running on port 3000");
}) 