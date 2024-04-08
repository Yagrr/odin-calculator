// To do:
// - create fn updateCalcdisp for each operation or number added
// - add fn that tests if input is valid: operator cannot follow
// another operator unless if it's a negative number
// - Make operator buttons toggle
// - floatingPoint and PlusMinus function
// - AC button

const disp = document.querySelector('.calculator_display');
const numBtn = document.querySelectorAll(".num_btn");
const opBtn = document.querySelectorAll(".op");
const clearBtn = document.querySelector(".clear_btn");

let x, y, operator;
x = y = 0;
operator = '';

let dispVal ='0';
//calcState 0: x/f op/f y/f, 1: x/t op/f y/f;  2: x/t op/t y/f 3: x/t op/t y/t
// 0: init state
// 1: x assigned
// 2: op assigned
// 3: y assigned, and result
let calcState = 0; 
let canCalculate = false;
let result = 0;
refreshDisp(result);

clearBtn.addEventListener("click", () => {
    clear();
});

function clear() {
    if (dispVal === 'ERROR') {
        calcState = 0;
    }
    switch (calcState) {
        case (0 || 1):
            x = y = result =  0;
            operator = '';
            calcState = 0;
            refreshDisp(result);
            return;
        case 2:
            operator = '';
            calcState -= 1; 
            refreshDisp(x);
            return;
        case 3:
            y = 0;
            refreshDisp(y);
            calcState = 0; 
            return;
    }
}

function refreshDisp(arg) {
    dispVal = String(arg);
    if (dispVal.length > 18) {
        dispVal = "ERROR";
    }
    dispVal = dispVal.substring(0,18);
    disp.textContent = dispVal;
}


// Weird implementation to detect edge cases where x = 0 or y = 0
// so that they get replaced by button.value to avoid non-decimal
// Ex: 01 02341
// This still allows normal operations with x = 0
// Ex: 0 x 12; 0 + 3
numBtn.forEach( (button) => {
    button.addEventListener("click", () => {
        if (dispVal === 'ERROR') {
            clear();
        }
        if (dispVal === '0' && button.value === '0') {
            return;
        }
        switch(calcState) {
            case 0:
                x = assignVal(x,button.value);
                refreshDisp(x);
                calcState = 1;
                return;
            case 1:
                x = appendVal(x,button.value);
                refreshDisp(x);
                return;
            case 2:    
                y = assignVal(y,button.value);
                refreshDisp(y);
                calcState = 3;
                return;
            case 3:
                y = appendVal(y,button.value);
                refreshDisp(y);
                return;
            default:
                break;
        }
    });
});

opBtn.forEach( (button) => {
    button.addEventListener("click", () => {
        if (dispVal === 'ERROR') {
            clear();
        }
        switch(button.value) {
            case "=":
                switch(calcState) {
                    case 2:
                        result = operate(operator,x,x);
                        y = result
                        refreshDisp(y);
                        calcState = 3;
                        return
                    case 3:
                        result = operate(operator,x,y);
                        y = result
                        refreshDisp(y);
                        return
                    default:
                        return;
                }
            case ".":
                switch(calcState) {
                    case (0 || 1):
                        x = floatP(x);
                        refreshDisp(x);
                        return
                    case (2 || 3):
                        y = floatP(y);
                        refreshDisp(y);
                        return
                }
            case "pm":
                switch(calcState) {
                    case (0 || 1):
                        x = plusMinus(x);
                        refreshDisp(x);
                        return
                    case (2 || 3):
                        y = plusMinus(y);
                        refreshDisp(y);
                        return
                }
            case "%":
                switch(calcState) {
                    case (0 || 1 || 2):
                        x =  percent(x);
                        refreshDisp(x);
                        return
                    case 3:
                        y =  percent(y);
                        refreshDisp(y);
                        return
                } 
            default:
                operator = button.value;
                calcState = 2;
        }
    });
});

function assignVal(arg, val) {
    arg = val; 
    return arg
}

function appendVal(arg, val) {
    arg += val; 
    return arg
}

function percent(arg) {
    return String(Number(arg)/100)
}

function floatP(arg) {
    if (arg.includes('.')) {
        return arg
    } else {
        arg += '.';
        return arg   
    }
}

function plusMinus(arg) {
    if (arg.includes('-')) {
        arg = arg.substring(1);
    } else {
        arg = '-' + arg;
    }
    return arg
}

function operate(op,a,b) {
    a = Number(a);
    b = Number(b);

    switch(op) {
        case '+':
            result = add(a,b);
            break;
        case '-':
            result = substract(a,b);
            break;
        case '*':
            result = multiply(a,b);
            break;
        case '/':
            result = divide(a,b)
            break;
    }
    return String(result.toFixed(10)
)}

// ops

function add(a,b) {
    return a+b
}

function substract(a,b) {
    return a-b
}

function multiply(a,b) {
    return a*b
}

function divide(a,b) {
    if (b === '0') {
        dispVal = 'ERROR';
    }
    return a/b
}
