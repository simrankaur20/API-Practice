//JSON - JavaScipt object notation
// for any two servers to communicate they communicate using the JSON format that is the standard format
//JSON format is very similar to JavaScript objects
// has key value pairs
//Json data can easily be nested
//XML is also a format, like JSON, can also be used (more longer and a bit difficult to use)

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/" , function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/" , function(req,res){
    console.log(req.body.crypto);
})

request("https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD" , function(error,message,body) {
    console.log(body);
})

app.listen(3000 , function(){
    console.log("server is running on port 3000");
});

//bitcoin average api is being used