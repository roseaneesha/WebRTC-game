let video = document.querySelector("#video");
let camOn = document.querySelector(".cam");
let camOff = document.querySelector(".no-cam");
let stopCam = document.querySelector("#btn");

camOn.style.display = "none";

const constraints = (window.constraints = {
  audio: false,
  video: true,
});

function capture() {
  window.onCamera = setInterval(async () => {
    camOn.style.display = "block";
    camOff.style.display = "none";

    await navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
      video.play();
      console.log("recording");
      setTimeout(() => {
        stream.getVideoTracks()[0].stop();
        video.src = "";
        camOff.style.display = "block";
        camOn.style.display = "none";
        console.log("stopped");
      }, Math.floor(Math.random() * 8 + 1) * 1000);
    });
  }, 5000);
}

function stopCamera() {
  clearInterval(onCamera);
  console.log("ended");
  localStream.getVideoTracks()[0].stop();
  stream.getVideoTracks()[0].stop();
  video.src = "";
  console.log("meh");
  camOn.style.display = "block";
}
