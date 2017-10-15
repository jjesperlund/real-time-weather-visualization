const request = require('request');
const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


let apiKey = '****************'; //CHANGE THIS BEFORE PUSHING!!!!!!!
let city = 'Norrkoping';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

app.use(express.static(__dirname + '/lib'));

app.get('/', function (req, res) {
      res.sendFile('visualization.html' , { root : __dirname});
  })

//Socket connection
io.on('connection', function(socket){
    console.log('client connected');

    socket.on('getData', (city, res) => {
        console.log("Client requested data about city: " + city);

        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        
        request(url, function (err, response, body) {
            if(err){
                console.log('error:', error);
                res("Data could not be fetched");
            } else {
                //return JSON.parse(body);
                res(JSON.stringify(body)); //Send weather data to client
            }
        });

    });

});

io.on('connect_error', function(){
    console.log('Connection Failed');
});


http.listen(3000, function () {
console.log('Example app listening on port 3000!')
})
