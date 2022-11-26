const container = document.querySelector("#container");
const calFunc = document.querySelector("#func");
const numbers = document.querySelector("#numbers");
const operators = document.querySelector("#operators");
const display = document.querySelector("#display");
window.addEventListener("load", startup, false);

let storeValue = {
    numArr: []
}

let currentOperation = {
    operation: ""
}

let buttonPressed = {
    evaluated: false,
    operateButton: false,
    negateButton: false
}

const getValue = () => storeValue;
const setValue = (...arr) => {
    for (let i of arr) {
        storeValue.numArr.push(i);
    }
}

const clearValue = () => {
    let length = getValue().numArr.length;
    for(let i = 0; i < length; i++){
        storeValue.numArr.pop();
    }
}

const lastValue = () => {
    return storeValue.numArr.pop();
}

const pairOfNumbers = () => {
    return storeValue.numArr.length === 2;
}

const getOperation = () => currentOperation;
const setOperation = (op) => {
    currentOperation = op;
}

const getButtonPressed = () => buttonPressed;
const setButtonPressed = (eval, op, neg) => {
    buttonPressed.evaluated = eval;
    buttonPressed.operateButton = op;
    buttonPressed.negateButton = neg;
}

function isValueEmpty(){
    return getValue().numArr.length === 0;
}

function isCurrOpEmpty() {
    return getOperation().operation === "";
}

let getUserNumber = "";

function affixNumber(num){
    getUserNumber += num;
    showDisplay(getUserNumber);
}

function add(varargs){
    let total = 0;
    for(const args of varargs){
        total += parseFloat(args);
    }
    return Math.round(total *1000) / 1000;
}

function subtract(varargs){
    let total = varargs[0];
    for(const args of varargs.slice(1)){
        total -= parseFloat(args);
    }
    return Math.round(total*1000) /1000;
}

function multiply(varargs){
    let total = 1;
    for(const args of varargs){
        total *= parseFloat(args);
    }
    return Math.round(total*1000) /1000;
}

function divide(varargs){
    let total = varargs[0];
    for(const args of varargs.slice(1)){
        total /= parseFloat(args);
    }
    return Math.round(total*1000) /1000;
}

function operate(op, ...num){
    let numArr = num.join().split(",");
    switch (op){
        case "+": return add(numArr);
        case "-": return subtract(numArr);
        case "×": return multiply(numArr);
        case "÷": return divide(numArr);
        default: console.log("error");
    }
}

function clear(){
    clearValue();
    getUserNumber = "";
    setOperation("");
    setButtonPressed(false, false);
}

function negate(){
    if(getUserNumber !== "") {
        setValue(getUserNumber);
        getUserNumber = "";
    }
    let val = (Math.round(parseFloat(lastValue()) * 1000)/1000) * -1;
    setValue(val);
    showDisplay(val);
}

function percentage(){
    if(getUserNumber !== "") {
        setValue(getUserNumber);
        getUserNumber = "";
    }
    let val = (Math.round(parseFloat(lastValue()) * 1000)/1000) /100;
    setValue(val);
    showDisplay(val);
}

function evaluate() {
    setButtonPressed(true, true);
    let result = operate(getOperation(), getValue().numArr);
    let prevOperation = getOperation();
    console.log("PREV OP" + prevOperation);

    showDisplay(result);
    clear();
    setValue(result);
    setOperation(prevOperation);
}

function createDiv(elements){
    for(let elem of elements){
        let div = document.createElement("button");
        div.className = elem;
        if(elements.length < 5 )
            calFunc.appendChild(div);
        else if(elements.length > 5)
            numbers.appendChild(div);
        else
            operators.appendChild(div);
    }
}

function createNumbers(){
    let i = 1;
    for(const num of numbers.children){
        num.value = i;
        num.textContent = `${i++}`;
        num.addEventListener("click", () => {
            affixNumber(num.value);
        })
        if(num.className === "decimal"){
            num.textContent = ".";
            num.value = ".";
        }else if(num.className === "zero"){
            num.textContent = "0";
            num.value = 0;
        }
    }
}

/*
PROBLEM:
PREVIOUS OPERATION GETS REPLACED
 */
function createOperators(){
    let ops = ["÷", "×", "+", "-", "="];
    let i = 0;
    for(const op of operators.children){
        op.value = ops[i];
        op.textContent = `${ops[i++]}`;
        op.addEventListener("click", () => {

            if(getUserNumber !== "") {
                setValue(getUserNumber);
                getUserNumber = "";
            }

            if(op.value === "=") {
                evaluate();
            }

            if(pairOfNumbers()){
                evaluate();
            }
            setOperation(op.value);
            setButtonPressed(false, true);

        })
    }
}

function createCalFunc(){
    let func = ["AC", "+/-", "%"];
    let funcValue = ["clear", "negate", "percentage"];
    let i = 0;
    for(const cal of calFunc.children){
        cal.value = funcValue[i];
        cal.textContent = `${func[i++]}`;
        cal.addEventListener("click", () => {
            if(cal.value === "clear") {
                clear();
                showDisplay(0);
            }
            else if(cal.value === "negate")
                negate()
            else
                percentage();
        })
    }
}

function showDisplay(num){
    display.textContent = num;
}

function buildCalculator(){
    let elem = ["clear", "negate", "percent"];
    let nums = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero", "decimal"];
    let ops = ["divide", "multiply", "add", "subtract", "equal"];
    createDiv(elem);
    createDiv(nums);
    createDiv(ops);
}

function startup(){
    buildCalculator();
    createNumbers();
    createOperators();
    createCalFunc();
    showDisplay(0);
}