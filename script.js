const container = document.querySelector("#container");
const topBar = document.querySelector("#top-bar");
const numbers = document.querySelector("#numbers");
const operators = document.querySelector("#operators");
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
        console.log(elem);
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
}

//buildCalculator();
// console.log(multiply(5,3, 10));
// operate("*", 5, 3);