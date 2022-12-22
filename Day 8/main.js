const fs = require('fs');
const readline = require('readline');

var user_file = './Day 8/input_text.txt';
var test_file = './Day 8/test.txt';
let result = '';

function main () {
    let grid = [];
    let rowNum = 0;

    let r = readline.createInterface({
        input : fs.createReadStream(user_file)
    });
    r.on('line', (text) => {
        grid[rowNum] = text.split('').map(Number);
        rowNum++;        
    });
    r.on('close', () => {
        let permimeter = (grid[0].length * 2) + (grid.length * 2) - 4;
        let interior = 0;
        let scores = [];

        for (let r = 1; r < grid.length - 1; r++) {
            for (let c = 1; c < grid[r].length - 1; c++) {
                let currPosition = grid[r][c];

                let left = grid[r].slice(0,c);
                let right = grid[r].slice(c+1);
                let up = grid.map(row => row[c]).filter((row, index) => index < r);
                let down = grid.map(row => row[c]).filter((row, index) => index > r);

                // Puzzle 1
                // if (
                //     // check left or right
                //     left.every(v => v < currPosition) ||
                //     right.every(v => v < currPosition) ||
                //     // check up and down
                //     up.every(v => v < currPosition) ||
                //     down.every(v => v < currPosition)
                // ) {
                //     interior++;
                // }

                // result = permimeter + interior;

                // Puzzle 2
                let blockers = {};

                let blockL = left.reverse().findIndex(v => v >= currPosition);
                let blockR = right.findIndex(v => v >= currPosition);
                let blockU = up.reverse().findIndex(v => v >= currPosition);
                let blockD = down.findIndex(v => v >= currPosition);

                if (blockL === -1) {
                    blockers['left'] = left.length;
                } else {
                    blockers['left'] = blockL + 1;
                }

                if (blockR === -1) {
                    blockers['right'] = right.length;
                } else {
                    blockers['right'] = (c + blockR + 1) - c;
                }

                if (blockU === -1) {
                    blockers['up'] = up.length;
                } else {
                    blockers['up'] = blockU + 1;
                }

                if (blockD === -1) {
                    blockers['down'] = down.length;
                } else {
                    blockers['down'] = (r + blockD + 1) - r;
                }

                scores.push(Object.values(blockers).reduce((a,b) => a * b, 1));
            }
        }

        result = Math.max(...scores);
        console.log(result);
    });
};

main();