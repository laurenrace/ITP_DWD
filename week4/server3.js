var express = require('express')
var app = express()

// var mongojs = require('mongojs');
// var db = mongojs("lauren_race:Hedgehog_1@localhost:3000/mydb", ["mycollection"]);
//
// db.mycollection.save({"attribute_to_save":"value_to_save"}, function(err, saved) {
//   if( err || !saved ) console.log("Not saved");
//   else console.log("Saved");
// });

// var MongoClient = require('mongodb').MongoClient;
//
// var uri = "mongodb+srv://kay:Hedgehog_1@cluster0.mongodb.net/test";
// MongoClient.connect(uri, function(err, client) {
//    const collection = client.db("test").collection("devices");
//    // perform actions on the collection object
//    client.close();
// });

// var MongoClient = require('mongodb').MongoClient;
//
// var uri = "mongodb://lauren_Race:Hedgehog_1@gettingstarted-shard-00-00-hyjsm.mongodb.net:27017,gettingstarted-shard-00-01-hyjsm.mongodb.net:27017,gettingstarted-shard-00-02-hyjsm.mongodb.net:27017/test?ssl=true&replicaSet=GettingStarted-shard-0&authSource=admin";
// MongoClient.connect(uri, function(err, db) {
//   // Paste the following examples here
//
//   db.close();
// });

// console.log('hi');
// console.log(db);

// Database to store data, don't forget autoload: true
// tk
// var Datastore = require('nedb');
// var db = new Datastore({filename: "data.db", autoload: true});

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.get('/somethingelse', function (req, res) {
  res.send('bye!');
});

app.get('/randomfile', function (req, res) {
  debugger;
	var fileToSend = "trolls.html";
	res.sendfile(fileToSend, {root: './public'}); // Files inside "public" folder



});
app.use(express.static('public'));
