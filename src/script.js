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
  // Get the input values and replace commas with periods
  let weightInput = document.getElementById("weight").value.replace(",", ".");
  let heightInput = document.getElementById("height").value.replace(",", ".");

  // Parse the normalized input values as floats
  const weight = parseFloat(weightInput);
  const height = parseFloat(heightInput);

  try {
    // Calculate IMC and get classification
    const { imc, classification } = calculateIMCValue(weight, height);

    // Create the result table
    const infoContainer = document.querySelector(".container-info");
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
  } catch (error) {
    alert(error.message);
  }
}

// Attach the function to the button click event
document.querySelector("button").addEventListener("click", displayIMCResult);
