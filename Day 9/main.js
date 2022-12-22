const fs = require('fs');
const readline = require('readline');

var user_file = './Day 9/input_text.txt';
var test_file = './Day 9/test.txt';
let result = '';

function main () {
    const positions = [[0, 0]];
    let headPos = [0, 0];
    let tailPos = [0, 0];

    let moves = {
        // numbers to add to x, y values
        'R': [1, 0],
        'L': [-1, 0],
        'U': [0, 1],
        'D': [0, -1],
    };

    let r = readline.createInterface({
        input : fs.createReadStream(user_file)
    });
    r.on('line', (text) => {
        let [direction, count] = text.split(' ');
        let steps = moves[direction];

        // Puzzle 1
        for (let i = 0; i < count; i++) {
            // move head
            headPos[0] += steps[0];
            headPos[1] += steps[1];

            // compare positions
            if (
                headPos[0] - tailPos[0] >= -1 && headPos[0] - tailPos[0] <= 1 &&
                headPos[1] - tailPos[1] >= -1 && headPos[1] - tailPos[1] <= 1
            ) {
                continue;
            }

            // move tail
            if (
                // head AND tail aren't in same row/col
                headPos[0] !== tailPos[0] &&
                headPos[1] !== tailPos[1]
            ) {
                // move diagonally
                tailPos[0] += tailPos[0] > headPos[0] ? -1 : 1
                tailPos[1] += tailPos[1] > headPos[1] ? -1 : 1
            } else {
                // follow head
                tailPos[0] += steps[0];
                tailPos[1] += steps[1];
            }

            // log movement
            if (
                positions.findIndex(v => v[0] === tailPos[0] && v[1] === tailPos[1]) === -1
            ) {
                positions.push([...tailPos]);
            }
        }

        // Puzzle 2
    });
    r.on('close', () => {
        result = positions.length
        console.log(result);
    });
};

main();