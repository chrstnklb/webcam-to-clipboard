let cameraButton = document.querySelector("#activate-button");

cameraButton.addEventListener("click", async function () {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  let stream_settings = stream.getVideoTracks()[0].getSettings();
  // actual width & height of the camera video
  camWidth = stream_settings.width;
  camHeight = stream_settings.height;

  console.log("camWidth :>> ", camWidth);
  console.log("camHeight :>> ", camHeight);

  camVideo.setAttribute("width", "320px");
  camVideo.srcObject = stream;

  flipCanvas();
});

function flipCanvas() {
    let ctx = canvas.getContext("2d");
    ctx.translate(120, 0);
    ctx.scale(-1, 1);
  }