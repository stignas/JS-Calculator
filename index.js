const numberButtons = document.querySelectorAll("[data-number]"); // skaiciu mygtuku sarasas
const operatorButtons = document.querySelectorAll("[data-operator]"); // operatoriu mygtuku sarasas
const clearButton = document.querySelector("[data-clear-all]"); // clear-all mygtukas
const equalsButton = document.querySelector("[data-equals]"); // lygu mygtukas
const buttons = document.querySelectorAll("button"); // visi mygtuku sarasas
let screen = document.getElementById("screen"); // skaiciuotuvo ekranas

//objektas "calculator" su savo funkcijom

const calculator = {
  currentOperand: "",
  previousOperand: "",
  operation: undefined,

  // informacijos ekrane atnaujinimo funkcija
  updateScreen(text) {
    text = text.toString();
    text = text.slice(0, text.indexOf(".") + 18 + 1); // apribojam kiek skaiciu po kablelio rodyt (?)
    screen.innerText = text;
  },

  // clear all funkcija
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.updateScreen("0");
    this.operation = undefined;
  },

  // ivedamo skaiciaus paemimo funkcija

  addNumber(number) {
    if (this.currentOperand.length >= 20) return; // ribojam kintamojo max ilgi iki 20 skaitmenu
    if (number === "." && this.currentOperand.includes(".")) return; // neleidziam prideti daugiau kaip vieno kablelio
    if (number === "." && this.currentOperand === "") {
      this.currentOperand = "0"; // paspaudus tik kableli, pridedam nuli priekyje
    }
    this.currentOperand += number; //pridedam paspausta skaiciu i eilute
  },

  // operacijos funkcija

  operator(operation) {
    if (this.currentOperand === "") return; // jeigu nera ivesta kintamojo, funkcija nutraukiama
    if (this.previousOperand !== "" || operation === "sqrt") {
      // jeigu operacija "sqrt" arba ivestas ir antras kintamasis, atliekam skaiciavimo funkcija
      this.compute();
    }

    this.operation = operation; // operacijai priskiriamas ivestas operatorius
    this.previousOperand = this.currentOperand; // skaicius ivestas iki paspaudziant operatoriu priskiriamas pirmam kintamjam
    this.currentOperand = "";
  },

  compute() {
    let res; //kintamasis rezultatui
    const prev = Number(this.previousOperand); //vidinis kintamasis, kuris ivesto kintamojo padaro skaiciumi
    const current = Number(this.currentOperand);

    if (typeof prev !== "number" || typeof current !== "number") return; // patikrinam ar abiem kintamiesiem sekmingai pakesitas tipas i number

    switch (
      this.operation // apsirasom visas operacijas pagal ivesta operatoriu
    ) {
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

    this.currentOperand = res; // gauta rezultata priskiriam esamam kintamajam, kad galetume testi operacijas
    this.operation = undefined; // operacija resetinam i pradine reiskme
    this.previousOperand = ""; // istrinam pries tai buvusi kintamaji
    this.updateScreen(res.toString()); // atnaujinam ekrana parodydami gauta rezultata
    // screen.innerText = res;
  },
};

calculator.clear(); // uzsikrovus skriptui pradedam nuo svariu kintamuju

// all clear mygtuko eventas
clearButton.addEventListener("click", () => {
  calculator.clear();
});

// number mygtuko eventas
numberButtons.forEach((button) => {
  // is number buttons saraso kiekvienam mygtukui (button) priskiriama sekanti funkcija
  button.addEventListener("click", (e) => {
    let number = e.target.value; // pasiimam mygtuko reiksme
    calculator.addNumber(number); // pridedam ja i kintamojo eilute
    calculator.updateScreen(calculator.currentOperand); // ekrane parodom ivesta skaiciu
  });
});

operatorButtons.forEach((button) => {
  // is operatoriu mygtuku saraso kiekvienam mygtukui priskiriam sekancia funkcija
  button.addEventListener("click", (e) => {
    calculator.operator(e.target.value); // paimam ir priskiriam operatoriaus mygtuko reiksme
    if (e.target.value === "sqrt") {
      // jeigu operatorius "sqrt" is karto atliekame skaiciavimus
      calculator.compute();
    }
  });
});

equalsButton.addEventListener("click", () => {
  // paspaudus "=" atliekame skaiciavimus
  calculator.compute();
});

// CSS valdymas

buttons.forEach((button) => {
  // kiekvienam mygtukui is saraso priskiriam funkcija
  button.addEventListener("mousedown", (e) => {
    // kol paspaustas peles mygtukas, prideda "onpress" css klase
    e.target.classList.add("onpress");
  });
});

buttons.forEach((button) => {
  // kiekvienam mygtukui is saraso priskiriam funkcija
  button.addEventListener("mouseup", (e) => {
    // kai peles mygtukas atleidziamas nuimam "onpress" css klase
    e.target.classList.remove("onpress");
  });
});

buttons.forEach((button) => {
  // kiekvienam mygtukui is saraso priskiriam funkcija
  button.addEventListener("mouseover", (e) => {
    // uzvedus pele ant mygtuko priskiriam css klase "hover"
    e.target.classList.add("hover");
  });
});

buttons.forEach((button) => {
  // kiekvienam mygtukui is saraso priskiriam funkcija
  button.addEventListener("mouseout", (e) => {
    // patraukus pele nuo mygtuko nuimam css klase "hover"
    e.target.classList.remove("hover");
  });
});
