let cameraButton = document.querySelector("#activate-cam");
let camVideo = document.querySelector("#cam-video");
let copyCamVideoToClipboard = document.querySelector("#copy-to-clipboard");
let canvas = document.querySelector("#canvas");

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

  camVideo.srcObject = stream;
});

copyCamVideoToClipboard.addEventListener("click", async function () {
  canvas
    .getContext("2d")
    // .drawImage(image,   dx, dy, dWidth,       dHeight);
    // .drawImage(camVideo, 0,  0, canvas.width, canvas.height);
    .drawImage(
      camVideo,
      0,
      0,
      camWidth,
      camHeight,
      0,
      0,
      120,
      120
    );
  // .drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

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
});
