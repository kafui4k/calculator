const calculator = document.querySelector(".calculator");
const display = document.querySelector(".calculator__output");
const buttons = document.querySelectorAll(".calculator__key");
const operators = document.querySelectorAll(".calculator__key--operator");
const equalsButton = document.querySelector(".calculator__key--enter");
const clearButton = document.querySelector(".calculator__key--clear");
const periodButton = document.querySelector(".calculator__key--period");

let operator;
let currNumber;
let nextNumber;

buttons.forEach(button => button.addEventListener("click", function(e) {
    if (e.target.matches("button")) {
        const key = e.target;
        const action = key.dataset.action
        let keyContent = key.textContent
        let displayNum = display.textContent

        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove("is-depressed"))

        const previousKeyType = calculator.dataset.previousKeyType

        if(!action) {
            if (displayNum === 0 || previousKeyType === "operator") {
                display.textContent = keyContent
            } else {
                display.textContent = displayNum + keyContent
            }
        }

        if (action === "add" || 
            action === "subtract" || 
            action === "divide" ||
            action === "multiply") {

            key.classList.add("is-depressed")
            calculator.dataset.previousKeyType = "operator"
            calculator.dataset.firstValue = displayNum
            calculator.dataset.operator = action
        }

        if (action === "decimal") {
            display.textContent = displayNum + "."
        }

        if (action === "clear") {
            display.textContent = 0
        }

        if (action === "calculate") {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayNum

            display.textContent = operate(firstValue, operator, secondValue)
        }
    }
}));

// 1) create add function
function add(n1, n2) {
    const result = n1 + n2;
    return result;
}

// 2) create subtract function
function subtract(n1, n2) {
    const result = n1 - n2;
    return result;
}

// 3) create multiply function
function multiply(n1, n2) {
    const result = n1 * n2;
    return result;
}

// 4) create divide function
function divide(n1, n2) {
    const result = n1 % n2;
    return result;
}

function operate(n1, operator, n2) {
    let result = "";

    if (n1 !== "" && n2 !== "") {
        switch(operator) {
            case "add":
                result = add(parseFloat(n1), parseFloat(n2));
                break;
            case "subtract":
                result = subtract(parseFloat(n1), parseFloat(n2));
                break;
            case "multiply":
                result = multiply(parseFloat(n1), parseFloat(n2));
                break;
            case "divide":
                result = divide(parseFloat(n1), parseFloat(n2));
                break;
            default:
                return

        }

        return result;
    }
}
