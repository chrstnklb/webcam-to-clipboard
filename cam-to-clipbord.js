let cameraButton = document.querySelector("#activate-button");
let camVideo = document.querySelector("#cam-video");
let copyCamVideoToClipboard = document.querySelector("#copy-button");
let canvas = document.querySelector("#canvas");
let smallSide;

let camWidth, camHeight;

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

function findSmallestSide() {
  smallSide = camWidth > camHeight ? camHeight : camWidth;
}

copyCamVideoToClipboard.addEventListener("click", async function () {
  drawCanvas();
  copyToClipboard();
  throwConfetti();
});

function drawCanvas() {
  findSmallestSide();

  let startX = camWidth / 2 - smallSide / 2;

  canvas
    .getContext("2d")
    .drawImage(camVideo, startX, 0, smallSide, smallSide, 0, 0, 120, 120);
}

async function copyToClipboard() {
  let imageDataUrl = canvas.toDataURL("image/png");

  try {
    const imgURL = imageDataUrl;
    const data = await fetch(imgURL);
    const blob = await data.blob();
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
    console.log("Image copied.");
  } catch (err) {
    console.error(err.name, err.message);
  }
}
