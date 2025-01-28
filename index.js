const display = document.getElementById("inputScreen");
let equationDisplay = document.getElementById("equationScreen");
let memoryPosition = document.getElementById("memoryDown");
let indexArray = [];
let symbolIndex;
let noSymbol;
let memoryArray =[];
let memoryIndex= -1;
const downwardArrow = String.fromCharCode(0x25BC);

function dis(input){
    if(input == "+" || input == "-" || input == "*" || input == "/"){
        equationDisplay.value += display.value + input;
        display.value = "";
    }else if(input == "square"){
        equationDisplay.value = Math.pow(display.value, 2);
        display.value = "";
    }else if(input == "squareroot"){
        equationDisplay.value = Math.sqrt(display.value);
        display.value = "";
    }else if(input == "reciprocal"){
        equationDisplay.value = 1 / display.value;
        display.value = "";
    }else if(input == "%"){
        let temp = equationDisplay.value.split("");
        let temp1 = temp.slice(0, temp.length - 1)
        let percentage = (temp1.join("") / 100) * display.value;
        equationDisplay.value += percentage;
        display.value = "";
    }else{
        display.value += input;
    }
}
function clearInput(){
    display.value = "";
}

function clr(){
    display.value = "";
    equationDisplay.value = "";
}

function calc(){
    let total = equationDisplay.value + display.value;
    equationDisplay.value = eval(total);
    display.value = "";
    
}

function plusMinus(){
    let plusMinusArray = display.value.split("")
    if(display.value.startsWith("-")){
        slicedValue = plusMinusArray.slice(1, plusMinusArray.length);
        display.value = slicedValue.join("");
    }else{
        display.value = `-${display.value}`;
    }
}
function backspace(){
    let backspaceArray = display.value.split("");
    backspaceArray.pop();
    display.value = backspaceArray.join("")
}

function memoryButton(input){
    let total;
    if(input == "clear"){
        memoryArray = [];
    }else if(input == "recall"){
        if(memoryArray.length == 0){
            arrayLengthCheck("empty");
        }else if(memoryIndex == -1){
            arrayLengthCheck("select");
        }else{
        display.value = memoryArray[memoryIndex];
    }
    }else if(input == "plus"){
        if(memoryArray.length == 0){
            arrayLengthCheck("empty");
        }else if(memoryIndex == -1){
            arrayLengthCheck("select");
        }else{
        total = `${equationDisplay.value}+${memoryArray[memoryIndex]}`;
        equationDisplay.value = eval(total);
    }
    }else if(input == "minus"){
        if(memoryArray.length == 0){
           arrayLengthCheck("empty");
        }else if(memoryIndex == -1){
            arrayLengthCheck("select");
        }else{
        total = `${equationDisplay.value}-${memoryArray[memoryIndex]}`;
        equationDisplay.value = eval(total);
    }
    }else if(input == "store"){
        if(!equationDisplay.value){
            window.alert("There are no values to store")
        }else if(memoryArray.length < 5 && equationDisplay.value){
            memoryArray.push(equationDisplay.value);
        }else{
            window.alert("You have reached the maximum amount of stored values");
        }
    }else if(input == "cycle"){
        memoryIndex++;
        if(memoryIndex < 5 && memoryIndex < memoryArray.length){
        memoryPosition.textContent = `M${memoryIndex + 1}`;
        console.log(memoryArray[memoryIndex]);
        }else if(memoryIndex = memoryArray.length){
            memoryIndex = -1;
            memoryPosition.textContent = `M${downwardArrow}`;
        }else if(memoryArray.length == 0){
            window.alert("There are no stored values!")
        }
    }
}

function arrayLengthCheck(value){
    if(value == "empty"){
        window.alert("There are no stored values!")
    }else if(value == "select"){
        window.alert(`Please select a stored value using the M${downwardArrow} button!`);
    }
}
