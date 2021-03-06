// require express and create an application that uses an express server
var express = require('express')
var app = express()
var fs = require('fs');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser);

// when the user goes to the website at /, return the index.html file
app.get('/', function (req, res) {
  var fileToSend = "recordV2.html";
   // The html file is stored in the "public" folder
  res.sendfile(fileToSend, {root: './public'});

})

// Route for receiving POST
// https://itp.nyu.edu/~sve204/dwd_spring2018/express_basics.html
// POST ROUTE
// Save to database


// hi shawn! i tried this: https://stackoverflow.com/a/24003932
app.post("/newPost", function(req, res){
  // console.log(req.body);
  var buf = new Buffer(req.body.blob, 'base64'); // decode
  fs.writeFile("test.wav", buf, function(err) {
    if(err) {
      console.log("err", err);
    } else {
      return res.json({'status': 'success'});
    }
  });

});


// when the user goes to the website at /, return the index.html file
app.get('/newsfeed', function (req, res) {
  // Get from Database and create a template with database info included

  var fileToSend = "newsfeedV2.html";
   // The html file is stored in the "public" folder
  res.sendfile(fileToSend, {root: './public'});
})

// this website is runnign on port 3000. the express server will listen there
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// the express server is allowed to serve static files from the folder named public
app.use(express.static('public'));
