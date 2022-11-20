const container = document.querySelector("#container");
const calFunc = document.querySelector("#func");
const numbers = document.querySelector("#numbers");
const operators = document.querySelector("#operators");
const display = document.querySelector("#display");
window.addEventListener("load", startup, false);

let storeValue ={
    number: 0,
    operation: ""
}

const getValue = () => storeValue;
const setValue = (number, operator) => {
    storeValue.number = number;
    storeValue.operation = operator;
}

function add(...varargs){
    let total = 0;
    for(const args of varargs){
        total += parseInt(args);
    }
    showDisplay(total);
    return total;
}

function subtract(...varargs){
    let total = 0;
    for(let args of varargs){
        total -= parseInt(args);
    }
    showDisplay(total);
    return total;
}

function multiply(...varargs){
    console.log("HEY");
    let total = 1;
    for(let args of varargs){
        total *= parseInt(args);
    }
    console.log(total);
    showDisplay(total);

    return total;
}

function divide(num1, num2){
    showDisplay(`${num1 / num2}`);
    return num1 / num2;
}

function operate(op, num1, num2){
    let result = 0;
    switch (op){
        case "+": result = add(num1, num2);
        break;
        case "-": result = subtract(num1, num2);
        break;
        case "×": result = multiply(num1, num2);
        break;
        case "÷": result = divide(num1, num2);
        break;
        case "=": showDisplay(result);
        break;
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
            showDisplay(num.value);
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
            setValue(getValue().number,op.value);
            console.log(getValue());
            if(op.value === "=")
                operate(getValue().operation, getValue().number, 3);
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
    setValue(num);
    console.log(getValue());
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
    showDisplay(getValue().number);
}

/*
TO-DO
- possibly add a number2 in the storeValue object
 */
//buildCalculator();
// console.log(multiply(5,3, 10));
// operate("*", 5, 3);