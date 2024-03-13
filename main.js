const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");

let input = "";
// let output = "";

for (let key of keys) {
  const value = key.dataset.key;

  key.addEventListener("click", () => {
    if (value == "clear") {
      input = "";
      display_input.innerHTML = "";
      display_output.innerHTML = "";
    } else if (value == "backspace") {
      input = input.slice(0, -1);
      display_input.innerHTML = cleanInput(input);
    } else if (value == "=") {
      let preparedInput = prepareInputForEvaluation(input);
      try {
        let result = eval(preparedInput);
        display_output.innerHTML = result;
      } catch (error) {
        console.error(error);
        display_output.innerHTML = "Error!";
      }
    } else if (value == "brackets") {
      if (
        input.indexOf("(") == -1 ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") < input.lastIndexOf(")"))
      ) {
        input += "(";
      } else if (
        (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")"))
      ) {
        input += ")";
      }

      display_input.innerHTML = cleanInput(input);
    } else {
      input += value;
      display_input.innerHTML = cleanInput(input);
    }
  });
}

function cleanInput(input) {
  let input_array = input.split("");
  let input_array_length = input_array.length;

  for (let i = 0; i < input_array_length; i++) {
    if (input_array[i] == "*") {
      input_array[i] = `<span class="operator">x</span>`;
    } else if (input_array[i] == "/") {
      input_array[i] = `<span class="operator">÷</span>`;
    } else if (input_array[i] == "+") {
      input_array[i] = `<span class="operator">+</span>`;
    } else if (input_array[i] == "-") {
      input_array[i] = `<span class="operator">-</span>`;
    } else if (input_array[i] == "(") {
      input_array[i] = `<span class="brackets">(</span>`;
    } else if (input_array[i] == ")") {
      input_array[i] = `<span class="brackets">)</span>`;
    } else if (input_array[i] == "%") {
      input_array[i] = `<span class="operator">%</span>`;
    }
  }
  return input_array.join("");
}

// function preprocessInputForMultiplication(input) {
//   // Replace instances where a number is immediately followed by an opening bracket
//   // e.g., "2(3+4)" becomes "2*(3+4)"
//   return input.replace(/(\d)(\()/g, "$1*$2");
// }

function prepareInputForEvaluation(input) {
  // Memastikan angka sebelum tanda kurung dikalikan dengan isi tanda kurung
  // Ini mengubah ekspresi seperti "2+3(4+1)" menjadi "2+3*(4+1)" untuk evaluasi yang benar
  return input.replace(/(\d)\(/g, '$1*(');
}
