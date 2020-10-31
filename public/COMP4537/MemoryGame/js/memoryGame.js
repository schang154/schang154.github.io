const INITIAL_GRID_SIZE = 3;
const INITIAL_TIME_TO_REMEMBER_PATTERN = 1000;
const INITIAL_LEVEL = 1;
const INITIAL_NUM_OF_MISTAKE_ALLOWED = 0;
const INITIAL_TILE_COUNT = 3;
const INITIAL_EASINESS = 3;
const INITIAL_BONUS = 3;
const LEVEL_LIMIT = 5;
const FLIP_AUDIO_PATH = "./src/cardFlip_thump.mp3";
const LEVEL_AUDIO_PATH = "./src/levelCompleteSound.mp3";
const GAME_OVER_AUDIO_PATH = "./src/gameOver.mp3";
const BUTTON_AUDIO_PATH = "./src/buttonClick.mp3";
const GAME_COMPLETE_AUDIO_PATH = "./src/wowSound.mp3";
const WINNING_MESSAGE = "Congratulations";
const GAME_OVER_MESSAGE = "GAME OVER";
const FINAL_SCORE_MESSAGE = "Your final score: ";

let scoreContainer = document.getElementById("score");
let tileCountContainer = document.getElementById("tile-number");
let chanceContainer = document.getElementById("chance");
let gameBox = document.getElementById("game-box");
let gridBox = document.getElementById("grid-box");
let endContainer = document.getElementById("end-container");
let engMessage = document.getElementById("end-message");
let endModal = document.getElementById("end-modal");
let submitForm = document.getElementById("submit-form");
let terminateMessage = endModal.getElementsByTagName("P")[0];
let finalScore = document.getElementById("final-score");
let playButton = document.getElementById("play-button");
let resetButton = document.getElementById("reset");
let terminateButton = document.getElementById("terminate");
let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");

let closeModalSpan = document.getElementById("close-modal");

let flipAudio = new Audio(FLIP_AUDIO_PATH);
let levelAudio = new Audio(LEVEL_AUDIO_PATH);
let gameOverAudio = new Audio(GAME_OVER_AUDIO_PATH);
let buttonAudio = new Audio(BUTTON_AUDIO_PATH);
let gameCompleteAudio = new Audio(GAME_COMPLETE_AUDIO_PATH);
flipAudio.muted;
levelAudio.muted;
gameOverAudio.muted;
buttonAudio.muted;
gameCompleteAudio.muted;

let scoreTracker = 0;
let tileCountTracker = INITIAL_TILE_COUNT;
let wrongTilesClicked = false;
let numOfMistakesAllowed = INITIAL_NUM_OF_MISTAKE_ALLOWED;
let gridSize = INITIAL_GRID_SIZE;
let level = INITIAL_LEVEL;
let easiness = INITIAL_EASINESS;
let perfectBonus = INITIAL_BONUS;


/* card */
class cardConstructor {
    constructor(number) {
        this.card = makeFlipCard();
        this.tag = false;
        this.number = number;
    }
}

function updateContent(container, Description ,count) {
    container.innerHTML = Description + ": " + count;
}

function unclickable(element) {
    element.classList.add("unclickable");
}

function clickable(element) {
    element.classList.remove("unclickable");
}

function addScore(card) {
    scoreTracker++;
    tileCountTracker--;
    updateContent(scoreContainer, "Score", scoreTracker);
    updateContent(tileCountContainer, "Tile", tileCountTracker);
    unclickable(card);
}

function deductScore(card) {
    scoreTracker--;
    wrongTilesClicked = true;
    numOfMistakesAllowed--;
    updateContent(chanceContainer, "Chance", numOfMistakesAllowed);
    updateContent(scoreContainer, "Score", scoreTracker);
    unclickable(card);
}

function makeFlipCard() {
    let flipCard = document.createElement("BUTTON");
    flipCard.setAttribute("CLASS", "flip-card");
    let flipCardInner = document.createElement("DIV");
    flipCardInner.setAttribute("CLASS", "flip-card-inner");
    let flipCardFront = document.createElement("DIV");
    flipCardFront.setAttribute("CLASS", "flip-card-front");
    let flipCardBack = document.createElement("DIV");
    flipCardBack.setAttribute("CLASS", "flip-card-back");
    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);
    flipCard.appendChild(flipCardInner);
    flipCard.classList.add("visible");
    return flipCard;
}

function generateRandomNumberArray(size, numOfTiles) {
    let randomNumArray = [];
    let count = 0;
    while (count < numOfTiles) {
        let randomNumber = Math.floor(Math.random() * size * size);
        if (!(randomNumArray.includes(randomNumber))) {
            randomNumArray.push(randomNumber);
            count++;
        }
    }
    return randomNumArray;
}

function flipCard(gridBox, cardObject, level, gridSize, initialTime) {

    let cardElement = cardObject.card;
    unclickable(cardElement);
    cardElement.onclick = ()=> {
        flipAudio.play().then( ()=> {

            let cardBack = cardElement.getElementsByClassName("flip-card-inner")[0];
            cardBack.classList.add("flip180");

            if (cardObject.tag) {
                addScore(cardElement);
            } else {
                deductScore(cardElement);
            }
            checkEndGame(gridBox, level, gridSize, initialTime);
        });
    };
}

function createGridBox(gridSize, numOfTile, level, initialTime) {
    tileCountTracker = numOfTile;
    gridBox.style.display = "grid";
    let boxSize = "40px ";

    // assign grid sizes
    let griRowSize = '';
    for (let i = 0; i < gridSize; i++) {
        griRowSize+=boxSize;
    }
    let gridColSize = '';
    for (let j = 0; j < gridSize; j++) {
        gridColSize+=boxSize;
    }
    gridBox.style.gridTemplateRows = griRowSize;
    gridBox.style.gridTemplateColumns = gridColSize;


    // append grid boxes to the gamebox div and functionality to each card
    let gridArray = [];
    for (let i = 0; i < gridSize*gridSize; i++) {
        gridArray.push(new cardConstructor());
        let cardObject = gridArray[i];
        cardObject.number = i;
        // add functionality here
        flipCard(gridBox, cardObject, level, gridSize, initialTime);
        gridBox.appendChild(cardObject.card);
    }

    // assign random colored grids
    let randomNumArray = generateRandomNumberArray(gridSize, numOfTile);
    for (let i = 0; i < randomNumArray.length; i++) {
        gridArray[randomNumArray[i]].tag = true;
    }
    for (let i = 0; i < gridSize*gridSize; i++) {
        let cardBack = gridArray[i].card.getElementsByClassName("flip-card-back")[0];
        if (gridArray[i].tag) {
            cardBack.classList.add("red");
        }
    }
    return gridBox;
}

/* Game Logic */
function startNewGame(level, gridSize, numOfTile, initialTime) {
    let gridBox = createGridBox(gridSize, numOfTile, level, initialTime);
    let cardBackArray = gridBox.getElementsByClassName("flip-card-inner");
    let cardArray = gridBox.getElementsByClassName("flip-card");
    let timeToRemember = initialTime + 1000 * level;
    let timeToRotate = timeToRemember + 1000;
    updateContent(chanceContainer, "Chance", numOfMistakesAllowed);
    updateContent(tileCountContainer, "Tile", tileCountTracker);
    updateContent(scoreContainer, "Score", scoreTracker);
    wrongTilesClicked = false;
    levelAudio.play().then( ()=> {

        for (let i = 0; i < cardBackArray.length; i++) {
            let cardBack = cardBackArray[i];
            let card = cardArray[i];

            // flip cards to show player to memorize
            cardBack.classList.add("flip180");

            // wait some time to flip back
            setTimeout(() => {
                cardBack.classList.remove("flip180");
            }, timeToRemember);

            // wait some time to rotate
            setTimeout(() => {
                gridBox.classList.add("rotate90");
                clickable(card);
            }, timeToRotate);
        }
    });
}

function showAllCards(gridBox) {
    let cardBackArray = gridBox.getElementsByClassName("flip-card-inner");
    for (let i = 0; i < cardBackArray.length; i++) {
        let cardBack = cardBackArray[i];

        // flip cards to show player to memorize
        cardBack.classList.add("flip180");
    }
}

function clearGridBox(gridBox) {

    showAllCards(gridBox);

    setTimeout(()=> {
        gridBox.classList.remove("rotate90");
        gridBox.removeAttribute("style");
        // As long as grid-box has a child node, remove it
        while (gridBox.hasChildNodes()) {
            gridBox.removeChild(gridBox.firstChild);
        }
        gridBox.classList.remove("w3-hide");
    }, 800);
}

function resetGame(gridBox) {
    scoreTracker = 0;
    gridSize = INITIAL_GRID_SIZE;
    level = INITIAL_LEVEL;
    tileCountTracker = INITIAL_TILE_COUNT;
    wrongTilesClicked = false;
    numOfMistakesAllowed = INITIAL_NUM_OF_MISTAKE_ALLOWED;
    easiness = INITIAL_EASINESS;
    perfectBonus = INITIAL_BONUS;

    showAllCards(gridBox);

    setTimeout(()=>{
        endContainer.classList.remove("w3-hide");
        engMessage.classList.remove("w3-hide");
        gridBox.classList.add("w3-hide");
        clearGridBox(gridBox);
        setTimeout(()=>{resetButton.classList.remove("w3-hide")}, 1000);
    },800);

    resetButton.onclick = ()=> {
        buttonAudio.play().then(()=> {
            endContainer.classList.add("w3-hide");
            engMessage.classList.add("w3-hide");
            resetButton.classList.add("w3-hide");
            startNewGame(level, gridSize, tileCountTracker,
                INITIAL_TIME_TO_REMEMBER_PATTERN);
        });
    }
}

function endGame(gridBox, audio, message) {
    audio.play().then( ()=> {
        engMessage.innerHTML = message;
        resetGame(gridBox);
    });
}

function checkEndGame(gridBox, level, gridSize, initialTime) {

    // game over
    if (scoreTracker < 0 || numOfMistakesAllowed < 0 && level === 1) {
        endGame(gridBox, gameOverAudio, GAME_OVER_MESSAGE);

      // game levels up
    } else if (tileCountTracker === 0 && level < LEVEL_LIMIT) {
        if (!wrongTilesClicked) {
            perfectBonus = (perfectBonus > 0) ? perfectBonus++ : 0;
            scoreTracker+=perfectBonus;
        }
        level++;
        gridSize++;
        let numOfTile = Math.floor((gridSize * gridSize) / easiness);
        clearGridBox(gridBox);
        numOfMistakesAllowed = level-1;
        setTimeout(()=>{startNewGame(level, gridSize, numOfTile, initialTime)}, 1000);

      // wrong tile clicked
    } else if (tileCountTracker > 0 && wrongTilesClicked && numOfMistakesAllowed < 0) {
        let numOfTile = Math.round((gridSize * gridSize) / ++easiness);
        perfectBonus = (perfectBonus > 0) ? perfectBonus-- : 0;
        clearGridBox(gridBox);
        numOfMistakesAllowed = level-1;
        setTimeout(()=>{startNewGame(level, gridSize, numOfTile, initialTime)}, 1000);

        // game complete
    } else if (tileCountTracker === 0 && level === LEVEL_LIMIT) {
        endGame(gridBox, gameCompleteAudio,WINNING_MESSAGE);
    }
}

function resetModal() {
    terminateMessage.classList.remove("w3-hide");
    yesButton.classList.remove("w3-hide");
    noButton.classList.remove("w3-hide");
    submitForm.classList.add("w3-hide");
    endModal.classList.remove("w3-show");
}

function startGame() {
    playButton.onclick = () => {
        buttonAudio.play().then( ()=> {
            playButton.classList.add("w3-hide");
            gameBox.classList.remove("w3-hide");
            startNewGame(level, gridSize, tileCountTracker, INITIAL_TIME_TO_REMEMBER_PATTERN);
        });
    };

    terminateButton.onclick = () => {
        endModal.classList.add("w3-show");
        finalScore.innerHTML = FINAL_SCORE_MESSAGE + scoreTracker;
    };

    closeModalSpan.onclick = () => {
        endModal.classList.remove("w3-show");
        resetModal();
    };

    noButton.onclick = () => {
        endModal.classList.remove("w3-show");
    };

    yesButton.onclick = () => {
        terminateMessage.classList.add("w3-hide");
        yesButton.classList.add("w3-hide");
        noButton.classList.add("w3-hide");
        submitForm.classList.remove("w3-hide");
        endGame(gridBox, gameOverAudio,GAME_OVER_MESSAGE);
    };
}

startGame();



