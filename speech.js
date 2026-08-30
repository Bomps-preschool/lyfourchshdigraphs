/* Browser Web Speech API - works without an internet connection
   after the page has loaded. */

function speak(text) {
  if (!("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85;
  utterance.pitch = 1.1;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
}
