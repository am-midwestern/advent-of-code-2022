const fs = require('fs');
const readline = require('readline');

var user_file = './Day #/input_text.txt';
let result = '';

function main () {
    let r = readline.createInterface({
        input : fs.createReadStream(user_file)
    });
    r.on('line', (text) => {
        // Puzzle 1
        // Puzzle 2
    });
    r.on('close', () => {
        console.log(result);
    });
};

main();