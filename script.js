// Variables and stuff

let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const pointButton = document.querySelector('[data-point]');

const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Display stuff

numberButtons.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
);

operationButtons.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
);

deleteButton.addEventListener('click', deleteNumber);
allClearButton.addEventListener('click', clearAll);

pointButton.addEventListener('click', appendPoint);

equalsButton.addEventListener('click', evaluate);

function appendNumber(number) {
    if (currentOperandTextElement.textContent === '0' || shouldResetScreen) 
        resetScreen();

    currentOperandTextElement.textContent += number;
};

function deleteNumber() {
    currentOperandTextElement.textContent = currentOperandTextElement.textContent
        .toString()
        .slice(0, -1);
};

function appendPoint() {
    if (shouldResetScreen) resetScreen();
    if (currentOperandTextElement.textContent === '')
        currentOperandTextElement.textContent = '0';
    if (currentOperandTextElement.textContent.includes('.')) return;
    currentOperandTextElement.textContent += '.';
};

function clearAll() {
    currentOperandTextElement.textContent = '0';
    previousOperandTextElement.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
};

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = currentOperandTextElement.textContent;
    currentOperation = operator;
    previousOperandTextElement.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;
};

function resetScreen() {
    currentOperandTextElement.textContent = '';
    shouldResetScreen = false;
};

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return;
    if (currentOperation === '÷' && currentOperandTextElement.textContent === '0') {
        alert("You can't divide by 0!");
        return;
    };
    
    secondOperand = currentOperandTextElement.textContent;
    currentOperandTextElement.textContent = roundResult (
        operate(currentOperation, firstOperand, secondOperand)
    );

    previousOperandTextElement.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null;
};

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
};

// Making the calculator calculate

function add(a, b) {
    return a + b;
};

function substract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);

    switch(operator) {
        case '+':
            return add(a, b);

        case '-':
            return substract(a, b);

        case '*':
            return multiply(a, b);

        case '÷':
            if (b === 0) return null
            else return divide(a, b);

        default:
            return null;
    };
};