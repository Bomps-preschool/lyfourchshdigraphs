const questions = [
  { image: "chick.png", word: "_ick", answer: "ch", spoken: "chick" },
  { image: "shoe.png", word: "_oe", answer: "sh", spoken: "shoe" },
  { image: "sheep.png", word: "_eep", answer: "sh", spoken: "sheep" },
  { image: "chair.png", word: "_air", answer: "ch", spoken: "chair" },
  { image: "shirt.png", word: "_irt", answer: "sh", spoken: "shirt" },
  { image: "chalk.png", word: "_alk", answer: "ch", spoken: "chalk" },
  { image: "chain.png", word: "_ain", answer: "ch", spoken: "chain" },
  { image: "ship.png", word: "_ip", answer: "sh", spoken: "ship" },
  { image: "shop.png", word: "_op", answer: "sh", spoken: "shop" },
  { image: "shark.png", word: "_ark", answer: "sh", spoken: "shark" }
];

let current = 0;
let score = 0;
let locked = false;

const splash = document.getElementById("splash");
const startScreen = document.getElementById("startScreen");
const game = document.getElementById("game");
const endScreen = document.getElementById("endScreen");

const startBtn = document.getElementById("startBtn");
const againBtn = document.getElementById("againBtn");
const hearBtn = document.getElementById("hearBtn");

const itemImage = document.getElementById("itemImage");
const wordBox = document.getElementById("wordBox");
const instruction = document.getElementById("instruction");

const progress = document.getElementById("progress");
const scoreBox = document.getElementById("score");

const feedback = document.getElementById("feedback");
const confetti = document.getElementById("confetti");

const finalScore = document.getElementById("finalScore");

const music = document.getElementById("music");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

const answerButtons = document.querySelectorAll(".answerBtn");


/* BACKGROUND MUSIC */

function playMusic() {
    music.volume = 0.15;

    music.play().catch(() => {});
}


/* SHOW QUESTION */

function showQuestion() {

    locked = false;

    const q = questions[current];

    itemImage.src = "assets/" + q.image;
    itemImage.alt = q.spoken;

    /* Written instruction */
    instruction.textContent =
        "Tap on the digraph cha or sha to complete the word.";

    /* Show incomplete word */
    wordBox.innerHTML =
        '<span class="blank">__</span>' +
        q.word.substring(1);

    progress.textContent =
        (current + 1) + " / " + questions.length;

    scoreBox.textContent =
        "⭐ " + score;

    answerButtons.forEach(button => {
        button.classList.remove("correct", "wrong");
        button.disabled = false;
    });

    /* Voice instruction */
    speak(
        "Look at the picture. " +
        "Tap on the digraph cha or sha to complete the word."
    );
}


/* CHECK ANSWER */

function checkAnswer(button) {

    if (locked) {
        return;
    }

    const selected = button.dataset.answer;
    const q = questions[current];

    /* CORRECT ANSWER */

    if (selected === q.answer) {

        locked = true;

        button.classList.add("correct");

        answerButtons.forEach(btn => {
            btn.disabled = true;
        });

        score++;

        scoreBox.textContent =
            "⭐ " + score;

        showCorrect();

        /*
         * Speak the completed word.
         * For sheep, the voice specifically says "Sheep".
         */
        if (q.spoken === "sheep") {

            speak(
                "Correct! Well done! Sheep."
            );

        } else {

            speak(
                "Correct! Well done! " +
                q.spoken + "."
            );
        }


        /* Move to next question */

        setTimeout(() => {

            current++;

            if (current >= questions.length) {

                finishGame();

            } else {

                showQuestion();

            }

        }, 1500);


    } else {

        /* WRONG ANSWER
           Stay on the same question. */

        button.classList.add("wrong");

        showWrong();

        speak(
            "Try again. Look carefully."
        );

        setTimeout(() => {

            button.classList.remove("wrong");

        }, 800);
    }
}


/* CORRECT FEEDBACK */

function showCorrect() {

    feedback.textContent = "✓";

    feedback.style.color = "#43A047";

    feedback.classList.remove("hidden");

    correctSound.currentTime = 0;

    correctSound.play().catch(() => {});

    makeConfetti();

    setTimeout(() => {

        feedback.classList.add("hidden");

    }, 1000);
}


/* WRONG FEEDBACK */

function showWrong() {

    feedback.textContent = "✕";

    feedback.style.color = "#E53935";

    feedback.classList.remove("hidden");

    wrongSound.currentTime = 0;

    wrongSound.play().catch(() => {});

    setTimeout(() => {

        feedback.classList.add("hidden");

    }, 800);
}


/* CONFETTI */

function makeConfetti() {

    confetti.innerHTML = "";

    const colours = [
        "#ff6b6b",
        "#ffd43b",
        "#69db7c",
        "#4dabf7",
        "#cc5de8",
        "#ff922b"
    ];

    for (let i = 0; i < 65; i++) {

        const piece =
            document.createElement("div");

        piece.className = "piece";

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.backgroundColor =
            colours[i % colours.length];

        piece.style.animationDelay =
            Math.random() * 0.25 + "s";

        confetti.appendChild(piece);
    }

    setTimeout(() => {

        confetti.innerHTML = "";

    }, 1400);
}


/* START GAME */

function startGame() {

    current = 0;

    score = 0;

    locked = false;

    startScreen.classList.add("hidden");

    endScreen.classList.add("hidden");

    game.classList.remove("hidden");

    playMusic();

    showQuestion();
}


/* FINISH GAME */

function finishGame() {

    game.classList.add("hidden");

    endScreen.classList.remove("hidden");

    finalScore.textContent =
        "You scored " +
        score +
        " out of 10!";

    speak(
        "Great job! You scored " +
        score +
        " out of 10."
    );
}


/* START BUTTON */

startBtn.addEventListener(
    "click",
    startGame
);


/* PLAY AGAIN */

againBtn.addEventListener(
    "click",
    startGame
);


/* HEAR BUTTON */

hearBtn.addEventListener(
    "click",
    () => {

        const q = questions[current];

        speak(
            "Look at the picture. " +
            "Tap on the digraph cha or sha " +
            "to complete the word."
        );
    }
);


/* TOUCH + MOUSE SUPPORT
   Works on laptop, Android and iOS. */

answerButtons.forEach(button => {

    button.addEventListener(
        "pointerup",
        (event) => {

            event.preventDefault();

            checkAnswer(button);
        }
    );

});


/* 5-SECOND INNOVINE SPLASH */

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            splash.style.display = "none";

            startScreen.classList.remove(
                "hidden"
            );

        }, 5000);

    }
);
