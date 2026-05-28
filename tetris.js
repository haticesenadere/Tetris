class Tetris {
    constructor(imageX, imageY, template) {
        this.imageX = imageX;
        this.imageY = imageY;
        this.template = template;
        this.x = Math.floor(squareCountX / 2) - 1;
        this.y = 0;
    }

    getTruncedPosition() {
        return { x: Math.trunc(this.x), y: Math.trunc(this.y) }
    }

    checkBottom() {
        for (let i = 0; i < this.template.length; i++) {
            for (let j = 0; j < this.template[i].length; j++) {
                if (this.template[i][j] == 0) continue;
                let realX = i + this.getTruncedPosition().x;
                let realY = j + this.getTruncedPosition().y;
                if (realY + 1 >= squareCountY) {
                    return false;
                }
                if (gameMap[realY + 1] && gameMap[realY + 1][realX] && gameMap[realY + 1][realX].imageX != -1) {
                    return false;
                }
            }
        }
        return true;
    }

    checkLeft() {
        for (let i = 0; i < this.template.length; i++) {
            for (let j = 0; j < this.template[i].length; j++) {
                if (this.template[i][j] == 0) continue;
                let realX = i + this.getTruncedPosition().x;
                let realY = j + this.getTruncedPosition().y;
                if (realX - 1 < 0) {
                    return false;
                }
                if (gameMap[realY] && gameMap[realY][realX - 1] && gameMap[realY][realX - 1].imageX != -1) return false;
            }
        }
        return true;
    }

    checkRight() {
        for (let i = 0; i < this.template.length; i++) {
            for (let j = 0; j < this.template[i].length; j++) {
                if (this.template[i][j] == 0) continue;
                let realX = i + this.getTruncedPosition().x;
                let realY = j + this.getTruncedPosition().y;
                if (realX + 1 >= squareCountX) {
                    return false;
                }
                if (gameMap[realY] && gameMap[realY][realX + 1] && gameMap[realY][realX + 1].imageX != -1) return false;
            }
        }
        return true;
    }
    moveRight() {
        if (this.checkRight()) {
            this.x += 1;
        }
    }
    moveLeft() {
        if (this.checkLeft()) {
            this.x -= 1;
        }
    }
    moveBottom() {
        if (this.checkBottom()) {
            this.y += 1;
            score += 1;
        }
    }
    changeRotation() {
        let tempTemplate = [];
        for (let i = 0; i < this.template.length; i++)
            tempTemplate[i] = this.template[i].slice()
        let n = this.template.length;
        for (let layer = 0; layer < n / 2; layer++) {
            let first = layer;
            let last = n - 1 - layer;
            for (let i = first; i < last; i++) {
                let offset = i - first;
                let top = this.template[first][i];
                this.template[first][i] = this.template[i][last];
                this.template[i][last] = this.template[last][last - offset];
                this.template[last][last - offset] = this.template[last - offset][first];
                this.template[last - offset][first] = top;
            }
        }
        for (let i = 0; i < this.template.length; i++) {
            for (let j = 0; j < this.template.length; j++) {
                if (this.template[i][j] == 0) continue;
                let realX = i + this.getTruncedPosition().x;
                let realY = j + this.getTruncedPosition().y;
                if (
                    realX < 0 ||
                    realX >= squareCountX ||
                    realY < 0 ||
                    realY >= squareCountY
                ) {
                    this.template = tempTemplate;
                    return false;
                }
            }
        }
    }
}


const imageSquareSize = 24;
const size = 40;
const framePerSecond = 24;
const gameSpeed = 6;
const canvas = document.getElementById("canvas");
const nextShapeCanvas = document.getElementById("nextShapeCanvas");
const scoreCanvas = document.getElementById("scoreCanvas");
const image = document.getElementById("image");
const ctx = canvas.getContext("2d");
const nctx = nextShapeCanvas.getContext("2d");
const sctx = scoreCanvas.getContext("2d");
const squareCountX = canvas.width / size;
const squareCountY = canvas.height / size;

const shapesData = [
    { imageX: 0, imageY: 120, template: [[0, 1, 0], [0, 1, 0], [1, 1, 0]] },
    { imageX: 0, imageY: 96,  template: [[0, 0, 0], [1, 1, 1], [0, 1, 0]] },
    { imageX: 0, imageY: 72,  template: [[0, 1, 0], [0, 1, 0], [0, 1, 1]] },
    { imageX: 0, imageY: 48,  template: [[0, 0, 0], [0, 1, 1], [1, 1, 0]] },
    { imageX: 0, imageY: 24,  template: [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]] },
    { imageX: 0, imageY: 0,   template: [[1, 1], [1, 1]] },
    { imageX: 0, imageY: 48,  template: [[0, 0, 0], [1, 1, 0], [0, 1, 1]] }
];

let gameMap;
let gameOver;
let currentShape;
let nextShape;
let score;
let initialTwoDarr;
let whiteLineThickness = 2;



let gameLoop = () => {
    setInterval(update, 1000 / gameSpeed);
    setInterval(draw, 1000 / framePerSecond);
};

let deleteCompleteRows = () => {
    for (let i = 0; i < gameMap.length; i++) {
        let t = gameMap[i];
        let isComplete = true;
        for (let j = 0; j < t.length; j++) {
            if (t[j].imageX == -1) isComplete = false;
        }
        if (isComplete) {
            console.log("complete row");
            score += 1000;
            for (let k = i; k > 0; k--) {
                gameMap[k] = gameMap[k - 1];
            }
            let temp = [];
            for (let j = 0; j < squareCountX; j++) {
                temp.push({ imageX: -1, imageY: -1 });
            }
            gameMap[0] = temp;
        }
    }
};

let update = () => {
    if (gameOver) return;
    if (currentShape.checkBottom()) {
        currentShape.y += 1;
    }
    else {
      for (let k = 0; k < currentShape.template.length; k++) {
            for (let l = 0; l < currentShape.template[k].length; l++) {
                if (currentShape.template[k][l] == 0) continue;
                let targetY = currentShape.getTruncedPosition().y + l;
                let targetX = currentShape.getTruncedPosition().x + k;
                
                if (targetY >= 0 && targetY < squareCountY) {
                    gameMap[targetY][targetX] = { imageX: currentShape.imageX, imageY: currentShape.imageY };
                }
            }
        }

        deleteCompleteRows();
        currentShape = nextShape;
        nextShape = getRandomShape();
        if (!currentShape.checkBottom()) {
            gameOver = true;
        }
        score += 100;
    }
};

let drawRect = (x, y, width, height, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
};

let drawBackGround = () => {
    drawRect(0, 0, canvas.width, canvas.height, "#98b98d");
    ctx.strokeStyle = "rgba(0, 0, 0, 0.04)";
    ctx.lineWidth = whiteLineThickness;
    for (let i = 0; i <= squareCountX; i++) {
        ctx.beginPath(); ctx.moveTo(size * i, 0); ctx.lineTo(size * i, canvas.height); ctx.stroke();
    }
    for (let i = 0; i <= squareCountY; i++) {
        ctx.beginPath(); ctx.moveTo(0, size * i); ctx.lineTo(canvas.width, size * i); ctx.stroke();
    }
};

let drawCurrentTetris = () => {
    for (let i = 0; i < currentShape.template.length; i++) {
        for (let j = 0; j < currentShape.template.length; j++) {
            if (currentShape.template[i][j] == 0) continue;
            ctx.drawImage(
                image,
                currentShape.imageX,
                currentShape.imageY,
                imageSquareSize,
                imageSquareSize,
                Math.trunc(currentShape.x) * size + size * i,
                Math.trunc(currentShape.y) * size + size * j,
                size,
                size
            );
        }
    }
};

let drawSquares = () => {
    for (let i = 0; i < gameMap.length; i++) {
        let t = gameMap[i];
        for (let j = 0; j < t.length; j++) {
            if (t[j].imageX == -1) continue;
            ctx.drawImage(
                image,
                t[j].imageX,
                t[j].imageY,
                imageSquareSize,
                imageSquareSize,
                j * size,
                i * size,
                size,
                size
            );
        }
    }
};


let drawNextShape = () => {
    nctx.clearRect(0, 0, nextShapeCanvas.width, nextShapeCanvas.height);
    let offsetX = (nextShapeCanvas.width - (nextShape.template.length * size)) / 2;
    let offsetY = (nextShapeCanvas.height - (nextShape.template.length * size)) / 2;
    
    for (let i = 0; i < nextShape.template.length; i++) {
        for (let j = 0; j < nextShape.template[i].length; j++) {
            if (nextShape.template[i][j] == 0) continue;
            nctx.drawImage(
                image, nextShape.imageX, nextShape.imageY, imageSquareSize, imageSquareSize,
                offsetX + size * i, offsetY + size * j, size, size
            );
        }
    }
};
let drawGameOver = () => {
    ctx.fillStyle = "rgba(0,0,0,0.75)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#c1e5c4";
    ctx.font = "bold 38px 'Segoe UI'";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
};

let drawScore = () => {
    sctx.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);
    sctx.fillStyle = "#ffffff";
    sctx.font = "bold 32px 'Segoe UI'";
    sctx.textAlign = "center";
    sctx.fillText(score, scoreCanvas.width / 2, 55);
};

let draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackGround();
    drawSquares();
    drawCurrentTetris();
    drawNextShape();
    drawScore();
    if (gameOver) {
        drawGameOver();
    }
};

let getRandomShape = () => {
    let rand = Math.floor(Math.random() * shapesData.length);
    let base = shapesData[rand];
    let clonedTemplate = base.template.map(row => [...row]);
    return new Tetris(base.imageX, base.imageY, clonedTemplate);
};

let resetVars = () => {
    gameMap = [];
    for (let i = 0; i < squareCountY; i++) {
        let temp = [];
        for (let j = 0; j < squareCountX; j++) {
            temp.push({ imageX: -1, imageY: -1 });
        }
        gameMap.push(temp);
    }
    score = 0;
    gameOver = false;
    currentShape = getRandomShape();
    nextShape = getRandomShape();
};

window.addEventListener("keydown", (event) => {
    if (gameOver) return;
    if (event.keyCode == 37)
        currentShape.moveLeft();
    else if (event.keyCode == 38)
        currentShape.changeRotation()
    else if (event.keyCode == 39)
        currentShape.moveRight();
    else if (event.keyCode == 40)
        currentShape.moveBottom();
});

resetVars();
gameLoop();