let camVideo = document.querySelector("#cam-video");

function drawCanvas() {
  findSmallestSide();

  let startX = camWidth / 2 - smallSide / 2;

  canvas
    .getContext("2d")
    .drawImage(camVideo, startX, 0, smallSide, smallSide, 0, 0, 120, 120);
}

let smallSide;

function findSmallestSide() {
  smallSide = camWidth > camHeight ? camHeight : camWidth;
}
