export class ItemEntryFormValidator {
  // Change this function to not return values
  // but to throw direct errors about the conversion
  // failure, to enable returned the validated value
  //later
  _validateNumber(number: string | number, name: string) {
    if (typeof number === "string") {
      number = Number.parseInt(number);

      if (Number.isNaN(number)) {
        throw new Error(`${name} must be an integer value`);
      } else if (number < 0) {
        throw new Error(`${name} must be greater than 0`);
      }
    }

    return number;
  }

  validateCalories(calories: string | number) {
    return this._validateNumber(calories, "Calories");
  }

  validateServing(serving: string | number) {
    switch (this._validateNumber(serving, "Serving")) {
      case 1:
        throw new Error("Unknown failure");

      case 2:
        throw new Error("Serving must be an integer value");

      case 3:
        throw new Error("Serving must not be less than 0");
    }
  }

  validateQuantity(quantity: string | number) {
    switch (this._validateNumber(quantity, "Quantity")) {
      case 1:
        throw new Error("Unknown failure");

      case 2:
        throw new Error("Quantity must be an integer value");

      case 3:
        throw new Error("Quantity must not be less than 0");
    }
  }
}
