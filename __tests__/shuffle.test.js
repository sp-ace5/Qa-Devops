const shuffle = require("../src/shuffle");

describe("shuffle should...", () => {
  it("Return shuffle array using duplicate entries", () => {
    const inputArray = [1, 2, 2, 3, 4, 4, 4, 5];
    const result = shuffle(inputArray);

    expect(result.length).toBe(inputArray.length);

    expect(result).toEqual(expect.arrayContaining(inputArray));

    expect(result).not.toEqual(inputArray);
  });

  it("Returns shuffle array", () => {
    const inputArray = [1, 2, 3, 4, 5];
    const result = shuffle(inputArray);

    expect(result.length).toBe(inputArray.length);

    expect(result).toEqual(expect.arrayContaining(inputArray));

    expect(result).not.toEqual(inputArray);
  });
});