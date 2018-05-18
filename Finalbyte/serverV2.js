// require express and create an application that uses an express server
var https = require('https');
var fs = require('fs');

var credentials = {
  key: fs.readFileSync('my-key.pem'),
  cert: fs.readFileSync('my-cert.pem')
};

var express = require('express')
var app = express()

var httpsServer = https.createServer(credentials, app);

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

var createBuffer = require('audio-buffer-from')
var toWav = require('audiobuffer-to-wav')

// hi shawn! i tried this: https://stackoverflow.com/a/24003932
app.post("/newPost", function(req, res){
  var buf = new Buffer(req.body.blob, 'base64'); // decode
  var namename = req.body.name.trim().replace(/\s/g, '');
  fs.writeFile("public/audio/sounds_"+Date.now()+"_"+namename+".webm", buf, function(err) {
    if(err) {
      console.log("err", err);
    } else {
      return res.json({'status': 'success'});
    }
  });
});



app.get("/getAudioLinks", function(req, res){
  var sounds = [];
  fs.readdir("./public/audio/", function(err, items) {
      for (var i=0; i<items.length; i++) {
          sounds.push("/audio/" + items[i]);
          if(i == items.length -1){
            return res.json({'sounds': sounds});

          }
      }
  });

})


// when the user goes to the website at /, return the index.html file
app.get('/newsfeed', function (req, res) {
  // Get from Database and create a template with database info included

  var fileToSend = "newsfeedV2.html";
   // The html file is stored in the "public" folder
  res.sendfile(fileToSend, {root: './public'});
})

// this website is runnign on port 3000. the express server will listen there
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })

// Default HTTPS Port
// on server this:
httpsServer.listen(443);
// on local this
// app.listen(3000);

// the express server is allowed to serve static files from the folder named public
app.use(express.static('public'));


//remove visible names of files
//play all, pause, skip
//form to put name in before sharing
