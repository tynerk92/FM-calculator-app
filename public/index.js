// Theme script
(function () {
  const themeSelector = document.querySelector(".selector");
  themeSelector.addEventListener("click", (e) => {
    selectNextTheme(themeSelector);
  });

  function selectNextTheme(selector) {
    const theme1 = document.body.classList.contains("theme1");
    const theme2 = document.body.classList.contains("theme2");
    const theme3 = document.body.classList.contains("theme3");

    if (theme1) {
      document.body.classList.remove("theme1");
      document.body.classList.add("theme2");
    } else if (theme2) {
      document.body.classList.remove("theme2");
      document.body.classList.add("theme3");
    } else if (theme3) {
      document.body.classList.remove("theme3");
      document.body.classList.add("theme1");
    }
  }
})();

// Calculator Script
(function () {
  const buttons = document.querySelectorAll(".button-grid div");
  const displayElement = document.getElementById("display-text");
  const displayOp = document.getElementById("display-op");

  let left = 0;
  let op = "";
  let total = 0;

  displayOp.innerHTML = "0";

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const value = e.target.innerHTML;

      const right = parseFloat(displayElement.innerHTML);

      switch (value) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case ".":
          displayElement.innerHTML += value;
          break;
        case "+":
        case "-":
        case "x":
        case "/":
          if (!op) op = value;

          console.log("Doing operation: ", value);
          console.log(`${left} ${op} ${right}`);
          // do the op
          if (left) {
            left = calculate(left, op, right);
          } else {
            left = parseFloat(displayElement.innerHTML);
          }

          displayElement.innerHTML = "";
          op = value;

          break;
        case "DEL":
          // Remove the last item in the calculation string
          displayElement.innerHTML = displayElement.innerHTML.slice(0, -1);
          break;
        case "RESET":
          // Remove everything and reset the calculation state
          left = 0;
          op = "";
          total = 0;
          displayElement.innerHTML = "";
          displayOp.innerHTML = "";
          console.log("RESET");
          break;
        case "=":
          if (op) {
            displayElement.innerHTML = parseFloat(
              calculate(left, op, right).toFixed(8)
            );
          }
          displayOp.innerHTML = "";
          left = 0;
          op = "";
          break;
        default:
          break;
      }

      if (left) {
        displayOp.innerHTML = `${parseFloat(left.toFixed(8))} ${op}`;
      } else {
        displayOp.innerHTML = "0";
      }

      console.log(left, op, right);
    });
  });

  function calculate(left, op, right) {
    let total = 0;
    switch (op) {
      case "+":
        total = left + right;
        break;
      case "-":
        total = left - right;
        break;
      case "/":
        total = left / right;
        break;
      case "x":
        total = left * right;
        break;
    }
    return total;
  }
})();
