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

var blob;
var chunks = [];

// var mongojs = require('mongojs');
// var db = mongojs("lauren_race:Hedgehog1@ds155587.mlab.com:55587/audio-cast", ["audiodb"]);
//
// db.on('connect', function() {
//   console.log('connected to db mothafuckaaaa');
// });
//
// db.on('error', function() {
//   console.log('we had an error.');
// });

function init() {

  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
};
document.addEventListener("load", init);



function startRecorder() {
  timerStart();
  console.log('starting');
  if (navigator.getUserMedia) {
    navigator.getUserMedia({video: false, audio: true}, function(stream) {
        mystream = stream;

        chunks= [];

        var mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.onstop = function(e) {
          console.log("stop", chunks);

          myvideo = document.createElement('video');

          myvideo.controls = true;
          blob = new Blob(chunks, { 'type' : 'video/webm' });
          console.log(blob);
          var videoURL = window.URL.createObjectURL(blob);
          myvideo.src = videoURL;

          // $.ajax({
          //   type: "POST",
          //   url: "/newPost",  // route on express server
          //   data: {data: blob}, // {"response":myvideo.src}
          //   success: function(){console.log("success")},  // function to run when good
          //   // dataType: dataType // JSON
          // });
          // converts blob to base64


          // hi shawn i tried this https://stackoverflow.com/a/24003932
          var blobToBase64 = function(blob, cb) {
            var reader = new FileReader();
            reader.onload = function() {
              var dataUrl = reader.result;
              var base64 = dataUrl.split(',')[1];
              cb(base64);
            };
            reader.readAsDataURL(blob);
          };

          blobToBase64(blob, function(base64){ // encode
            var update = {'blob': base64};
            // $http.post('/api/save_recording', update)
            //   .success(function(new_recording) {
            //     console.log("success");
            //   });

              $.ajax({
                type: "POST",
                url: "/newPost",  // route on express server
                data: update, // {"response":myvideo.src}
                success: function(){console.log("success")},  // function to run when good
                // dataType: dataType // JSON
              });
          });



          var videoDiv = document.getElementById("video-div");
          console.log(videoDiv);
          videoDiv.appendChild(myvideo);
          toggleShareButton();
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

function submitRecording(){

  // THis is code for the server side, express server

//   db.audiodb.save({"response":myvideo.src}, function(err, saved) {
//   if( err || !saved ) console.log("Not saved");
//   else console.log("Saved");
// });

  // Use JQuery to create a form post
  //https://api.jquery.com/jquery.post/
  /*
  $.ajax({
    type: "POST",
    url: url,  // route on express server
    data: data, // {"response":myvideo.src}
    success: success,  // function to run when good
    dataType: dataType // JSON
  });
  */

  // Once you have it sent to server, you can stop with the arrya
  submissions.push(myvideo.src)
  console.log(submissions)

  // After sending to server, then go to newsfeed
  //window.location.href = "http://localhost:3000/newsfeed";

  showSubmissions();
}

function showSubmissions(){
  console.log("Showing Submissions");
  console.log(submissions);

}


function toggleShareButton() {
  // console.log('here');
    var shareButton = document.getElementById("share-button");
    // console.log(shareButton);
    // debugger;
    if (chunks) {
        shareButton.style.display = "inline";
    } else {
        shareButton.style.display = "none";
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
  appendSeconds = document.getElementById("seconds-text");

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
