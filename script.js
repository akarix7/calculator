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

console.log(multiply(5,3, 10));
operate("*", 5, 3);