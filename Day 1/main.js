const fs = require('fs');
const readline = require('readline');

var user_file = './Day 1/input_text.txt';

function main () {
    let counter = 0;
    let arr = [];

    let r = readline.createInterface({
        input : fs.createReadStream(user_file)
    });
    r.on('line', (text) => {
        if (!arr[counter]) {
            arr[counter] = [];
        }
        if (!text) {
            counter++;
            return;
        }
        arr[counter].push(Number(text));
    });
    r.on('close', () => {
        // sum the values in each of the nested arrays
        sums = arr.map((list) => list.reduce((prev, curr) => prev + curr, 0));
        // sort in descending order
        sorted = sums.sort((a, b) => a < b ? 1 : a > b ? -1 : 0)
        // sum the top 3
        console.log(sorted.slice(0,3).reduce((a, b) => a + b, 0));
    });
};

main();