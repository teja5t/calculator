
//be sure to check all values are ints before being passed to functions

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

function updateDisplay() {
    document.querySelector(".display").textContent = display;
}

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", () => {
        display += numberButton.textContent;
        updateDisplay();
    });
});

let n1, n2, operator;

//what happens when u click an operator
function clickOperator(op) {
    if (n1) {
        n1 = operate(n1, +display, operator);
    }
    else {
        n1 = +display;
    }
    operator = op;
    display = "";
    updateDisplay();
}

document.querySelector("#addition").addEventListener("click", () => clickOperator("+"));
document.querySelector("#subtraction").addEventListener("click", () =>clickOperator("-"));
document.querySelector("#multiplication").addEventListener("click", () => clickOperator("*"));
document.querySelector("#division").addEventListener("click", () => clickOperator("/"));

document.querySelector("#equals").addEventListener("click", () => {
    n2 = +display;
    display = operate(n1, n2, operator);
    updateDisplay();
    n1 = display;
})