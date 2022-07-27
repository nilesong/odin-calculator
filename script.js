//Operations
function add(a = 0, b = 0) {
    return a + b;
};

function subtract(a = 0, b = 0) {
    return a - b;
};

function multiply(a = 0, b = 0) {
    return a * b;
};

function divide(a = 0, b = 0) {
    return a / b;
};

//Separate Digits & Operations as Array
function digitSeparator(value) {
    value = value.split('');
    //Filter Operator
    let oper = value.filter((val) => {
        return val === '+' || val === '-' || val === '*' || val === '/';
    });
    let operIndex = value.findIndex((val) => {
        return val === `${oper[0]}`;
    })

    //Filter Digits
    firstDigit = value.slice(0, operIndex);
    firstDigit = firstDigit.join('');
    firstDigit = parseInt(firstDigit);
    secondDigit = value.slice(operIndex + 1, value.length);
    secondDigit = secondDigit.join('');
    secondDigit = parseInt(secondDigit);

    //Add results to Array
    const result = [firstDigit, oper[0], secondDigit];
    return result;
}


//Evaluate Digits & Operation
function operate(values) {
    //Values from digitSeparator
    let firstDigit = values[0];
    let secondDigit = values[2];
    let operator = values[1];
    if (operator === '+') {
        return add(firstDigit, secondDigit);
    } else if (operator === '-') {
        return subtract(firstDigit, secondDigit);
    } else if (operator === '*') {
        return multiply(firstDigit, secondDigit);
    } else if (operator === '/') {
        return divide(firstDigit, secondDigit);
    }
}

//Display changer for result
function operateDisplay() {
    let values = digitSeparator(displayValue);
    let displayResult = operate(values);
    display.innerText = displayResult;
}



//Buttons and Initialization
const buttons = document.querySelectorAll('.evaluate');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');
const display = document.querySelector('div');
let displayValue = [];
let operatorText;

//Digits and Operators
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if ((displayValue[displayValue.length - 1] === '+' || displayValue[displayValue.length - 1] === '-' || displayValue[displayValue.length - 1] === '*' || displayValue[displayValue.length - 1] === '/') && button.classList[1] !== 'digits') {
            //Replace Operator & Display
            operatorText = display.innerText;
            operatorText = operatorText.split('');
            operatorText.splice(operatorText.length - 1, 1, e.srcElement.innerText);
            operatorText = operatorText.join('');
            display.innerText = operatorText;
            displayValue = display.innerText;
        } else {
            display.innerText += e.srcElement.innerText;
            displayValue = display.innerText;
        }
    })
})

//Clear
clearButton.addEventListener('click', (e) => {
    display.innerText = [];
    displayValue = [];
})

//Equal
equalButton.addEventListener('click', (e) => {
    if (displayValue.length === 0) {
        display.innerText = 'ERROR!';
    } else {
        operateDisplay();
    }
})

