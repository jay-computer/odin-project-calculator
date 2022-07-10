

const display = document.querySelector(".calcDisplay");
let inputOne = "00000000";
let inputTwo = "00000000";
let operation = "";

//this boolean tells us if the conditions were met to maintain our first input
let inputOneLock = false;

//this boolean tells uf if the second input should be locked in
let inputTwoLock = false;

//this boolean tells us if equals was pressed prior
let equalsWasPressed = false;

//this boolean tells us if the user, instead of pressing equals, pressed another operator
let operatorConcat = false;

function rounder(num) {
    
    
    //if actual mathematical overflow
    if(num > 99999999 || num < -99999999) {
        return "ERR";
    }

    if(num >= 0) {
        if(display.innerText.includes("-")) {
            display.innerText = display.innerText.substr(1);
        }
        //if our number is long because of a decimal
        if(num.toString().length > 8) {
            let displayableEight = num.toPrecision(8).toString();
            return displayableEight;
        }

        //if our short number is decimal
        if(num.toString().includes(".")) {
            return String(num).padEnd(8, "0");
        }

        else {
            return String(num).padStart(8, "0");
        }
    }

    else {
        //if our number is long because of a decimal
        if(num.toString().length > 8) {
            let displayableEight = num.toPrecision(8).toString();
            return "-" + displayableEight.substr(1);
        }

        //if our short number is decimal
        if(num.toString().includes(".")) {
            return "-" + num.toString().substr(1).padEnd(8, "0");
        }

        else {
            return "-" + num.toString().substr(1).padStart(8, "0");
        }
    }
}

function resetDisplay() {
    display.innerText = "00000000";
    inputOne = "00000000";
    inputTwo = "00000000";
    inputOneLock = false;
    inputTwoLock = false;
    equalsWasPressed = false;
    operatorConcat = false;
}

function calculate() {
    let ans = 0;
    console.log(`operating on ${inputOne} ${operation} ${inputTwo}`);

    if(operation.length >= 2) {
        if(inputTwoLock) {
            ans = parseInt(inputTwo) * -1;
            
            console.log(ans);
            
        }    

        else if(inputOneLock) {
            ans = parseInt(inputOne) * -1;
            
            console.log(ans);
        }
        ans = rounder(ans);
        operation = operation[0];
        return ans;
        
    }

    switch(operation) {
        case "×":
            ans = parseInt(inputOne) * parseInt(inputTwo);
            operation = "";
            break;
        case "÷":
            ans = parseInt(inputOne) / parseInt(inputTwo);
            operation = "";
            break;
        case "+":
            ans = parseInt(inputOne) + parseInt(inputTwo);
            operation = "";
            break;
        case "-":
            ans = parseInt(inputOne) - parseInt(inputTwo);
            operation = "";
            break;

        
        
        default:
            ans = inputOne;
    }

    ans = rounder(ans);
    return ans;
}

function concatNum(e) {
    //if equals was pressed last turn, we should reset the display
    if(equalsWasPressed) {
        resetDisplay();
    }

    //if sign change was pressed
    if(e.target.innerText==="±") {
        operation = operation + "±";
        display.innerText = calculate();
        if(inputTwoLock) inputTwo = display.innerText;
        else if(inputOneLock) inputOne = display.innerText;
        
        console.log(inputTwo);
        console.log(inputTwoLock);
        return;
    }

    //if CE is pressed, clear everything and return
    if(e.target.innerText==="CE") {
        resetDisplay();
        return;
    }

    //if equals is pressed, calculate and set equalsWasPressed as true
    if(e.target.innerText==="=") {
        console.log(operation);
        display.innerText = calculate();
        
        equalsWasPressed = true;
        return;
    }

    //get the pressed number value
    let pressedNum = e.target.innerText;
    
    //are we operating on the second number
    if(operatorConcat && inputOneLock) {
        display.innerText = "00000000";
        let temp = display.innerText.substr(1);
        temp = temp + pressedNum;
        display.innerText = temp;
        inputTwo = display.innerText;
        inputTwoLock = true;
    } 
    
    //we are operating on the first number
    else {
        let temp = display.innerText.substr(1);
        temp = temp + pressedNum;
        display.innerText = temp;
        inputOne = display.innerText;
        inputOneLock = true;
    }

}

function operateTime(e) {
    if(equalsWasPressed) {
        resetDisplay();
    }

    //if this is consecutive operator inputs and we locked inputTwo
    if(operatorConcat && inputTwoLock) {
        let ans = calculate();
        display.innerText = ans;
        inputOne = ans;
        inputTwoLock = false;
        console.log(`inputOne: ${inputOne}`);
    }
    
    //get the operator
    operation = e.target.innerText;
    console.log(operation);
    operatorConcat = true;
}

const numbers = document.querySelector(".numerosEnt").querySelectorAll("button");
numbers.forEach((button)=>button.addEventListener("click", concatNum));

const opers = document.querySelector(".operators").querySelectorAll("button");
opers.forEach((button)=>button.addEventListener("click", operateTime))