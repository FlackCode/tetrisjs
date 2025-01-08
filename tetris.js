const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");
context.scale(20, 20);

const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
]

function collide(arena, player) {
    const {matrix, pos} = player;
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] !== 0 && (arena[y + pos.y] && arena[y + pos.y][x + pos.x]) !== 0) {
                return true;
            }
        }
    }

    return false;
}

function createMatrix(width, height) {
    const matrix = [];
    while(height--) {
        matrix.push(new Array(width).fill(0));
    }
    return matrix;
}

function draw() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = "red";
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

const arena = createMatrix(12, 20);

const player = {
    pos: {x: 5, y: 5},
    matrix: matrix
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        player.pos.y = 0;
    }
    dropCounter = 0;
}

function playerRotate(dir) {
    rotate(player.matrix, dir);
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }
    draw();
    requestAnimationFrame(update);
}

document.addEventListener("keydown", event => {
    if(event.key === "ArrowLeft") {
        playerMove(-1);
    } else if (event.code === "ArrowRight") {
        playerMove(1);
    } else if(event.code === "ArrowDown") {
        playerDrop();
    } else if (event.code === "KeyQ") {
        playerRotate(-1);
    } else if (event.code === "KeyW") {
        playerRotate(1);
    }
})

update();
