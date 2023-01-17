const KEYPAD_NUMBER_OF_COLS = 4; 
const KEYPAD_NUMBER_OF_ROWS = 5;
const KEYPAD_MAP = [[" ", " ", " ", "C"],
                    ["7", "8", "9", "÷"], 
                    ["4", "5", "6", "×"], 
                    ["1", "2", "3", "−"], 
                    ["0", ".", "=", "+"]];
const OPERATORS = ["÷", "+", "×", "−"];

const keypadContainer = document.querySelector(".keypad-container");
const outputContainer = document.querySelector(".output-container")
let displayValue = "0";
let termOne;
let operator;
let termTwo;
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
    if (key.textContent !== " ") {
        key.addEventListener("click", (e) => keyCallback(key.textContent));
    }
    return key;
}

function keyCallback (keyText) {
    switch (true) {
        case OPERATORS.includes(keyText):
            if (operator)  { // already picked an operator
                if (operatorLastLine()) { //changing current operator
                    setOperator(keyText);
                    displayValue = displayValue.slice(0, -1) + keyText;
                } else { // evaluating equation and setting new
                    evalEquation(keyText);
                }
                
            } else {
                termOne = parseFloat(displayValue);
                setOperator(keyText);
                displayValue += keyText;
            }

            if (operatorLastLine()) {//just picked an operator
                displayValue = displayValue.slice(0, -1) + keyText;
            } else {
                displayValue += keyText;
            }
            break;
        case keyText === "C":
            displayValue = "0";
            break;
        case keyText === "=":
            if (operator && !operatorLastLine())
                evalEquation();
            break;
        default:
            if (displayValue === "0" && keyText !== ".") {
                displayValue = "";
            }
            displayValue += keyText;
            break;
    }
    outputContainer.textContent = displayValue;
}
function evalEquation(nextOperator) {
    termTwo = parseFloat(displayValue.split(/[÷+×−]/)[1]);
    displayValue = "" + operate(operator, termOne, termTwo);
    if (nextOperator) {
        termOne = parseFloat(displayValue);
        setOperator(nextOperator);
        displayValue += nextOperator;
    } else {
        operator = undefined;
        termOne = undefined;
    }
    termTwo = undefined;
}
function operatorLastLine() {
    return OPERATORS.includes(displayValue.slice(-1));
}
function setOperator(keyText) {
    switch (keyText) {
        case "÷":
            operator = "/";
            break;
        case "+":
            operator = "+";
            break;
        case "×":
            operator = "*";
            break;
        case "−":
            operator = "-";
            break;
    }
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