

const display = document.querySelector(".calcDisplay");
//let inputOne = "00000000";
//display.innerText = inputOne;


function concatNum(e) {
    console.log(e.target.innerText);
    let pressedNum = e.target.innerText;

    //algo to concat the pressed digit on the right
    let temp = display.innerText.substring(1, 8);
    temp = temp + pressedNum;
    console.log(temp);
    display.innerText = temp;
}


const numbers = document.querySelector(".numerosEnt").querySelectorAll("button");
numbers.forEach((button)=>button.addEventListener("click", concatNum));

