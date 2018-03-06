var https = require('https');
var fs = require('fs'); // Using the filesystem module

var credentials = {
  key: fs.readFileSync('my-key.pem'),
  cert: fs.readFileSync('my-cert.pem')
};

// require express and create an application that uses an express server
var express = require('express')
var app = express()

app.get('/', function(req, res) {
	res.send("Hello World!");
});
/////

var httpsServer = https.createServer(credentials, app);

// Default HTTPS Port
httpsServer.listen(443);


// when the user goes to the website at /, return the index.html file
app.get('/', function (req, res) {
  var fileToSend = "index.html";

   // The html file is stored in the "public" folder
  res.sendfile(fileToSend, {root: './public'});

})

// // this website is runnign on port 3000. the express server will listen there
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })

// the express server is allowed to serve static files from the folder named public
app.use(express.static('public'));
