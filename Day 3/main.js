const fs = require('fs');
const readline = require('readline');

var user_file = './Day 3/input_text.txt';

function main () {
    let sum = 0;
    let counter = 1;
    let currLines = [];

    let r = readline.createInterface({
        input : fs.createReadStream(user_file)
    });
    r.on('line', (text) => {
        // Puzzle 1
        // let common = commonInSack(text);
        // sum += getPrio(common)

        // Puzzle 2
        currLines.push([...text]);
        if (counter % 3 === 0) {
            let common = currLines[0].find(v => currLines[1].includes(v) && currLines[2].includes(v));
            currLines = [];
            sum += getPrio(common);
        };
        counter++;

    });
    r.on('close', () => {
        console.log(sum);
    });
};

main();

function getPrio (value) {
    let num = value.charCodeAt();
    if (num >= 97) {
        return Number(num - 96);
    }
    else {
        return Number(num - 38);
    }
};

function commonInSack (text) {
    // split in two
    let last = text.length;
    let group1 = [...text.slice(0, (last / 2))];
    let group2 = [...text.slice(last / 2)];
    // get common char
    return group1.find(v => group2.includes(v));
}