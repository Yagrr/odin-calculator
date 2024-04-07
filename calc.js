// To do:
// - create fn updateCalcDisplay for each operation or number added
// - add fn that tests if input is valid: operator cannot follow
// another operator unless if it's a negative number

function equals() {
    // probably redundant function
    // check current value 
    // activates when = is pressed
    // uses ops based on evalInput return
    // For loop through evalInput array
}

function operate(op,a,b) {
    // activates when = is pressed
    // Ensure that operate() follows operator precedence
    // Use postfix expression instead. Could filter all numbers out first?
    // Idea: create global stack for current calculation that has all the ops?
        // paren>exponent>multi>div>add>subst
}

function evalInput() {
    // fn checks if input is valid. Returns an array
    // Activates when calculator button is pressed
        // reduce function could be used to create a single value to add to stack
    
            // ["21","+","-1","*","3"]

    // Feature: add parentheses (leetcode check if parenthese are balanced)

   // checks global  stack to determine if input is valid
    // if = operator, reset savedValue and add currentValue
        // edge-case, if = minus and previous char is ops, make negative number
    // if = number, 
}

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
    return a/b
}

function pow(a,b) {
    return a^b
}
