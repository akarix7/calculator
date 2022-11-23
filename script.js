const container = document.querySelector("#container");
const calFunc = document.querySelector("#func");
const numbers = document.querySelector("#numbers");
const operators = document.querySelector("#operators");
const display = document.querySelector("#display");
window.addEventListener("load", startup, false);

let storeValue = {
    numArr: []
    // number1: 0,
    // number2: 0
}

let currentOperation = {
    operation: ""
}

let buttonPressed = {
    evaluated: false,
    operateButton: false
}


const getValue = () => storeValue;
const setValue = (...arr) => {
    for (let i of arr) {
        storeValue.numArr.push(Number(i));
    }
}

const getOperation = () => currentOperation;
const setOperation = (op) => {
    currentOperation = op;
}

const getButtonPressed = () => buttonPressed;
const setButtonPressed = (eval, op) => {
    buttonPressed.evaluated = eval;
    buttonPressed.operateButton = op;
}

function isValueEmpty(){
    return getValue().numArr.length === 0;
}

function isCurrOpEmpty() {
    return getOperation().operation === "";
}

let getUserNumber = "";

function affixNumber(num){

    if(getButtonPressed().operateButton || getButtonPressed().evaluated){
        setValue(getUserNumber);
        getUserNumber = "";
        setButtonPressed(false, false);
    }
    console.log(getButtonPressed());
    getUserNumber += num;
    showDisplay(getUserNumber);

}

function add(varargs){
    let total = 0;
    for(const args of varargs){
        total += parseInt(args);
    }
    return total;
}

function subtract(varargs){
    let total = 0;
    console.log(total);
    for(const args of varargs){
        console.log(args);
        total = parseInt(total) - parseInt(args);
        // total -= parseInt(args);
    }
    return total;
}

function multiply(varargs){
    let total = 1;
    for(const args of varargs){
        total *= parseInt(args);
    }

    return total;
}

function divide(num1, num2){
    return num1 / num2;
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

function createOperators(){
    let ops = ["÷", "×", "+", "-", "="];
    let i = 0;
    for(const op of operators.children){
        op.value = ops[i];
        op.textContent = `${ops[i++]}`;
        op.addEventListener("click", () => {
            if(op.value === "=") {
                setButtonPressed(true, true);
                if(getUserNumber !== "") {
                    setValue(getUserNumber);
                    getUserNumber = "";
                }

                showDisplay(operate(getOperation(), getValue().numArr));
            }
            else {
                setOperation(op.value);
                setButtonPressed(false, true);
                console.log(storeValue);
            }

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
    showDisplay(getValue().number1);
}

/*
TO-DO
- problem: need to append all numbers first then math operation then append all the numbers again
12 x 45
 */
//buildCalculator();
// console.log(multiply(5,3, 10));
// operate("*", 5, 3);