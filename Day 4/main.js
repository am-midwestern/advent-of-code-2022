const fs = require('fs');
const readline = require('readline');

var user_file = './Day 4/input_text.txt';

function main () {
    sum = 0;

    let r = readline.createInterface({
        input : fs.createReadStream(user_file)
    });
    r.on('line', (text) => {
        let ranges = text.split(',').map(v => v.split('-'));
        // Puzzle 1
        // if (
        //     Number(ranges[0][0]) <= Number(ranges[1][0]) && Number(ranges[0][1]) >= Number(ranges[1][1]) ||
        //     Number(ranges[1][0]) <= Number(ranges[0][0]) && Number(ranges[1][1]) >= Number(ranges[0][1])
        // ) {
        //     sum++;
        // }

        // Puzzle 2
        let actual = ranges.map(v => range(Number(v[0]), Number(v[1])));
        let overlap = actual[0].filter(v => actual[1].includes(v))
        if (overlap.length) { sum++; };
    });
    r.on('close', () => {
        console.log(sum);
    });
};

main();

function range (start, end) {
    let range = []
    for (let i = start; i <= end; i++) {
        range.push(i);
    }
    return range;
};