const INITIAL_GRID_SIZE = 3;
const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;
const GAME_CONTAINER = document.getElementById("game-container");

class gridBox {
    constructor(number) {
        this.box = makeFlipCard();
        this.tag = false;
        this.number = number;
    }
}

function makeFlipCard() {
    let flipCard = document.createElement("DIV");
    flipCard.setAttribute("CLASS", "flip-card");
    let flipCardInner = document.createElement("DIV");
    flipCardInner.setAttribute("CLASS", "flip-card-inner");
    flipCardInner.onclick = () => {
        flipCardInner.classList.add("flip180");
    };
    let flipCardFront = document.createElement("DIV");
    flipCardFront.setAttribute("CLASS", "flip-card-front");
    let flipCardBack = document.createElement("DIV");
    flipCardBack.setAttribute("CLASS", "flip-card-back");
    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);
    flipCard.appendChild(flipCardInner);
    return flipCard;
}

function generateRandomNumberArray(size) {
    let randomNumArray = [];
    let count = 0;
    while (count < size) {
        let randomNumber = Math.floor(Math.random() * size * size);
        if (!(randomNumArray.includes(randomNumber))) {
            randomNumArray.push(randomNumber);
            count++;
        }
    }
    return randomNumArray;
}

function createBox(row, col, random) {
    let gameBox = document.createElement("DIV");
    gameBox.setAttribute("ID", "grid-box");
    gameBox.style.display = "grid";
    let boxSize = "30px ";

    // append grid boxes to the gamebox div
    let gridArray = [];
    for (let i = 0; i < row*col; i++) {
        gridArray.push(new gridBox());
        gridArray[i].number = i;
        gameBox.appendChild(gridArray[i].box);
    }

    let randomNumArray = generateRandomNumberArray(random);
    for (let i = 0; i < randomNumArray.length; i++) {
        gridArray[randomNumArray[i]].tag = true;
    }

    // assign random colored grids
    for (let i = 0; i < row*col; i++) {
        let cardBack = gridArray[i].box.getElementsByClassName("flip-card-back")[0];
        if (gridArray[i].tag) {
            cardBack.style.background = "red";
        }
    }

    // assign grid sizes
    let griRowSize = '';
    for (let i = 0; i < col; i++) {
        griRowSize+=boxSize;
    }
    let gridColSize = '';
    for (let j = 0; j < col; j++) {
        gridColSize+=boxSize;
    }
    gameBox.style.gridTemplateRows = griRowSize;
    gameBox.style.gridTemplateColumns = gridColSize;

    return gameBox;
}

function gameLogic() {
    let gameBox = document.createElement("DIV");
    gameBox.setAttribute("ID", "game-box");
    let gridBox = createBox(INITIAL_GRID_SIZE, INITIAL_GRID_SIZE, INITIAL_GRID_SIZE);
    gameBox.appendChild(gridBox);
    GAME_CONTAINER.appendChild(gameBox);

    setTimeout(()=> {
        gridBox.classList.add("rotate90");
    }, 1000);
}

gameLogic();