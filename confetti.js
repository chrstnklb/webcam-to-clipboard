let confettiSwitch = document.querySelector("#confettiSwitch");

let localStorageFieldConfetti = "allowConfetti";

// set confetti true on the first time the page is loaded and the localStorage is empty
console.log(localStorage.getItem(localStorageFieldConfetti));
localStorage.setItem(
  localStorageFieldConfetti,
  localStorage.getItem(localStorageFieldConfetti) !== "false" // true when (true or null)
);

// load confetti when page is loaded again
confettiSwitch.checked = confettIsAllowed();

confettiSwitch.addEventListener("change", async function () {
  localStorage.setItem(localStorageFieldConfetti, this.checked);
});

function throwConfetti() {
  if (confettIsAllowed()) {
    confetti({
      origin: {
        x: 0.5,
        y: 0.45,
      },
      particleCount: 100,
      startVelocity: 10,
      spread: 360,
    });
  }
}

function confettIsAllowed() {
  return localStorage.getItem(localStorageFieldConfetti) === "true";
}
