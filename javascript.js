const KEYPAD_NUMBER_OF_COLS = 4; 
const KEYPAD_NUMBER_OF_ROWS = 5;
const KEYPAD_MAP = [[" ", " ", "C", "⌫"],
                    ["7", "8", "9", "÷"], 
                    ["4", "5", "6", "×"], 
                    ["1", "2", "3", "−"], 
                    ["0", ".", "=", "+"]];
const OPERATORS = ["÷", "+", "×", "−"];
const MAX_DECIMAL_POINTS = 8;

const keypadContainer = document.querySelector(".keypad-container");
const resultContainer = document.querySelector(".result-container");
const equationContainer = document.querySelector(".equation-container");
let equationValue = "0";
let resultValue = "";
let overwriteNumber = true;
let termOne;
let operator;
let termTwo;

document.addEventListener("keydown", (e) => {
    let key = e.key;

    if (key === "c" || key === "Escape") {
        key = "C";
    } else if (key === "Backspace") {
        key = "⌫";
    } else if (key === "Enter") {
        key = "=";
    } else if (key === "-") {
        key = "−";
    } else if (key === "*") {
        key = "×";
    } else if (key === "/") {
        key = "÷";
    }

    if (!key.match(/[(0-9)C÷×+−.=⌫]/)) {
         return;
    } 
    e.preventDefault();

    keyCallback(key);
})

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
        if (key.textContent === "C") {
            key.classList.add("key-c");
        } else if (OPERATORS.includes(key.textContent)) {
            key.classList.add("key-operator");
        } else if (key.textContent === "=") {
            key.classList.add("key-eq");
        } else if (key.textContent === "⌫") {
            key.classList.add("key-bk");
        }
    } else {
        key.classList.remove("key");
        key.classList.add("key-empty");
    }
    return key;
}

function keyCallback (keyText) {
    switch (true) {
        case OPERATORS.includes(keyText):
            if (operator)  { // already picked an operator
                if (operatorLastLine()) { //changing current operator
                    setOperator(keyText);
                    equationValue = equationValue.slice(0, -1) + keyText;
                } else if (!dotLastLine()) { // evaluating equation and setting new
                    evalEquation(keyText);
                }
                
            } else  {
                if (equationValue === "") {
                    return;
                }
                if (equationValue.slice(-1) === "=") {
                    termOne = parseFloat(resultValue);
                    equationValue = "" + termOne;
                } else {
                    termOne = parseFloat(equationValue);
                }
                overwriteNumber = false;
                setOperator(keyText);
                equationValue += keyText;
            }
            break;
        case keyText === "C":
            equationValue = "0";
            resultValue = "";
            overwriteNumber = true;
            termOne = undefined;
            termTwo = undefined;
            operator = undefined;
            break;
        case keyText === "⌫":
            if (operator && operatorLastLine()) {
                operator = undefined;
                equationValue = equationValue.slice(0, -1);
            } else if (!equalsLastLine()) {
                equationValue = equationValue.slice(0, -1);
                if (equationValue === "") {
                    equationValue = "0";
                }
            }
            break;
        case keyText === "=":
            if (operator && !operatorLastLine() && !dotLastLine())
                evalEquation();
            break;
        case keyText === ".":
            if (numberLastLine() && !dotExistsThisTerm()) {
                equationValue += keyText;
            }
            break;
        default:
            if (keyText === "0" && onlyZeroThisTerm()) {
                return;
            }
            if (overwriteNumber) {
                equationValue = "" + keyText;
                resultValue = "";
                overwriteNumber = false;
            } else {
                equationValue += keyText;
            }
            break;
    }
    updateDisplay();
}
function updateDisplay() {
    if (equationValue.length >= 15) {
        throwError("Display Overflow");
    }

    if (equationValue !== "") {
        equationContainer.textContent = equationValue;
        resultContainer.textContent = resultValue;
    }
}
function throwError(msg) {
    equationValue = "";
    resultValue = "";
    equationContainer.textContent = msg;
    resultContainer.textContent = "^ERROR^";
    operator = undefined;
    termOne = undefined;
    termTwo = undefined;
    return;
}
function evalEquation(nextOperator) {
    termTwo = parseFloat(equationValue.split(/[÷+×−]/)[1]);
    let res = +operate(operator, termOne, termTwo).toFixed(MAX_DECIMAL_POINTS);
    if (res === Infinity) {
        throwError("Divide by 0");
        return;
    }
    resultValue = "" + res;
    if (nextOperator) {
        termOne = parseFloat(res);
        setOperator(nextOperator);
        equationValue = res + nextOperator;
        overwriteNumber = false;
    } else {
        equationValue += "=";
        overwriteNumber = true;
        operator = undefined;
        termOne = undefined;
    }
    termTwo = undefined;
}
function onlyZeroThisTerm() {
    if (termOne) {
        return equationValue.split(/[÷+×−]/)[1] === "0";
    } else {
        return equationValue === "0";
    }
}
function dotExistsThisTerm() {
    if (termOne) {
        return  equationValue.split(/[÷+×−]/)[1].match(/[.]/);
    } else { 
        return equationValue.match(/[.]/);
    }
}
function equalsLastLine() {
    return equationValue.slice(-1).match(/[=]/);
}
function dotLastLine() {
    return equationValue.slice(-1).match(/[.]/);
}
function numberLastLine() {
    return equationValue.slice(-1).match(/[(0-9)]/);
}
function operatorLastLine() {
    return OPERATORS.includes(equationValue.slice(-1));
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