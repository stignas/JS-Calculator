export default class Calculator {
  constructor(
    currentOperand = "",
    previousOperand = "",
    operation = undefined,
    screen = document.getElementById("screen")
  ) {
    this.currentOperand = currentOperand;
    this.previousOperand = previousOperand;
    this.operation = operation;
    this.screen = screen;
  }

  updateScreen(text) {
    text = text.toString();
    this.screen.innerText = text;
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
    this.updateScreen("0");
  }

  addNumber(number) {
    if (this.currentOperand.length >= 20) return;
    if (number === "." && this.currentOperand.includes(".")) return;
    if (number === "." && this.currentOperand === "") {
      this.currentOperand = "0";
    }
    this.currentOperand += number;
  }

  operator(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "" || operation === "sqrt") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let res;
    const prev = Number(this.previousOperand);
    const current = Number(this.currentOperand);

    if (typeof prev !== "number" || typeof current !== "number") return;

    switch (this.operation) {
      case "+":
        res = prev + current;
        break;
      case "-":
        res = prev - current;
        break;
      case "*":
        res = prev * current;
        break;
      case "/":
        res = prev / current;
        break;
      case "sqrt":
        res = Math.sqrt(prev);
        break;
      default:
        return;
    }

    this.currentOperand = res;
    this.operation = undefined;
    this.previousOperand = "";
    this.updateScreen(res.toString());
  }
}
