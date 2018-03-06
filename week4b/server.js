
// require express and create an application that uses an express server
var express = require('express')
var app = express()


// when the user goes to the website at /, return the index.html file
app.get('/', function (req, res) {
  var fileToSend = "index.html";

   // The html file is stored in the "public" folder
  res.sendfile(fileToSend, {root: './public'});

})

// this website is runnign on port 3000. the express server will listen there
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// the express server is allowed to serve static files from the folder named public 
app.use(express.static('public'));

