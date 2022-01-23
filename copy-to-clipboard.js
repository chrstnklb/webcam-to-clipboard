let copyCamVideoToClipboard = document.querySelector("#copy-button");
let canvas = document.querySelector("#canvas");

async function copyToClipboard(canvas) {
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

  copyCamVideoToClipboard.addEventListener("click", async function () {
    drawCanvas();
    copyToClipboard(canvas);
    throwConfetti();
  });