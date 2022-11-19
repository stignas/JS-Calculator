import Calculator from "./modules/calculator.js";

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.querySelector("[data-clear-all]");
const equalsButton = document.querySelector("[data-equals]");
const buttons = document.querySelectorAll("button");

const calculator = new Calculator();

clearButton.addEventListener("click", () => {
  calculator.clear();
});

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    calculator.addNumber(e.target.value);
    calculator.updateScreen(calculator.currentOperand);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    calculator.operator(e.target.value);
    if (e.target.value === "sqrt") {
      calculator.compute();
    }
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
});

// CSS valdymas

buttons.forEach((button) => {
  button.addEventListener("mousedown", (e) => {
    e.target.classList.add("onpress");
  });
});

buttons.forEach((button) => {
  button.addEventListener("mouseup", (e) => {
    e.target.classList.remove("onpress");
  });
});

buttons.forEach((button) => {
  button.addEventListener("mouseover", (e) => {
    e.target.classList.add("hover");
  });
});

buttons.forEach((button) => {
  button.addEventListener("mouseout", (e) => {
    e.target.classList.remove("hover");
  });
});
