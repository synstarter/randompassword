// Character sets
const numbers = "0123456789";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const symbols = '!@#$%^&*()_+-=[]{}|;:",.<>?/`~';

// Generate password function
function generatePassword() {
  // User input
  const length = parseInt(document.querySelector("#num-char").value);
  const chosenOption = document.querySelector(
    'input[name="char-comb"]:checked'
  ).value;

  // Length validation
  if (length < 8 || length > 50) {
    alert("Password characters length must be between 8 and 50");
    return "";
  }

  // Characters
  let charComb = "";
  if (chosenOption === "all") {
    charComb = numbers + lowercase + uppercase + symbols;
  }
  if (chosenOption === "numbers") {
    charComb = numbers;
  }
  if (chosenOption === "lowercase") {
    charComb = lowercase;
  }
  if (chosenOption === "uppercase") {
    charComb = uppercase;
  }
  if (chosenOption === "symbols") {
    charComb = symbols;
  }

  // Generate password
  let passwordValue = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charComb.length);
    passwordValue += charComb[randomIndex];
  }

  // Display password
  const displayPassword = document.querySelector("#pwd-value");
  const displayPasswordContainer = document.querySelector(".password");
  const copyBtn = document.querySelector("#copy-btn");

  displayPassword.textContent = passwordValue;
  displayPassword.classList.remove("pwd-inactive-value");
  displayPassword.classList.add("pwd-active-value");
  displayPasswordContainer.classList.remove("no-password");
  displayPasswordContainer.classList.add("with-password");
  copyBtn.classList.remove("hidden");
}

// Copy to clipboard function
function copyToClipboard() {
  const passwordContent = document.querySelector("#pwd-value").textContent;
  navigator.clipboard.writeText(passwordContent).then(() => {
    const successMsg = document.querySelector(".success-msg");
    successMsg.classList.remove("hidden");

    // Hide msg after 2 seconds
    setTimeout(() => {
      successMsg.classList.add("hidden");
    }, 2000);
  });
}

// Event listeners
document
  .querySelector("#generate-btn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevents the form from submitting
    generatePassword(); // Calls the function
  });

document.querySelector("#copy-btn").addEventListener("click", copyToClipboard);
