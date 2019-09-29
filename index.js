//JSON - JavaScipt object notation
// for any two servers to communicate they communicate using the JSON format that is the standard format
//JSON format is very similar to JavaScript objects
// has key value pairs
//Json data can easily be nested
//XML is also a format, like JSON, can also be used (more longer and a bit difficult to use)


//JSON.stringify() - Javascript object to JSON
//JSON.parse() - JSON to Javascript object

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/" , function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/" , function(req,res){
    //    console.log(req.body.crypto);
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    // storing values that user chose

    //we wish to generate request to api as per the values chosen by server

    var baseURL = "https://apiv2.bitcoinaverage.com/indices/local/ticker/" ;

    var finalURL = baseURL + crypto + fiat;

    request(finalURL , function(error,response,body) {
        // hum api se request karenge to resonse milega in body in JSON form , convert it into Javascript object

        var data = JSON.parse(body);
        var price = data.last;
        
        res.send("<h1> The current price of " + crypto + " is : " + price + fiat + "</h1>" );
    });
})
app.listen(3000 , function(){
    console.log("server is running on port 3000");
});

//bitcoin average api is being used