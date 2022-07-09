

const display = document.querySelector(".calcDisplay");
let inputOne = "00000000";
let inputTwo = "00000000";
let inputOneLock = false;
let operation = "";

function resetDisplay() {
    display.innerText = "00000000";
    inputOne = "00000000";
    inputTwo = "00000000";
    inputOneLock = false;
}

function calculate() {
    let ans = 0;

    switch(operation) {
        case "×":
            ans = parseInt(inputOne) * parseInt(inputTwo);
            break;
        case "÷":
            ans = parseInt(inputOne) / parseInt(inputTwo);
            break;
        case "+":
            ans = parseInt(inputOne) + parseInt(inputTwo);
            break;
        case "-":
            ans = parseInt(inputOne) - parseInt(inputTwo);
            break;
        default:
            ans = inputOne;
    }
    console.log(ans);
    //ans = ans.toPrecision(8);
    return ans;
}

function concatNum(e) {
    console.log(e.target.innerText);

    //if CE is pressed, clear everything
    if(e.target.innerText==="CE") {
        resetDisplay();
        return;
    }

    if(e.target.innerText==="=") {
        display.innerText = calculate();
        return;
    }

    //algo to concat the pressed digit on the right
    let pressedNum = e.target.innerText;
    let temp = display.innerText.substring(1, 8);
    temp = temp + pressedNum;
    display.innerText = temp;
    
    if(!inputOneLock) {
        inputOne = display.innerText;
    }
    else {
        inputTwo = display.innerText;
    }
}

function operateTime(e) {
    
    display.innerText = "00000000";
    inputOneLock = true;

    operation = e.target.innerText;
}

const numbers = document.querySelector(".numerosEnt").querySelectorAll("button");
numbers.forEach((button)=>button.addEventListener("click", concatNum));

const opers = document.querySelector(".operators").querySelectorAll("button");
opers.forEach((button)=>button.addEventListener("click", operateTime))