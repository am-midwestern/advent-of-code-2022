const fs = require('fs');
const readline = require('readline');

var user_file = './Day 6/input_text.txt';
let result = '';

function main () {
    let r = readline.createInterface({
        input : fs.createReadStream(user_file)
    });
    r.on('line', (text) => {
        // Puzzle 1
        // let interval = 4;

        // Puzzle 2
        let interval = 14;
        let current = [...text.slice(0, interval)];

        for (let i = interval; i < text.length; i++) {
            if ([...new Set(current)].length === interval) {
                result = i;
                break;
            }
            current.shift();
            current.push(text[i]);
        }
    });
    r.on('close', () => {
        console.log(result);
    });
};

main();