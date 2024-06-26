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
let result = 0;
refreshDisp(result);

// kb support
document.addEventListener('keydown', (e) => {
    e.preventDefault;
    let keyCheck = '+-*/=%.cC0123456789';
    let keyPressed = e.key;
    if (keyCheck.includes(keyPressed)) {
        let kbBtn = '0';
        switch(keyPressed) {
            case '+':
               kbBtn = 'plus';
               break;
            case '-':
                kbBtn = 'minus';
               break;
            case '*':
                kbBtn = 'mult';
                break;
            case '/':
                kbBtn = 'divide';
                break;
            case '=':
                kbBtn = 'equal';
                break;
            case '%':
                kbBtn = 'percent'
                break;
            case '.':
                kbBtn = 'point';
                break;
            case '0':
                kbBtn = 'zero';
            default:
                kbBtn = keyPressed.toLowerCase;
        }
        kbBtn = 'btn_' + kbBtn 
        document.getElementById(kbBtn).click();
    }
});

clearBtn.addEventListener("click", () => {
    playSound(clearBtn);
    clear();
});

function clear() {
    if (dispVal.includes('ERROR')) {
        calcState = 0;
    }
    switch (calcState) {
        case 0:
        case 1:
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
        dispVal = "ERROR: OVERFLOW";
    }
    dispVal = dispVal.substring(0,18);
    disp.textContent = dispVal;
}

function playSound(e) {
    let audio = document.createElement('audio');
    audio.src = "audio/button-press-pixabay.mp3";
    e.appendChild(audio);
    audio.volume = 0.5;
    audio.play();
}

numBtn.forEach( (button) => { 
    button.addEventListener("click", () => {
        playSound(button);
        if (dispVal.includes('ERROR')) {
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
        playSound(button);
        if (dispVal.includes('ERROR')) {
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
                        x = result
                        refreshDisp(x);
                        return
                    default:
                        return;
                }
            case ".":
                switch(calcState) {
                    case 0:
                    case 1:
                        x = floatP(x);
                        refreshDisp(x);
                        return
                    case 2:
                    case 3:
                        y = floatP(y);
                        refreshDisp(y);
                        return
                }
            case "pm":
                switch(calcState) {
                    case 0:
                    case 1:
                        x = plusMinus(x);
                        refreshDisp(x);
                        return
                    case 2:
                    case 3:
                        y = plusMinus(y);
                        refreshDisp(y);
                        return
                }
            case "%":
                switch(calcState) {
                    case 0:
                    case 1:
                    case 2:
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
            result = a+b;
            break;
        case '-':
            result = a-b;
            break;
        case '*':
            result = a*b;
            break;
        case '/':
            if (b === '0') {
                dispVal = 'ERROR: DIV BY 0';
            } else {
                result = a/b;
            }
            break;
    }
    return String(result.toFixed(5)
)}
