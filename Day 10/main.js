const fs = require('fs');
const readline = require('readline');

var user_file = './Day 10/input_text.txt';
var test_file = './Day 10/test_file.txt';

let CYCLES = [20, 60, 100, 140, 180, 220];
let ROW = 0;
let signalStrengths = {};
let CRT_Screen = [];
let result = '';

function main () {
    const ADD_CYCLE_INCREMENT = 2;
    cycleCount = 0;
    register = 1;

    let r = readline.createInterface({
        input : fs.createReadStream(user_file)
    });
    r.on('line', (text) => {
        let [command, value] = text.split(' ');

        if (command === 'noop') {
            handleCycle();
            return;
        }

        // command addx [value]
        for (let i = 0; i < ADD_CYCLE_INCREMENT; i++) {
            handleCycle();
        }

        register += Number(value);

        function handleCycle() {
            if (cycleCount !== 0 && cycleCount % 40 == 0) {
                ROW += 1;
                // Puzzle 2
                // cycleCount = 0;
            }
            cycleCount += 1;
            drawPixel(register, cycleCount);
            logSignalStrength(register, cycleCount);
        }
    });
    r.on('close', () => {
        // Puzzle 1
        result = Object.values(signalStrengths).reduce((a, b) => a + b);
        console.log(result);

        // Puzzle 2
        // result = CRT_Screen.map(row => row.join('')).join('\n');
        // fs.writeFile('./Day 10/output.txt', result, (err) => {
        //     if (err) { throw err; };
        // });
    });
};

function logSignalStrength(register, cycleCount) {
    if (CYCLES.includes(cycleCount)) {
        signalStrengths[cycleCount] = register * cycleCount;
    }
};

function drawPixel(register, cycleCount) {
    if (!CRT_Screen[ROW]) {
        CRT_Screen[ROW] = [];
    }

    let spritePos = [register - 1, register, register + 1];

     // CRT screen is 0 indexed, cycleCount starts at 1
    if (spritePos.includes(cycleCount - 1)) {
        CRT_Screen[ROW].push('#');
        return;
    }

    CRT_Screen[ROW].push('.');
};

main();