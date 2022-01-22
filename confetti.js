let localStorageFieldConfetti = "allowConfetti";

let confettiSwitch = document.querySelector("#confettiSwitch");

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
  return localStorage.getItem(localStorageFieldConfetti) === 'true';
}