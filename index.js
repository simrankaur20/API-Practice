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

    var amount = req.body.amount;
    // storing values that user chose

    //we wish to generate request to api as per the values chosen by server

    var baseURL = "https://apiv2.bitcoinaverage.com/convert/global" ;

    var finalURL = baseURL + crypto + fiat;
    // to provide arguments to api - use options
    var options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global" ,
        method: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
        } 
    }
    request(options , function(error,response,body) {
        // hum api se request karenge to resonse milega in body in JSON form , convert it into Javascript object

        var data = JSON.parse(body);
        console.log("data is: " + data);
        var price = data.price;
        
        console.log(price);
        // we cant send multiple things using res.send()
        // therefore we use res.write()to send multiple responses to temporary storage
        //uske baad we can do res.send()

        var currdate = data.time;

        res.write("<p> the current date is " + currdate + "</p>");
        res.write("<h1> " + amount + crypto + " is currently worth : " + price + fiat + "</h1>")
        res.send();
    });
})
app.listen(3000 , function(){
    console.log("server is running on port 3000");
});

//bitcoin average api is being used