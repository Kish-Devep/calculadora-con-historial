const display = document.getElementById('display');
const historyList = document.getElementById('history-list');
let currentInput = '';
let operator = '';
let previousInput = '';

loadHistory();

function appendNumber(number) {
    currentInput += number;
    display.value = currentInput;
}

function appendOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculateResult();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    previousInput = '';
    display.value = '';
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}

function calculateResult() {
    if (currentInput === '' || previousInput === '') return;

    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }

    const expression = `${previousInput} ${operator} ${currentInput} = ${result}`;
    saveToHistory(expression);

    currentInput = result.toString();
    display.value = currentInput;
    previousInput = '';
    operator = '';
}

function saveToHistory(expression) {
    let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
    history.push(expression);
    localStorage.setItem('calcHistory', JSON.stringify(history));
    addHistoryItem(expression);
}

function addHistoryItem(expression) {
    const li = document.createElement('li');
    li.textContent = expression;
    historyList.appendChild(li);
}

function loadHistory() {
    let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
    historyList.innerHTML = '';
    history.forEach(item => addHistoryItem(item));
}

function clearHistory() {
    localStorage.removeItem('calcHistory');
    historyList.innerHTML = '';
}
