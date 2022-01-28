let cameraButton = document.querySelector("#activate-button");
let camVideo = document.querySelector("#cam-video");
let copyCamVideoToClipboard = document.querySelector("#copy-button");
let canvasInFullResolution = document.querySelector("#canvas");

cameraButton.addEventListener("click", activateCameraAndDisplayStream);
copyCamVideoToClipboard.addEventListener("click", shootPicture);

let camWidth, camHeight;

let stream;

async function activateCameraAndDisplayStream() {
  await activateCamera();
  await setCamInputToVideo();
  await calculateSize();
  await flipCanvas();
}

async function activateCamera() {
  stream = await navigator.mediaDevices.getUserMedia({ video: true });
}

async function setCamInputToVideo() {
  camVideo.srcObject = stream;
}

async function calculateSize() {
  let stream_settings = stream.getVideoTracks()[0].getSettings();

  // actual width & height of the camera video
  camWidth = stream_settings.width;
  camHeight = stream_settings.height;
  console.log(`Cam resolution: ${camWidth} x ${camHeight}`);
  canvasInFullResolution.setAttribute("width", camWidth);
  canvasInFullResolution.setAttribute("height", camHeight);
}

async function flipCanvas() {
  let context = canvasInFullResolution.getContext("2d");
  context.translate(camWidth, 0);
  context.scale(-1, 1);
}

async function shootPicture() {
  drawPreview();
  copyToClipboard();
  throwConfetti();
}

async function drawPreview() {
  canvas.getContext("2d").drawImage(camVideo, 0, 0);
}

async function copyToClipboard() {
  let imageDataUrl = canvasInFullResolution.toDataURL("image/png");

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
