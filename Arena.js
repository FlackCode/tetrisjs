export default class Arena {
    constructor(width, height) {
        const matrix = [];
        while(height--) {
                matrix.push(new Array(width).fill(0));
        }
        this.matrix = matrix;
    }

    clear() {
        this.matrix.forEach(row => row.fill(0));
    }

    merge(player) {
        player.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this[y + player.pos.y][x + player.pos.x] = value;
                }
            });
        });
    }

    collide(player) {
        const {matrix, pos} = player;
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < matrix[y].length; ++x) {
                if (matrix[y][x] !== 0 && (this.matrix[y + pos.y] && this.matrix[y + pos.y][x + pos.x]) !== 0) {
                    return true;
                }
            }
        }

        return false;
    }

    sweep() {
        let rowCount = 1;
        let score = 0;
        outer: for (let y = this.matrix.length - 1; y > 0; --y) {
            for (let x = 0; x < this.matrix[y].length; ++x) {
                if (this.matrix[y][x] === 0) {
                    continue outer;
                }
            }

            const row = this.matrix.splice(y, 1)[0].fill(0);
            this.matrix.unshift(row);
            ++y;

            score += rowCount * 10;
            rowCount *= 2;
        }
        return score;
    }
}
