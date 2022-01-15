/** https://usefulangle.com/post/352/javascript-capture-image-from-camera
 * 
 */

let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");

camera_button.addEventListener("click", async function () {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  video.srcObject = stream;
});


click_button.addEventListener("click", async function () {
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  let image_data_url = canvas.toDataURL("image/png");

  // data url of the image
  console.log(image_data_url);

  try {
    const imgURL = image_data_url;
    const data = await fetch(imgURL);
    const blob = await data.blob();
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ]);
    console.log('Image copied.');
  } catch (err) {
    console.error(err.name, err.message);
  }
});