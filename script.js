const btnNumbers = document.querySelectorAll('.number'),
    btnOperators = document.querySelectorAll('.operator'),
    btnClear = document.querySelectorAll('.clear-btn'),
    btnDecimal = document.getElementById('decimal'),
    display = document.getElementById('display'),
    message = document.getElementById('message'),
    btnSign = document.getElementById('sign'),
    btnRadical = document.getElementById('radical'),
    btnPi = document.getElementById('pi'),
    btnPow = document.getElementById('pow')
let pendingOperator = '=', //use to remember the chosen operator
    isStartOfNewNumber = true //use to find out whether it is start of new number
let resultOrPreviousOperation = 0
message.value = 'Hello there! This is log \nIf you found bugs or something else please contact me (@cootook) on telegram or discord.\nTo get POW: number^degree of\nTo get square root: number √\nTry to ude keyboard, press "-" before typing number to get negative one\n '
for (let i = 0; i < btnNumbers.length; i++) {  //traverse the array of number buttons
    btnNumbers[i].addEventListener('click', numberClick)
}
for (let i = 0; i < btnOperators.length; i++) { //traverse thr arr of operator btns
    btnOperators[i].addEventListener('click', operatorClick)
}
for (let i = 0; i < btnClear.length; i++) { //traverse the arr of clear btns
    btnClear[i].addEventListener('click', clearDisplayOrMemory)
}
btnDecimal.addEventListener('click', decimalClick) //listen to the dot btn
btnSign.addEventListener('click', invertNumberSign) //listen to the sign btn, change the sign of display.value
btnRadical.addEventListener('click', getRadical) //listen to the radical btn
btnPi.addEventListener('click', getPi) //listen to the Pi btn and push Pi into display
function getPi() {
    display.value = Math.PI
    message.value += display.value
}
function invertNumberSign() {
    regexp = new RegExp(display.value + '$', 'g') //use RegExp to change text in textarea
    display.value = +display.value * -1
    message.value = message.value.replace(regexp, display.value)
}
function numberClick(btnValue) {
    message.value += btnValue.target.textContent //log every click into textarea
    if (isStartOfNewNumber || display.value == '0' || display.value === 'ERROR') { //start new number
        display.value = btnValue.target.textContent
        isStartOfNewNumber = false
        return
    }
    else {
        display.value += btnValue.target.textContent
        return
    } //add digit to the end of the number
}
function getRadical() {
    if (parseFloat(display.value) < 0) {
        display.value = 'ERROR'
        message.value += 'The square root of a negative number \ndoes not exist among the set of Real Numbers.\n'
    }
    else {
        message.value += '>> √' + display.value
        display.value = Math.sqrt(parseFloat(display.value))
        message.value += ' = ' + display.value + '\n'
        resultOrPreviousOperation = display.value
    }
}
function operatorClick(btnValue) {
    message.value += btnValue.target.textContent //log click into textarea
    if (btnValue.target.textContent === '-' && isStartOfNewNumber) {
        display.value = btnValue.target.textContent
        isStartOfNewNumber = false
        return
    }
    isStartOfNewNumber = true // after setting operator start new number
    let a = parseFloat(display.value)
    let b = parseFloat(resultOrPreviousOperation)
    if (pendingOperator === '=') resultOrPreviousOperation = display.value
    else if (pendingOperator === '+') display.value = checkTheResult(a + b)
    else if (pendingOperator === '-') display.value = checkTheResult(b - a)
    else if (pendingOperator === '*') display.value = checkTheResult(a * b)
    else if (pendingOperator === '/') display.value = checkTheResult(b / a)
    else if (pendingOperator === '^') display.value = checkTheResult(Math.pow(b, a))
    else display.value = 'fatal error'
    resultOrPreviousOperation = display.value
    if (btnValue.target.textContent === '=') message.value += display.value + '\n'
    pendingOperator = btnValue.target.textContent
    return
}
function checkTheResult(res) { //check if result is NaN and fix 0.2*0.4=0.08000000000000002 problems
    if (isNaN(res)) {
        message.value += 'The result is not a Real Number or something else is wrong\n'
        return 'ERROR'
    }
    else return Math.round(res * 1000000000000) / 1000000000000
}
function clearDisplayOrMemory(btnValue) {
    btnValue.target.textContent
    if (btnValue.target.textContent === 'ce') display.value = "0"
    else {
        display.value = '0'
        message.value = ''
        resultOrPreviousOperation = 0
        pendingOperator = '='
        isStartOfNewNumber = true
    }
}
function decimalClick() {
    if (display.value.indexOf('.') === -1) display.value += '.'
    message.value += '.'
}
function checkKeyboard(key) {
    const passKey = { target: { textContent: '' } }
    passKey.target.textContent = key.key
    if (key.key >= '0' && key.key <= '9') numberClick(passKey)
    else if (key.key === '+' || key.key === '-' || key.key === '*' || key.key === '/') operatorClick(passKey)
    else if (key.key === '.') decimalClick(passKey)
    else if (key.key === '=' || key.key === 'Enter') {
        passKey.target.textContent = '='
        operatorClick(passKey)
        key.preventDefault()
    }
}
document.addEventListener('keydown', checkKeyboard)

