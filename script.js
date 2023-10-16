//add, subtract, multiply, divide
let num1;
let num2;
let operator;
let display = document.getElementById("screenText");



function add(num1, num2){
    return num1 + num2;
}
function subtract(num1, num2){
    return num1-num2;
}
function multiply(num1, num2){
    return num1 * num2;
}
function divide(num1, num2){
    return num1/num2
}

//use reduce() with this function (Probably need to modify it a bit) for the equals functionality. Watch that JS30 exercise guy for the how to affect previous and next numbers.
function parseData(){
        //make regex, separate display into array of numbers and operators
    //iterate over and find x or /, then combine
    //iterate over and find + or -, then combine

    const pattern = /(\d+|[+\-x/])/g;
    let parsedDisplay = display.innerHTML.match(pattern);
    if (parsedDisplay.length == 3){
        num1 = parsedDisplay[0];
        num2 = parsedDisplay[2];
        operator = parsedDisplay[1];
        answer = operate(num1, num2, operator);
        display.innerHTML = answer;
    }
    else if(parsedDisplay.length < 3){
        display.innerHTML = "INVALID INPUT";
    }
    else{calculateLong(parsedDisplay)};
}


function calculateLong(parsedDisplay){
    //calculates all x and / expressions
    originalLength = parsedDisplay.length
    for (let i = 0; i < originalLength; i++){
        if(parsedDisplay[i] === "x" || parsedDisplay[i] === "/"){
            num1 = parseInt(parsedDisplay[i-1]);
            num2 = parseInt(parsedDisplay[i+1]);
            operator = parsedDisplay[i];
            let expressionAnswer = operate(num1, num2, operator);

            parsedDisplay.splice(i-1, 3, String(expressionAnswer));
            i = 0;
        }
    }

    for(let i=0; i < originalLength; i++){
        if(parsedDisplay[i] === "+" || parsedDisplay[i] === "-"){
            num1 = parseInt(parsedDisplay[i-1]);
            num2 = parseInt(parsedDisplay[i+1]);
            operator = parsedDisplay[i];
            let expressionAnswer = operate(num1, num2, operator);

            parsedDisplay.splice(i-1, 3, String(expressionAnswer));
            i=0;
        }
    }
    console.log(parsedDisplay);
    
    //calculates all + and - expressions

    
}

function operate(num1, num2, operator){
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    if(operator == "+"){
        return add(num1, num2);
    }
    else if(operator == "-"){
        return subtract(num1, num2);
    }
    else if(operator == "x"){
        return multiply(num1, num2);
    }
    else if(operator == "/"){
        if(num2 == 0){
            return "Can't divide by 0 :)"
        }
        else{
            return divide(num1, num2);
        }

    }
    else{console.log("Invalid operator");
    }}


function updateDisplayClear(){
    display.innerHTML = 0;
    num1 = null;
    num2 = null;
    operator = null;
}
function updateDisplayNumber(){
    //get number from button
    number = this.textContent;
    if(display.textContent == 0){
        display.innerHTML = number;  
    }
    else{
        display.textContent += number;
    }
    //update display
    display.innerHTML.length;
    
}
function updateDisplayOperator(){
    operator = this.innerHTML;
    this.textContent;
    if(display != 0){
        display.innerHTML += operator;
    }
}

//clear button
//equals button


//let button = document.getElementById("seven");
//button.addEventListener("click", updateDisplayNumber); //remember not to put () on the function, makes it act immediately instead of waiting for the click

let numbers = document.querySelectorAll(".numberButton")
numbers.forEach(function(button){
    button.addEventListener("click", updateDisplayNumber);
});

let operators = document.querySelectorAll(".operatorButton")
operators.forEach(function(button){
    button.addEventListener("click", updateDisplayOperator)
})

let clear = document.querySelectorAll(".clearButton")
clear.forEach(function(button){
    button.addEventListener("click", updateDisplayClear)
})

let test = document.querySelectorAll(".equals");
test.forEach(function(button){
    button.addEventListener("click", parseData);
})





    //hitting equals calls operate function on num1, num2, operator.
    //how do i handle multiple operators?
    //how do i display?
    //make buttons able to show on display
        //numbers in display probably stored as strings so that I can += to add numbers next to each other, then converted to int upon calculation.
        //each button should += a target


