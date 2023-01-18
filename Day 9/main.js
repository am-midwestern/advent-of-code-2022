const fs = require('fs');
const readline = require('readline');

var user_file = './Day 9/input_text.txt';
var test_file = './Day 9/test.txt';
var test_file_2 = './Day 9/test_2.txt';
let result = '';

function main () {
    NUM_KNOTS = 10;

    const positions = [];
    const knotPositions = generateKnots(NUM_KNOTS);

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
            newSpot = [
                knotPositions[0][0] + steps[0],
                knotPositions[0][1] + steps[1]
            ];

            // Puzzle 2
            knotPositions.forEach((pos, index) => {
                // move head
                if (index == 0) {
                    knotPositions[index] = newSpot;
                    return;
                }
                knotPositions[index] = follow(knotPositions[index - 1], pos, steps);
            });

            // log movement
            let tailPos = knotPositions[knotPositions.length - 1];
            if (
                positions.findIndex(v => v[0] === tailPos[0] && v[1] === tailPos[1]) === -1
            ) {
                positions.push([...tailPos]);
            }
        }
    });
    r.on('close', () => {
        result = [...new Set(positions)].length
        console.log(result);
    });
};

function generateKnots(num) {
    let knots = [];
    for (let i = 0; i < num; i++) {
        knots.push([0,0]);
    }
    return knots;
}

function follow(headPos, tailPos, steps) {
    // compare positions
    if (
        headPos[0] - tailPos[0] >= -1 && headPos[0] - tailPos[0] <= 1 &&
        headPos[1] - tailPos[1] >= -1 && headPos[1] - tailPos[1] <= 1
    ) {
        return tailPos;
    }

    // move tail
    if (
        // head AND tail aren't in same row/col
        headPos[0] !== tailPos[0] &&
        headPos[1] !== tailPos[1]
    ) {
        // move diagonally
        return [
            tailPos[0] + (tailPos[0] > headPos[0] ? -1 : 1),
            tailPos[1] + (tailPos[1] > headPos[1] ? -1 : 1)
        ];
    }

    if (tailPos[0] == headPos[0]) {
        // x values match
        return [
            tailPos[0],
            tailPos[1] + (tailPos[1] > headPos[1] ? -1 : 1)
        ];
    } else {
        // y values match
        return [
            tailPos[0] + (tailPos[0] > headPos[0] ? -1 : 1),
            tailPos[1]
        ];
    }
};

main();