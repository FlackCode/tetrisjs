function createPiece(type) {
    if (type === "T") {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } else if (type === "O") {
        return [
            [2, 2],
            [2, 2],
        ];
    } else if (type === "L") {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    } else if (type === "J") {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    } else if (type === "I") {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ];
    } else if (type === "S") {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === "Z") {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ];
    }
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
    } else if (event.code === "KeyW" || event.code === "ArrowUp") {
        playerRotate(1);
    }
})
