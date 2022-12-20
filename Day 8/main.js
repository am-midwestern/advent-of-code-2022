const fs = require('fs');
const readline = require('readline');

var user_file = './Day 8/input_text.txt';
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

        // Puzzle 1
        for (let r = 1; r < grid.length - 1; r++) {
            for (let c = 1; c < grid[r].length - 1; c++) {
                currPosition = grid[r][c];
                if (
                    // check left or right
                    grid[r].slice(0,c).every(v => v < currPosition) ||
                    grid[r].slice(c+1).every(v => v < currPosition) ||
                    // check up and down
                    grid.map(row => row[c]).filter((row, index) => index < r).every(v => v < currPosition) ||
                    grid.map(row => row[c]).filter((row, index) => index > r).every(v => v < currPosition)
                ) {
                    interior++;
                }

            }
        }

        // Puzzle 2

        result = permimeter + interior;
        console.log(result);
    });
};

main();