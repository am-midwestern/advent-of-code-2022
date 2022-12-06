const fs = require('fs');
const readline = require('readline');

var user_file = './Day 2/input_text.txt';

const points = {
    'X': 1,
    'Y': 2,
    'Z': 3,
}

const inverses = {
    'A': 'X',
    'B': 'Y',
    'C': 'Z'
}

function main () {
    let score = 0;

    let r = readline.createInterface({
        input : fs.createReadStream(user_file)
    });
    r.on('line', (text) => {
        // Puzzle 1
        // score += result(text[0], text[2]) + points[text[2]];

        // Puzzle 2
        choice = getResponse(text[0], text[2]);
        score += result(text[0], choice) + points[choice];
    });
    r.on('close', () => {
        console.log(score);
    });
};

main();

function result (opp, me) {
    // draw
    if (me === inverses[opp]) {
        return 3;
    }
    // lose
    if (
        me === 'X' && opp === 'B' ||
        me === 'Y' && opp === 'C' ||
        me === 'Z' && opp === 'A'
    ) {
        return 0;
    }
    // win
    return 6;
};

function getResponse (opp, outcome) {
    // draw
    if (outcome === 'Y') {
        return inverses[opp];
    }
    // lose
    if (outcome === 'X') {
        switch (opp) {
            case 'A': return 'Z';
            case 'B': return 'X';
            default: return 'Y';
        };
    };
    // win
    switch (opp) {
        case 'A': return 'Y';
        case 'B': return 'Z';
        default: return 'X';
    };
};