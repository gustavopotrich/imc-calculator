// Function to calculate IMC and determine classification
function calculateIMCValue(weight, height) {
  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    throw new Error("Invalid weight or height");
  }

  const imc = weight / (height * height);
  let classification;

  if (imc < 17) {
    classification = "Very underweight";
  } else if (imc <= 18.49) {
    classification = "Underweight";
  } else if (imc <= 24.99) {
    classification = "Normal weight";
  } else if (imc <= 29.99) {
    classification = "Overweight";
  } else if (imc <= 34.99) {
    classification = "Obesity I";
  } else if (imc <= 39.99) {
    classification = "Obesity II (severe)";
  } else if (imc >= 40) {
    classification = "Obesity III (morbid)";
  }

  return { imc: imc.toFixed(2), classification };
}

// Function to handle DOM interactions
function displayIMCResult() {
  const weightInput = document.getElementById("weight");
  const heightInput = document.getElementById("height");
  const button = document.querySelector("button");
  const infoContainer = document.querySelector(".container-info");

  console.log("Button text before click:", button.textContent);

  // Check if we are in "calculate another" mode
  if (button.textContent === "Calculate another!") {
    console.log("Resetting form...");
    // Reset the form and button text
    weightInput.value = "";
    heightInput.value = "";
    infoContainer.innerHTML =
      "<p>Find out now if you are at your ideal weight!</p>";
    button.textContent = "Calculate IMC!";
    return;
  }

  // Parse the input values
  const weight = parseFloat(weightInput.value.replace(",", "."));
  const height = parseFloat(heightInput.value.replace(",", "."));

  try {
    // Calculate IMC and get classification
    const { imc, classification } = calculateIMCValue(weight, height);

    // Display the result
    infoContainer.innerHTML = `
      <div class="imc-table">
        <table>
          <thead>
            <tr>
              <th>Weight</th>
              <th>Height</th>
              <th>IMC</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${weight.toFixed(2)}</td>
              <td>${height.toFixed(2)}</td>
              <td>${imc}</td>
              <td>${classification}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
    infoContainer.classList.add("result");

    // Change button text to "Calculate another!"
    button.textContent = "Calculate another!";
    console.log("Button text changed to:", button.textContent);
  } catch (error) {
    alert(error.message);
  }
}

// Attach the function to the button click event
document.querySelector("button").addEventListener("click", displayIMCResult);
