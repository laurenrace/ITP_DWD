var submissions =[];

var myvideo = null;
var mystream = null;

var seconds = 10;
var tens = 00;
var appendSeconds;

var Interval ;

var blob;
var chunks = [];

function init() {

  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
};
document.addEventListener("load", init);

function sendChunkToServer(the_chunks){
  blob = new Blob(the_chunks, { 'type' : 'video/webm' });
  var videoURL = window.URL.createObjectURL(blob);

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
  let username = document.getElementById("namebox").value;
  console.log(username);
  blobToBase64(blob, function(base64){ // encode
    var update = {'blob': base64, 'name': username };
      $.ajax({
        type: "POST",
        url: "/newPost",  // route on express server
        data: update, // {"response":myvideo.src}
        success: function(){
          console.log("success");
          showSounds();
      },  // function to run when good
      });
  });
}

let videosDisplayed = [];
let currentlyPlaying = 0;

function showSounds(){
  videosDisplayed = [];
  currentlyPlaying = 0;
  $.ajax({
    type: "GET",
    url: "/getAudioLinks",  // route on express server
    success: function(data){
      console.log("success", data);

      data = data.sounds.reverse();
      let container = document.getElementById("audioContainer");
      container.innerHTML = "";
      console.log(container);
      data.forEach(function(d, i){
        console.log(d, i);
        let vv = document.createElement('div');
        vv.className = "soundWrapper";
        let p = document.createElement('p');
        let name_parts = d.split("_");
        let name = name_parts[name_parts.length-1].split(".")[0];
        p.innerHTML = name;
        let v = document.createElement("video");
        v.src = d;
        v.controls = true;
        vv.appendChild(p);
        vv.appendChild(v);
        v.onended = function(){
          console.log("video ended", videosDisplayed.length);
          currentlyPlaying++;
          if(currentlyPlaying < videosDisplayed.length){
            console.log("playng", currentlyPlaying);

          }else{
            currentlyPlaying = 0;
          }
          videosDisplayed[currentlyPlaying].play();
        };
        videosDisplayed.push(v);
        container.appendChild(vv);
      })
    },  // function to run when good
  });

}
showSounds();

document.getElementById("playAllButton").addEventListener("click", function(){
  // currentlyPlaying=0;
  videosDisplayed[currentlyPlaying].play();
})
document.getElementById("pauseButton").addEventListener("click", function(){
  videosDisplayed[currentlyPlaying].pause();
})
document.getElementById("skipButton").addEventListener("click", function(){
  videosDisplayed[currentlyPlaying].pause();
  // videosDisplayed[currentlyPlaying].reset();

  currentlyPlaying++;
  if(currentlyPlaying < videosDisplayed.length){
    console.log("playng", currentlyPlaying);

  }else{
    currentlyPlaying = 0;
  }
  videosDisplayed[currentlyPlaying].play();
})
document.getElementById("resetButton").addEventListener("click", function(){
  videosDisplayed[currentlyPlaying].pause();
  // videosDisplayed[currentlyPlaying].reset();

  currentlyPlaying = 0;

  videosDisplayed[currentlyPlaying].play();
})

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

          sendChunkToServer(chunks)

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
          }, 10000);
      }, function(err) {
        console.log('Failed to get local stream' ,err);
        alert("Failed to get local stream " + err);
      }
    );
  }
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
   Interval = setInterval(runTimer, 1000);
}

function timerStop() {
  console.log('stop timer');
  clearInterval(Interval);
//  tens = 0;
  seconds = 10;
  appendSeconds.innerHTML = "Posted!";
}



function runTimer () {
  //tens++;

  appendSeconds = document.getElementById("seconds-text");

  //if (tens > 110) {
    console.log("seconds");
    seconds--;
    appendSeconds.innerHTML = "Recording: 0" + seconds;
  //  tens = 0;
  //}

//  if (seconds <1 ){
  //  appendSeconds.innerHTML = seconds;
//  }

}
