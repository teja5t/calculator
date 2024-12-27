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
const displaySize = 9;

function updateDisplay() {
    let displayNum = +display;
    if (displayNum > 999999999) {
        document.querySelector(".display").textContent = "TOO LARGE"
    }
    else if (display.length < displaySize) {
        document.querySelector(".display").textContent = display;
    }
    else if (display[displaySize - 1] == ".") {
        document.querySelector(".display").textContent = display.slice(0, displaySize - 1);
    }
    else {
        document.querySelector(".display").textContent = display.slice(0, displaySize);
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
    display = "";
    decimalUsed = false;
    updateDisplay();
}

document.querySelector("#addition").addEventListener("click", () => clickOperator("+"));
document.querySelector("#subtraction").addEventListener("click", () =>clickOperator("-"));
document.querySelector("#multiplication").addEventListener("click", () => clickOperator("*"));
document.querySelector("#division").addEventListener("click", () => clickOperator("/"));

document.querySelector("#equals").addEventListener("click", () => {
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