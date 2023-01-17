const KEYPAD_NUMBER_OF_COLS = 4; 
const KEYPAD_NUMBER_OF_ROWS = 4;

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
    switch(x) {
        case 0:
            switch (y) {
                case 0:
                    key.textContent = "7";
                    break;
                case 1:
                    key.textContent = "4";
                    break;
                case 2:
                    key.textContent = "1";
                    break;
                case 3:
                    key.textContent = "0";
                    break;
            }
            break;
        case 1:
            switch (y) {
                case 0:
                    key.textContent = "8";
                    break;
                case 1:
                    key.textContent = "5";
                    break;
                case 2:
                    key.textContent = "2";
                    break;
                case 3:
                    key.textContent = ".";
                    break;
            }
            break;
        case 2:
            switch (y) {
                case 0:
                    key.textContent = "9";
                    break;
                case 1:
                    key.textContent = "6";
                    break;
                case 2:
                    key.textContent = "3";
                    break;
                case 3:
                    key.textContent = "=";
                    break;
            }
            break;
        case 3:
            switch (y) {
                case 0:
                    key.textContent = "/";
                    break;
                case 1:
                    key.textContent = "X";
                    break;
                case 2:
                    key.textContent = "-";
                    break;
                case 3:
                    key.textContent = "+";
                    break;
            }
            break;
    }
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