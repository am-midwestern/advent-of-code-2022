const fs = require('fs');
const { default: test } = require('node:test');
const readline = require('readline');

var user_file = './Day 5/input_text.txt';

function main () {
    //  create nested array of values from image
    let stacks = generateData();
    let result = '';

    let r = readline.createInterface({
        input : fs.createReadStream(user_file)
    });
    r.on('line', (text) => {
        let direction = text.split(' ').filter((v, index) => index % 2 !== 0);

        // Puzzle 1
        // Move items one at a time (changes order)
        // for (let i = 0; i < direction[0]; i++) {
        //     stacks[getIndex(direction[2])]
        //         .push(stacks[getIndex(direction[1])].pop())
        // }

        // Puzzle 2
        // Move items in chunks (keeps their order)
        let start = stacks[getIndex(direction[1])].length - Number(direction[0]);
        stacks[getIndex(direction[2])]
            .push(...stacks[getIndex(direction[1])].splice(start));
    });
    r.on('close', () => {
        stacks.forEach((col) => {
            result += col[col.length - 1] ?? '';
        });
        console.log(result);
    });
};

// main();

console.log(generateData());

// TODO: extra credit
function generateData () {
    let data = [];
    let r = readline.createInterface({
        input : fs.createReadStream('./Day 5/stacks.txt')
    });
    r.on('line', (text) => {});
    r.on('close', () =>{});
    // if index === 0 or multiple of 4
    // get value at next index
    // push to nested array

    return data === [
        ['B', 'Z', 'T'],
        ['V', 'H', 'T', 'D', 'N'],
        ['B', 'F', 'M', 'D'],
        ['T', 'J', 'G', 'W', 'V', 'Q', 'L'],
        ['W', 'D', 'G', 'P', 'V', 'F', 'Q', 'M'],
        ['V', 'Z', 'Q', 'G', 'H', 'F', 'S'],
        ['Z', 'S', 'N', 'R', 'L', 'T', 'C', 'W'],
        ['Z', 'H', 'W', 'D', 'J', 'N', 'R', 'M'],
        ['M', 'Q', 'L', 'F', 'D', 'S'],
    ] ? data : false;
};

function getIndex (str) {
    return Number(str) - 1;
};