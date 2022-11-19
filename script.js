const container = document.querySelector("#container");
const topBar = document.querySelector("#top-bar");
const numbers = document.querySelector("#numbers");
const operators = document.querySelector("#operators");
const display = document.querySelector("#display");
window.addEventListener("load", startup, false);

function add(...varargs){
    let total = 0;
    for(const args of varargs){
        total += parseInt(args);
    }
    return total;
}

function subtract(...varargs){
    let total = 0;
    for(let args of varargs){
        total -= parseInt(args);
    }
    return total;
}

function multiply(...varargs){
    let total = 1;
    for(let args of varargs){
        total *= parseInt(args);
    }
    return total;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(op, num1, num2){
    switch (op){
        case "+": add(num1, num2);
        break;
        case "-": subtract(num1, num2);
        break;
        case "*": multiply(num1, num2);
        break;
        case "/": divide(num1, num2);
        break;
        default: console.log("error");
    }
}

function createDiv(elements){
    for(let elem of elements){
        let div = document.createElement("button");
        div.className = elem;
        if(elements.length < 5 )
            topBar.appendChild(div);
        else if(elements.length > 5)
            numbers.appendChild(div);
        else
            operators.appendChild(div);
    }
}

function createNumbers(){
    let i = 1;
    for(const num of numbers.children){
        num.textContent = `${i++}`;

        if(num.className === "decimal"){
            num.textContent = ".";
        }else if(num.className === "zero"){
            num.textContent = "0";
        }
    }
}

function createOperators(){
    let ops = ["÷", "×", "+", "-", "="];
    let i = 0;
    for(const op of operators.children){
        op.textContent = `${ops[i++]}`;
        console.log(op);
    }
}

function createCalFunc(){
    let func = ["AC", "+/-", "%"];
    let i = 0;
    for(const cal of topBar.children){
        cal.textContent = `${func[i++]}`;
    }
}

function showDisplay(){
    display.textContent = "9876";
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
    showDisplay();
}

/*
TO-DO
- add "value" to buttons
- add addeventlistener to buttons
 */
//buildCalculator();
// console.log(multiply(5,3, 10));
// operate("*", 5, 3);