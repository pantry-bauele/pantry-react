export class ItemEntryFormValidator {
  // Change this function to not return values
  // but to throw direct errors about the conversion
  // failure, to enable returned the validated value
  //later
  _validateNumber(number: string | number, name: string) {
    if (typeof number === "string") {
      number = Number.parseFloat(number);

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
    return this._validateNumber(serving, "Serving");
  }

  validateQuantity(quantity: string | number) {
    return this._validateNumber(quantity, "Quantity");
  }
}
