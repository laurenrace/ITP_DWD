var audio = document.getElementById("audio_preview");

navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
navigator.getUserMedia({video: false, audio: true}, function(stream) {
   audio.src = window.URL.createObjectURL(stream);
}, onRecordFail);

var onRecordFail = function (e) {
   console.log(e);
}
