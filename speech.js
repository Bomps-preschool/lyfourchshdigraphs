/* =========================================
   SPEECH / VOICE
   ========================================= */

function speak(text) {

    if (!("speechSynthesis" in window)) {
        return;
    }

    window.speechSynthesis.cancel();

    const utterance =
        new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.rate = 0.82;
    utterance.pitch = 1.05;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
}


/* =========================================
   GAME INSTRUCTION
   ========================================= */

function speakInstruction() {

    speak(
        "Tap on the correct digraph to complete the word."
    );

}


/* =========================================
   SPEAK COMPLETED WORD
   ========================================= */

function speakWord(word) {

    if (!("speechSynthesis" in window)) {
        return;
    }

    window.speechSynthesis.cancel();

    const utterance =
        new SpeechSynthesisUtterance(word);

    utterance.lang = "en-US";
    utterance.rate = 0.75;
    utterance.pitch = 1.05;
    utterance.volume = 1;

    window.speechSynthesis.speak(
        utterance
    );
}
