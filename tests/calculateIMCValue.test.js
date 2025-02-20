const { calculateIMCValue } = require("../src/script");

test("calculates IMC correctly for normal weight", () => {
  const result = calculateIMCValue(70, 1.75);
  expect(result.imc).toBe("22.86");
  expect(result.classification).toBe("Normal weight");
});

test("throws error for invalid weight", () => {
  expect(() => calculateIMCValue(-70, 1.75)).toThrow(
    "Invalid weight or height"
  );
});

test("throws error for invalid height", () => {
  expect(() => calculateIMCValue(70, 0)).toThrow("Invalid weight or height");
});

test("classifies as very underweight", () => {
  const result = calculateIMCValue(45, 1.75);
  expect(result.classification).toBe("Very underweight");
});

test("classifies as obesity III (morbid)", () => {
  const result = calculateIMCValue(130, 1.75); // Adjusted weight to achieve IMC >= 40
  expect(result.classification).toBe("Obesity III (morbid)");
});
