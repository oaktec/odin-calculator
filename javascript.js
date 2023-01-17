const KEYPAD_NUMBER_OF_COLS = 4; 
const KEYPAD_NUMBER_OF_ROWS = 5;
const KEYPAD_MAP = [[" ", " ", " ", "C"],
                    ["7", "8", "9", "÷"], 
                    ["4", "5", "6", "×"], 
                    ["1", "2", "3", "−"], 
                    ["0", ".", "=", "+"]];

const keypadContainer = document.querySelector(".keypad-container");
generateCalculator();

function generateCalculator() {
    for (let x = 0; x < KEYPAD_NUMBER_OF_COLS; x++) {
        let keypadCol = document.createElement("div");
        keypadCol.classList.add("keypad-col");
        keypadContainer.append(keypadCol);

        for (let y = 0; y < KEYPAD_NUMBER_OF_ROWS; y++) {
            let key = document.createElement("div");
            key.classList.add("key");
            key = determineKey(x, y, key);
            keypadCol.append(key);
        }
    }
}
function determineKey(x, y, key) {
    key.textContent = KEYPAD_MAP[y][x];
    return key;
}


function add(a,b) {
    return a + b;
}
function subtract(a,b) {
    return a - b;
}
function multiply(a,b) {
    return a * b;
}
function divide(a,b) {
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            return divide(a,b);
   }
}