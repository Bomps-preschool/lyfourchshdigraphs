/* Web Speech API */

function speak(text) {

    if (!("speechSynthesis" in window)) {
        return;
    }

    window.speechSynthesis.cancel();

    const utterance =
        new SpeechSynthesisUtterance(text);

    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
}


/* Game instruction */

function speakInstruction() {

    speak(
        "Tap on the digraph cha or sha to complete the word."
    );

}


/* Speak the completed word */

function speakWord(word) {

    speak(word);

}
