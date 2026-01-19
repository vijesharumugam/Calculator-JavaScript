let currentOperand = "";
let previousOperand = "";
let currentOperator = null;

const display = document.querySelector(".display-input");
const numberButtons = document.querySelectorAll(".btn.number");
const operatorButtons = document.querySelectorAll(".btn.operator");
const clearButton = document.querySelector(".btn.clear");
const equalButton = document.querySelector(".btn.equal");

function updateDisplay(value) {
  display.value = value === "" ? "" : String(value);
}

function clearAll() {
  currentOperand = "";
  previousOperand = "";
  currentOperator = null;
  updateDisplay("");
}

function appendNumber(num) {
  if (num === "." && currentOperand.includes(".")) return;
  if (num !== "." && currentOperand === "0") {
    currentOperand = num;
  } else {
    currentOperand += num;
  }
  updateDisplay(currentOperand);
}

function chooseOperator(op) {
  if (currentOperand === "" && previousOperand !== "") {
    currentOperator = op;
    return;
  }
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    compute();
  } else {
    previousOperand = currentOperand;
  }
  currentOperand = "";
  currentOperator = op;
}

function formatResult(n) {
  if (!isFinite(n)) return "Error";
  const fixed = Number.parseFloat(n.toFixed(10));
  return Number.isInteger(fixed) ? String(fixed) : String(+fixed.toPrecision(12));
}

function compute() {
  if (currentOperator == null || previousOperand === "" || currentOperand === "") return;
  const a = parseFloat(previousOperand);
  const b = parseFloat(currentOperand);
  let result;
  switch (currentOperator) {
    case "+":
      result = a + b;
      break;
    case "−":
    case "-":
      result = a - b;
      break;
    case "×":
    case "*":
      result = a * b;
      break;
    case "÷":
    case "/":
      result = b === 0 ? Infinity : a / b;
      break;
    default:
      return;
  }
  const formatted = formatResult(result);
  updateDisplay(formatted);
  previousOperand = formatted === "Error" ? "" : String(formatted);
  currentOperand = "";
  currentOperator = null;
}

numberButtons.forEach((btn) => {
  btn.addEventListener("click", () => appendNumber(btn.textContent.trim()));
});

operatorButtons.forEach((btn) => {
  btn.addEventListener("click", () => chooseOperator(btn.textContent.trim()));
});

if (equalButton) {
  equalButton.addEventListener("click", () => {
    compute();
  });
}

if (clearButton) {
  clearButton.addEventListener("click", () => {
    clearAll();
  });
}

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if ((key >= "0" && key <= "9") || key === ".") {
    appendNumber(key);
    return;
  }
  if (["+", "-", "*", "/"].includes(key)) {
    const map = { "+": "+", "-": "−", "*": "×", "/": "÷" };
    chooseOperator(map[key]);
    return;
  }
  if (key === "Enter" || key === "=") {
    compute();
    return;
  }
  if (key === "Escape" || key.toLowerCase() === "c") {
    clearAll();
  }
});

updateDisplay("");

