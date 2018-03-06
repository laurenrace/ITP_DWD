<!-- var audio = [];
function saveAudio() {
	var newInput = document.getElementById("writeHere").value;
	//console.log(newInput);

	audio.push(newInput);
  console.log(audio);
} -->
<div style="color: black; font-size: 50px; font-family: Arial, Helvetica, sans-serif; font-weight: bold">Audiogram</div>

<html>
	<head>
		<br> </br>
		lauren_race:
		<title>
		</title>
		<body>
			<br> </br>
		</body>


		<!--
		chrome://flags/
		enable experimental Web Platform
		https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
		-->

		<script type="text/javascript">
			var myvideo = null;
			var mystream = null;

			var init = function() {
				myvideo = document.getElementById('myvideo');

				window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
				navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

				if (navigator.getUserMedia) {
					navigator.getUserMedia({video: false, audio: true}, function(stream) {
							mystream = stream;
							myvideo.src = window.URL.createObjectURL(stream) || stream;
							myvideo.play();

						    var chunks = [];

							var mediaRecorder = new MediaRecorder(stream);

							mediaRecorder.onstop = function(e) {
								console.log("stop");

								var video = document.createElement('video');

								video.controls = true;
								var blob = new Blob(chunks, { 'type' : 'video/webm' });
								var videoURL = window.URL.createObjectURL(blob);
								video.src = videoURL;

      							document.body.appendChild(video);
						    };

						    mediaRecorder.ondataavailable = function(e) {
						    	console.log("data");
      							chunks.push(e.data);
    						};

						    mediaRecorder.start();
								//need to get the recorder to pause and reset

						    setTimeout(function() {
						    	mediaRecorder.stop();
						    }, 16000);


						}, function(err) {
							console.log('Failed to get local stream' ,err);
							alert("Failed to get local stream " + err);
						}
					);
				}
			};


		</script>
	</head>

	<body onload="init()">

		<br>
		<input type="button" name="pushbutton" value="Stop" />
		<input type="reset" name="resetbutton" value="Reset" />
		<!-- <img src="https://www.nrem.iastate.edu/pewi/pewi3/imgs/recordingIcon.gif" height="20" width="20"" /> -->
		<!-- My audiogram: -->
		<video id="myvideo" width="200" height="10" muted controls></video>
		<br>
	</br>
<input type="submit" name="submitbutton" value="Post to Feed" />
	</body>
	</html>
