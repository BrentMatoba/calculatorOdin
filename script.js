//calculator project from The Odin Project.
let num1;
let num2;
let operator;
let display = document.getElementById("screenText"); //calculator screen



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
    return num1/num2;
}

function parseData(){
    //parses equation into manipulateable data, then determines length of equation
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
    //function for calculating equations with more tha one expression
    //calculates all multiplication and division expressions
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
    //calculates all addition and subtraction expressions
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
    //updates display with final answer
    display.innerHTML = parsedDisplay;
}

function operate(num1, num2, operator){
    //arithmetic function
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
    //clears all data from calculator, resets to 0
    display.innerHTML = 0;
    num1 = null;
    num2 = null;
    operator = null;
}
function updateDisplayNumber(){
    //adds number to display
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
    //adds operator to display
    operator = this.innerHTML;
    this.textContent;
    if(display != 0){
        display.innerHTML += operator;
    }
}





//adds functions to different buttons on calculator
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


