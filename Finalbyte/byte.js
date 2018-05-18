// var https = require('https');
// var fs = require('fs'); // Using the filesystem module
//
// var credentials = {
//   key: fs.readFileSync('my-key.pem'),
//   cert: fs.readFileSync('my-cert.pem')
// };
//
// // Start Normal Express Code
// var express = require('express');
// var app = express();

var submissions =[];

var myvideo = null;
var mystream = null;

var seconds = 00;
var tens = 00;
var appendSeconds;
//var buttonStart = document.getElementById('timer-start');
//var buttonStop = document.getElementById('timer-stop');
//var buttonReset = document.getElementById('button-reset');
var Interval ;


var init = function() {
  appendSeconds = document.getElementById("seconds-text");

  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
};

function startRecorder() {
  timerStart();
  console.log('starting');
if (navigator.getUserMedia) {
    navigator.getUserMedia({video: false, audio: true}, function(stream) {
        mystream = stream;

        var chunks = [];

        var mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.onstop = function(e) {
          console.log("stop");

          myvideo = document.createElement('video');

          myvideo.controls = true;
          var blob = new Blob(chunks, { 'type' : 'video/webm' });
          var videoURL = window.URL.createObjectURL(blob);
          myvideo.src = videoURL;

          document.body.appendChild(myvideo);
          };

          mediaRecorder.ondataavailable = function(e) {
            console.log("data");
              chunks.push(e.data);
          };

          mediaRecorder.start();
          //need to get the recorder to pause and reset

          setTimeout(function() {
            mediaRecorder.stop();
            timerStop();
          }, 3000);


      }, function(err) {
        console.log('Failed to get local stream' ,err);
        alert("Failed to get local stream " + err);
      }
    );
  }
}


function resetRecorder() {
  timerStop()
  myvideo.parentNode.removeChild(myvideo)

  //make sure timer is stopped
  //remove child myvideo
  //reset Timer html to zero
  //when reset is pressed, set video to null


}

function submitRecording(){
submissions.push(myvideo.src)
console.log(submissions)
}


  function timerStart() {
    console.log('start timer');
     clearInterval(Interval);
     Interval = setInterval(runTimer, 10);
  }

  function timerStop() {
    console.log('stop timer');
    clearInterval(Interval);
    tens = 0;
    seconds = 0;
  }


  // buttonReset.onclick = function() {
  //    clearInterval(Interval);
  //   tens = "00";
  // 	seconds = "00";
  //   appendTens.innerHTML = tens;
  // 	appendSeconds.innerHTML = seconds;
  // }



  function runTimer () {
    tens++;

    // if(tens < 9){
    //   appendTens.innerHTML = "0" + tens;
    // }
    //
    // if (tens > 9){
    //   appendTens.innerHTML = tens;
    //
    // }

    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      //appendTens.innerHTML = "0" + 0;
    }

    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }

  }

// //https code
//   app.get('/', function(req, res) {
//   	res.send("Hello World!");
//   });
//   /////
//
//   var httpsServer = https.createServer(credentials, app);
//
//   // Default HTTPS Port
//   httpsServer.listen(443);
