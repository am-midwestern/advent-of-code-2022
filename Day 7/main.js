const fs = require('fs');
const readline = require('readline');

var user_file = './Day 7/input_text.txt';
let result = '';

function main () {
    let currDir = '';
    let history = [];
    let sums = {};
    let hash = 0;

    let r = readline.createInterface({
        input : fs.createReadStream(user_file)
    });
    r.on('line', (text) => {
        // Puzzle 1
        let input = text.split(' ');

        if (!sums[currDir]) {
            sums[currDir] = 0;
        };

        // if (
        //     input[0] === 'dir'
        // ) {
        //     sums[input[1]] = 0;
        // }

        console.log(history.join('/'));
        console.log(input);

        // sum sizes
        if (input[0] !== '$') {
            let value = Number(input[0]);
            sums[currDir] += value;
            history.forEach(dir => sums[dir] += value);
            return;
        };

        if (
            input[1] === 'ls'
        ) { return };

        // cd
        switch (input[2]) {
            case '..':
                currDir = history[history.length - 1];
                history.pop();
                break;
            case '/':
                currDir = '/';
                history = [];
                break;
            default:
                if (
                    Object.keys(sums).includes(input[2])
                ) {
                    console.log(`keys ${Object.keys(sums)}`);
                    input[2] += hash;
                    hash++;
                }
                history.push(currDir);
                currDir = input[2];
        }

        // Puzzle 2
    });
    r.on('close', () => {
        // console.log(sums);
        let sub100k = Object.values(sums).filter(sum => sum <= 100000);
        result = sub100k.reduce((a, b) =>  a + b, 0);
        console.log(result);
    });
};

main();