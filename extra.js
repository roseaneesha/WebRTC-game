let video = document.querySelector("#video");
let camOn = document.querySelector(".cam");
let camOff = document.querySelector(".no-cam");
let stopCam = document.querySelector("#btn");

camOn.style.display = "none";

let chunks = [];

const constraints = (window.constraints = {
  audio: false,
  video: true,
});

function capture() {
  window.onCamera = setInterval(async () => {
    camOn.style.display = "block";
    camOff.style.display = "none";

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      window.stream = stream;
      video.srcObject = stream;
      //till here start recording
      window.mediaRecorder = mediaRecorder;

      mediaRecorder.start();

      console.log("media record 1");

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
        console.log("media record 2");
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/mp4" });
        chunks = [];
        console.log("media record 3");

        const recordedMedia = document.createElement("video");
        recordedMedia.controls = true;
        recordedMedia.style.width = "320px";
        recordedMedia.style.height = "240px";

        const recordedMediaURL = URL.createObjectURL(blob);
        recordedMedia.src = recordedMediaURL;

        const downloadButton = document.createElement("a");
        downloadButton.download = "Recorded-Media";
        console.log("media record 4");

        downloadButton.href = recordedMediaURL;
        downloadButton.innerText = "Download it!";
        downloadButton.style.position = "block";
        downloadButton.style.color = "red";
        downloadButton.style.textDecoration = "none";
        console.log("media record 5");

        downloadButton.onclick = () => {
          URL.revokeObjectURL(recordedMedia);
        };
        document.getElementById("record").append(recordedMedia, downloadButton);

        video.srcObject = stream;
        console.log("recording");
      };

      setTimeout(() => {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
        camOff.style.display = "block";
        camOn.style.display = "none";
        console.log("stopped");
      }, Math.floor(Math.random() * (15 - 5) + 1) * 1000);
    });
  }, 5000);
}

function stopCamera() {
  clearInterval(onCamera);
  console.log("ended");
  window.stream.getTracks().forEach((track) => {
    track.stop();
  });
  // console.log("meh");
  camOff.style.display = "block";
  camOn.style.display = "none";
}
