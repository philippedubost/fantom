
'use strict';

var videoElement = document.querySelector('video');
var audioSelect = document.querySelector('select#audioSource');
var videoSelect = document.querySelector('select#videoSource');


audioSelect.onchange = getStream;
videoSelect.onchange = getStream;

getStream().then(getDevices).then(gotDevices);

setTimeout(function(){ 
  changeCam();
  hold();
  }, 1020);

function getDevices() {
  // AFAICT in Safari this only gets default devices until gUM is called :/
  return navigator.mediaDevices.enumerateDevices();
}

function gotDevices(deviceInfos) {
  window.deviceInfos = deviceInfos; // make available to console
  console.log('Available input and output devices:', deviceInfos);
  for (const deviceInfo of deviceInfos) {
    const option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'audioinput') {
      option.text = deviceInfo.label || `Microphone ${audioSelect.length + 1}`;
      audioSelect.appendChild(option);
    } else if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    }
  }
}

function getStream() {
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  const audioSource = audioSelect.value;
  const videoSource = videoSelect.value;
  const constraints = {
    audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };
  return navigator.mediaDevices.getUserMedia(constraints).
    then(gotStream).catch(handleError);
}

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  audioSelect.selectedIndex = [...audioSelect.options].
    findIndex(option => option.text === stream.getAudioTracks()[0].label);
  videoSelect.selectedIndex = [...videoSelect.options].
    findIndex(option => option.text === stream.getVideoTracks()[0].label);
  videoElement.srcObject = stream;
}

function handleError(error) {
  console.error('Error: ', error);
}

function changeCam(){
  if( videoSelect.selectedIndex == "0"){
    videoSelect.selectedIndex = "1";
    getStream();
  } else {
    videoSelect.selectedIndex = "0";
    getStream();
  }
}


//Audio
var audioAmbient = new Howl({
  src: ['audio/ambient.mp3'],
  autoplay: true,
  loop: true
});
var audioRelease = new Howl({
  src: ['audio/release.mp3']
});
var audioMove = new Howl({
  src: ['audio/move.mp3'],
  loop: true
});
var audioPush = new Howl({
  src: ['audio/push.mp3']
});
var audioJump = new Howl({
  src: ['audio/ollie.mp3']
});
  
//Animation 
function hold(){
  
  audioAmbient.play();
  audioMove.stop();
  //window.alert("hold")
  document.getElementById("fantom").style.animation = "playHold 1s steps(10) infinite alternate";
  document.getElementById("fantom").style.background = "url('img/hold.png') left center";

  
}

function move(){
  //window.alert("move")  

  document.getElementById("fantom").style.animation = "playRelease";
  setTimeout(function(){ 
    document.getElementById("fantom").style.background = "url('img/release.png') left center";  
    document.getElementById("fantom").style.animation = "playRelease 1.8s steps(18) infinite";
    audioRelease.play();
  
    }, 50);

  setTimeout(function(){ 
    document.getElementById("fantom").style.background = "url('img/move.png') left center";  
    document.getElementById("fantom").style.animation = "playMove 1s steps(4) infinite";
    audioMove.play();
    }, 1800);
  
  
  
}

function jump(){
  //window.alert("jump")
  audioMove.stop();
  document.getElementById("fantom").style.animation = "none";
  setTimeout(function(){ 
    document.getElementById("fantom").style.animation = "";
    document.getElementById("fantom").style.background = "url('img/jump.png') left center";
  
    }, 50);
  
  setTimeout(function(){ 
    document.getElementById("fantom").style.background = "url('img/move.png') left center";
    }, 1020);
  }

  function trick(){
    //window.alert("trick")
    
    audioMove.stop();
    document.getElementById("fantom").style.animation = "none";
    setTimeout(function(){ 
      document.getElementById("fantom").style.animation = "";
      document.getElementById("fantom").style.background = "url('img/jump.png') left center";
    
      }, 50);
    
    setTimeout(function(){ 
      document.getElementById("fantom").style.background = "url('img/move.png') left center";
      }, 1020);
  }