const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const resultDisplay = document.querySelector("#result");
const prevOpsDisplay = document.querySelector("#previous-operations");
const clearBtn = document.querySelector("#clear-button");
const equalBtn = document.querySelector("#equal");
const backspaceBtn = document.querySelector("#backspace-button");

let expression = [];
let currNum = "";

function evaluateExpr() {
  if (expression.length < 3) return;

  const [operand1, operator, operand2] = expression;
  if (isNaN(operand1) || isNaN(operand2)) return;

  let result;
  switch (operator) {
    case "+":
      result = operand1 + operand2;
      break;
    case "-":
      result = operand1 - operand2;
      break;
    case "×":
      result = operand1 * operand2;
      break;
    case "÷":
      result = operand1 / operand2;
      break;
  }

  expression = [result];
  resultDisplay.innerText = result;
}

function handleNumClick(event) {
  const num = event.target.innerText;
  appendNum(num);
}

function handleOpClick(event) {
  const operator = event.target.innerText;
  handleOp(operator);
}

function handleClearClick() {
  currNum = "";
  expression = [];
  resultDisplay.innerText = "";
  prevOpsDisplay.innerText = "";
}

function handleEqualClick() {
  if (currNum) expression.push(parseInt(currNum));
  evaluateExpr();
  prevOpsDisplay.innerText = resultDisplay.innerText;
  currNum = "";
}

function handleBackspaceClick() {
  if (!currNum) {
    removeLastExpr();
    return;
  }
  currNum = currNum.slice(0, -1);
  resultDisplay.innerText = currNum;
}

function appendNum(num) {
  currNum += num;
  resultDisplay.innerText = currNum;
}

function handleOp(operator) {
  if (currNum) expression.push(parseInt(currNum));
  else if (
    expression[expression.length - 1] === "+" ||
    expression[expression.length - 1] === "-" ||
    expression[expression.length - 1] === "×" ||
    expression[expression.length - 1] === "÷" ||
    expression.length === 0
  )
    return;

  expression.push(operator);
  currNum = "";
  resultDisplay.innerText = "";
  prevOpsDisplay.innerText = `${expression[0]} ${operator}`;
  evaluateExpr();
}

function removeLastExpr() {
  if (expression.length === 0) return;
  let prev = expression[expression.length - 1];
  expression.pop();
  if (prev === "+" || prev === "-" || prev === "×" || prev === "÷")
    prevOpsDisplay.innerText = prevOpsDisplay.innerText.slice(
      0,
      -2
    );
  else {
    prevOpsDisplay.innerText = prevOpsDisplay.innerText.slice(
      0,
      -1
    );
    if (Math.abs(prev) > 10) expression.push(Math.floor(prev / 10));
    else
      prevOpsDisplay.innerText = "",
      expression = [],
      currNum = "",
      resultDisplay.innerText = "";
  }
}

numberBtns.forEach((btn) => {
  btn.addEventListener("click", handleNumClick);
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", handleOpClick);
});

clearBtn.addEventListener("click", handleClearClick);

equalBtn.addEventListener("click", handleEqualClick);

backspaceBtn.addEventListener("click", handleBackspaceClick);


