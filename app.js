const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    // console.log(req.body.cityName); //****to access user input 
    const query = req.body.cityName; //gives name of city that user entered //*****by using {body-parser} method we are able to take user input to display data

    const apikey = "enter your api key here"
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+units+"&appid="+apikey;

    https.get(url, function (response) {
        console.log(response.statusCode);
        
        response.on("data", function (data) {
            // console.log(data);
            
            const weatherdata = JSON.parse(data); //{JSON.parse(data)} used to get beautifully formated data from API
            
            // console.log(weatherdata);
            // console.log(weatherdata.main.temp);
            // console.log(weatherdata.name);
            // console.log(weatherdata.weather[0].description);
            // console.log(weatherdata.weather[0].icon);
            var temp = weatherdata.main.temp;
            const description = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            // const object = {
            //     name : "kaveri" ,
            //     food : "Dosa",
            //     education : "BE"
            // }
            // console.log(JSON.stringify(object)); //{JSON.stringify(data)} used to send as json row format data 
            
            res.write("<style>body{background-color: #dbebfc;color: #333333; font-family: Arial, font-size: smaller;Helvetica, sans-serif;max-width: 650px;margin: 0 auto;padding: 0 16px;min-height: 100vh;display: flex;flex-direction: column;margin-top: 120px;;}</style><h1>The temperature in "+ query +" is "+temp+ " degree celcius.</h1>");
            res.write("<style>body{background-color: #dbebfc;color: #333333; font-family: Arial,    font-size: smaller; Helvetica, sans-serif;max-width: 650px;margin: 0 auto;padding: 0 16px;min-height: 100vh;display: flex;flex-direction: column;margin-top: 120px;;}</style><h1>The weather is currently: "+description+".</h1>");
            res.write("<style>img{display: block;margin-left: auto;margin-right: auto;width: 50%;}</style><img src=" + imageURL + ">");
            res.send();
            // res.send("<h1>The temparature in Paris is " +temp+ " degree celcius</h1>");
        })
    })
})

app.listen(3000, function () {
    console.log("Server running on port 3000");
})
