let gameContainer = document.getElementById("game-container");
let gameBoxWidth = document.getElementsByClassName("w3-text-black")['']

function createBox(row, col) {
    let gameBox = document.createElement("DIV");
    gameBox.setAttribute("id", "game-box");

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            let cell = document.createElement("DIV");
            cell.style.height = ""
        }
    }

    gameContainer.appendChild(gameBox);

}