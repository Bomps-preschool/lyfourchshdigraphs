/* =====================================
   SH / CH DIGRAPH GAME
   ===================================== */


/* =====================================
   QUESTIONS
   ===================================== */

const questions = [

    {
        image: "chick.png",
        incomplete: "__ick",
        answer: "ch",
        word: "chick"
    },

    {
        image: "shoe.png",
        incomplete: "__oe",
        answer: "sh",
        word: "shoe"
    },

    {
        image: "sheep.png",
        incomplete: "__eep",
        answer: "sh",
        word: "sheep"
    },

    {
        image: "chair.png",
        incomplete: "__air",
        answer: "ch",
        word: "chair"
    },

    {
        image: "shirt.png",
        incomplete: "__irt",
        answer: "sh",
        word: "shirt"
    },

    {
        image: "chalk.png",
        incomplete: "__alk",
        answer: "ch",
        word: "chalk"
    },

    {
        image: "chain.png",
        incomplete: "__ain",
        answer: "ch",
        word: "chain"
    },

    {
        image: "ship.png",
        incomplete: "__ip",
        answer: "sh",
        word: "ship"
    },

    {
        image: "shop.png",
        incomplete: "__op",
        answer: "sh",
        word: "shop"
    },

    {
        image: "shark.png",
        incomplete: "__ark",
        answer: "sh",
        word: "shark"
    }

];


let currentQuestion = 0;
let score = 0;
let locked = false;


/* =====================================
   GET ELEMENTS
   ===================================== */

const game =
    document.getElementById("game");

const startScreen =
    document.getElementById("startScreen");

const endScreen =
    document.getElementById("endScreen");

const itemImage =
    document.getElementById("itemImage");

const wordBox =
    document.getElementById("wordBox");

const instruction =
    document.getElementById("instruction");

const progress =
    document.getElementById("progress");

const scoreBox =
    document.getElementById("score");

const feedback =
    document.getElementById("feedback");

const confetti =
    document.getElementById("confetti");

const finalScore =
    document.getElementById("finalScore");

const music =
    document.getElementById("music");

const correctSound =
    document.getElementById("correctSound");

const wrongSound =
    document.getElementById("wrongSound");

const hearBtn =
    document.getElementById("hearBtn");

const answerButtons =
    document.querySelectorAll(".answerBtn");


/* =====================================
   VOICE FUNCTION
   ===================================== */

function speak(text) {

    if (!("speechSynthesis" in window)) {
        return;
    }

    window.speechSynthesis.cancel();

    const voice =
        new SpeechSynthesisUtterance(text);

    voice.lang = "en-US";
    voice.rate = 0.8;
    voice.pitch = 1.05;
    voice.volume = 1;

    window.speechSynthesis.speak(voice);
}


/* =====================================
   START GAME
   ===================================== */

window.startGame = function () {

    currentQuestion = 0;
    score = 0;
    locked = false;

    startScreen.classList.add("hidden");

    endScreen.classList.add("hidden");

    game.classList.remove("hidden");


    /* Background music */

    music.volume = 0.15;

    music.play().catch(function () {});


    showQuestion();

};


/* =====================================
   SHOW QUESTION
   ===================================== */

function showQuestion() {

    locked = false;

    const question =
        questions[currentQuestion];


    /* Image */

    itemImage.src =
        "assets/" + question.image;

    itemImage.alt =
        question.word;


    /* Instruction */

    instruction.textContent =
        "Tap on the correct digraph to complete the word.";


    /* Incomplete word */

    wordBox.textContent =
        question.incomplete;


    /* Progress */

    progress.textContent =
        (currentQuestion + 1) +
        " / " +
        questions.length;


    /* Score */

    scoreBox.textContent =
        "⭐ " + score;


    /* Reset buttons */

    answerButtons.forEach(
        function(button) {

            button.disabled = false;

            button.classList.remove(
                "correct",
                "wrong"
            );

        }
    );


    /* Speak instruction */

    setTimeout(
        function () {

            speak(
                "Tap on the correct digraph to complete the word."
            );

        },
        200
    );

}


/* =====================================
   ANSWER BUTTONS
   TOUCH + MOUSE
   ===================================== */

answerButtons.forEach(
    function(button) {

        button.addEventListener(
            "pointerup",
            function(event) {

                event.preventDefault();

                checkAnswer(
                    button.dataset.answer,
                    button
                );

            }
        );

    }
);


/* =====================================
   CHECK ANSWER
   ===================================== */

function checkAnswer(
    selectedAnswer,
    button
) {

    if (locked) {
        return;
    }


    const question =
        questions[currentQuestion];


    /* ===============================
       CORRECT
       =============================== */

    if (
        selectedAnswer ===
        question.answer
    ) {

        locked = true;

        score++;

        scoreBox.textContent =
            "⭐ " + score;


        /* Highlight button */

        button.classList.add(
            "correct"
        );


        /* Disable buttons */

        answerButtons.forEach(
            function(btn) {

                btn.disabled = true;

            }
        );


        /* COMPLETE WORD */

        const completedWord =
            document.createElement("span");

        completedWord.className =
            "completedWord";

        completedWord.textContent =
            question.word;


        wordBox.innerHTML = "";

        wordBox.appendChild(
            completedWord
        );


        /* Correct feedback */

        showCorrect();


        /*
         * SAY THE COMPLETED WORD
         *
         * Example:
         * "chair"
         * "sheep"
         */

        setTimeout(
            function() {

                speak(
                    question.word
                );

            },
            450
        );


        /* Next question */

        setTimeout(
            function() {

                currentQuestion++;


                if (
                    currentQuestion >=
                    questions.length
                ) {

                    finishGame();

                }
                else {

                    showQuestion();

                }

            },
            2000
        );

    }


    /* ===============================
       WRONG
       =============================== */

    else {

        /*
         * IMPORTANT:
         * Do not change question.
         * Do not move forward.
         */

        button.classList.add(
            "wrong"
        );


        showWrong();


        setTimeout(
            function() {

                speak(
                    "Try again."
                );

            },
            100
        );


        setTimeout(
            function() {

                button.classList.remove(
                    "wrong"
                );

            },
            800
        );

    }

}


/* =====================================
   CORRECT FEEDBACK
   ===================================== */

function showCorrect() {

    feedback.textContent =
        "✓";

    feedback.style.color =
        "#43A047";

    feedback.classList.remove(
        "hidden"
    );


    correctSound.currentTime = 0;

    correctSound.play().catch(
        function () {}
    );


    createConfetti();


    setTimeout(
        function() {

            feedback.classList.add(
                "hidden"
            );

        },
        1000
    );

}


/* =====================================
   WRONG FEEDBACK
   ===================================== */

function showWrong() {

    feedback.textContent =
        "✕";

    feedback.style.color =
        "#E53935";

    feedback.classList.remove(
        "hidden"
    );


    wrongSound.currentTime = 0;

    wrongSound.play().catch(
        function () {}
    );


    setTimeout(
        function() {

            feedback.classList.add(
                "hidden"
            );

        },
        800
    );

}


/* =====================================
   CONFETTI
   ===================================== */

function createConfetti() {

    confetti.innerHTML = "";


    const colours = [
        "#ff6b6b",
        "#ffd43b",
        "#69db7c",
        "#4dabf7",
        "#cc5de8",
        "#ff922b"
    ];


    for (
        let i = 0;
        i < 60;
        i++
    ) {

        const piece =
            document.createElement("div");

        piece.className =
            "piece";


        piece.style.left =
            Math.random() *
            100 +
            "vw";


        piece.style.backgroundColor =
            colours[
                i % colours.length
            ];


        piece.style.animationDelay =
            Math.random() *
            0.3 +
            "s";


        confetti.appendChild(
            piece
        );

    }


    setTimeout(
        function() {

            confetti.innerHTML = "";

        },
        1500
    );

}


/* =====================================
   HEAR BUTTON
   ===================================== */

hearBtn.addEventListener(
    "pointerup",
    function(event) {

        event.preventDefault();

        speak(
            "Tap on the correct digraph to complete the word."
        );

    }
);


/* =====================================
   FINISH GAME
   ===================================== */

function finishGame() {

    game.classList.add(
        "hidden"
    );

    endScreen.classList.remove(
        "hidden"
    );


    finalScore.textContent =
        "You scored " +
        score +
        " out of 10!";


    setTimeout(
        function() {

            speak(
                "Great job! You scored " +
                score +
                " out of 10."
            );

        },
        300
    );

}
