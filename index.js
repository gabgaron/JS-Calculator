const display = document.getElementById("inputScreen");
let equationDisplay = document.getElementById("equationScreen");
let memoryPosition = document.getElementById("memoryDown");
let indexArray = [];
let symbolIndex;
let noSymbol;
let memoryArray =[];
let memoryIndex= 0;
const downwardArrow = String.fromCharCode(0x25BC);
let outputValue;

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
    console.log(memoryIndex, input);
    let total;
    outputValue = true;
    switch(input){
        case "recall":
            indexCheck(memoryIndex);
            if(outputValue){
            display.value = memoryArray[memoryIndex];
            }
            break;
        case "plus":
            indexCheck(memoryIndex);
            if(outputValue){
            total = `${equationDisplay.value}+${memoryArray[memoryIndex]}`;
            equationDisplay.value = eval(total);
            }
            break;
        case "minus":
            indexCheck(memoryIndex);
            if(outputValue){
            total = `${equationDisplay.value}-${memoryArray[memoryIndex]}`;
            equationDisplay.value = eval(total);
            }
            break;
        case "clear":
            memoryIndex = 0;
            memoryPosition.textContent = `M${downwardArrow}`;
            memoryArray = [];
            break;
        case "store":
            if(!equationDisplay.value){
                window.alert("There are no values to store")
            }else if(memoryArray.length < 5 && equationDisplay.value){
                memoryArray.push(equationDisplay.value);
                memoryPosition.textContent = `M${memoryIndex + 1}`;
            }else{
                window.alert("You have reached the maximum amount of stored values");
            }
            break;
        case "cycle":
            if(memoryIndex < 5 && memoryIndex < memoryArray.length){
                memoryIndex++;
                memoryPosition.textContent = `M${memoryIndex}`;
                console.log(memoryArray[memoryIndex]);
            }else if(memoryIndex = memoryArray.length){
                memoryIndex = 0;
                memoryPosition.textContent = `M${memoryIndex + 1}`;
            }else if(memoryArray.length == 0){
                window.alert("There are no stored values!");
            }
    }
}

function indexCheck(value){
    if(value == 0 && memoryArray.length != 1){
        window.alert("There are no stored values!");
        return outputValue = false;
    }else if(value == memoryArray.length){
        return value--;
    }
}
