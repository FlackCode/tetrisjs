import Tetris from "./tetris.js";

const tetri = [];

const playerElements = document.querySelectorAll(".player");
[...playerElements].forEach(element => {
    const tetris = new Tetris(element);
    tetri.push(tetris);
});

console.log(tetri)

const keyListener = (event) => {
    [
        ["KeyA", "KeyD", "KeyW", null, "KeyS"],
        ["ArrowLeft", "ArrowRight", "ArrowUp", null, "ArrowDown"],
    ].forEach((key, index) => {
        const player = tetri[index].player;
        if (event.type === 'keydown') {
            if (event.code === key[0]) {
                player.move(-1);
            } else if (event.code === key[1]) {
                player.move(1);
            } else if (event.code === key[2]) {
                player.rotate(-1);
            } else if (event.code === key[3]) {
                player.rotate(1);
            }
        }

        if (event.code === key[4]) {
            if (event.type === 'keydown') {
                if (player.dropInterval !== player.DROP_FAST) {
                    player.drop();
                    player.dropInterval = player.DROP_FAST;
                }
            } else {
                player.dropInterval = player.DROP_SLOW;
            }
        }
    });
};

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);
