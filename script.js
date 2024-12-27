function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) {
        return "ERROR";
    }

    return a / b;
}

function operate(a, b, o) {
    switch (o) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

let display = "";
const DISPLAY_SIZE = 13;

function updateDisplay() {
    if (display.includes("e")) {
        display = (+display).toFixed(DISPLAY_SIZE);
    }

    let displayNum = +display;
    if (displayNum >= 10 ** (DISPLAY_SIZE)) {
        document.querySelector(".display").textContent = "TOO LARGE"
    }
    else if (displayNum != 0 && -(10 ** (-DISPLAY_SIZE + 3)) < displayNum && displayNum < 10 ** (-DISPLAY_SIZE + 2)) {
        document.querySelector(".display").textContent = "TOO SMALL";
    }
    else if (display.length < DISPLAY_SIZE) {
        document.querySelector(".display").textContent = display;
    }
    else {
        document.querySelector(".display").textContent = display.slice(0, DISPLAY_SIZE);
    }
}

let tempNumber = false;

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", () => {
        if (tempNumber) {
            display = numberButton.textContent;
            tempNumber = false;
        }
        else {
            display += numberButton.textContent;
        }
        updateDisplay();
    });
});

let n1, n2, operator;

//what happens when u click an operator
function clickOperator(op) {
    if (n1 && operator) {
        n2 = +display;
        n1 = operate(n1, n2, operator);
        n2 = null;
    }
    else {
        n1 = +display;
    }
    operator = op;
    tempNumber = true;
    decimalUsed = false;
}

document.querySelector("#addition").addEventListener("click", () => clickOperator("+"));
document.querySelector("#subtraction").addEventListener("click", () =>clickOperator("-"));
document.querySelector("#multiplication").addEventListener("click", () => clickOperator("*"));
document.querySelector("#division").addEventListener("click", () => clickOperator("/"));

document.querySelector("#equals").addEventListener("click", () => {
    if (!operator) {
        return;
    }

    n2 = +display;
    display = "" + operate(n1, n2, operator);
    updateDisplay();
    n1 = display;
    operator = null;
    n2 = null;
    decimalUsed = false;
    tempNumber = true;
});

let decimalUsed = false;

document.querySelector("#decimal").addEventListener("click", () => {
    if (tempNumber) {
        display = ".";
        tempNumber = false;
    }
    else if (!decimalUsed) {
        display += ".";
        decimalUsed = true;
    }
    updateDisplay();
});

document.querySelector("#all-clear").addEventListener("click", () => {
    display = "";
    n1 = null;
    n2 = null;
    operator = null;
    decimalUsed = false;
    tempNumber = false;
    updateDisplay();
});

document.querySelector("#change-sign").addEventListener("click", () => {
    display = "" + -(+display);
    updateDisplay();
});

document.querySelector("#percent").addEventListener("click", () => {
    display = "" + (+display) / 100;
    updateDisplay();
});