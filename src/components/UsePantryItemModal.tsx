import "../styles/sass/AddPantryItemModal.css";
import { Modal } from "../components/Modal";
import { FormField } from "./FormField";
import { FormSelectField } from "./FormSelectField";
import { Button } from "./Button";
import { ItemEntryFormValidator } from "../api/ItemEntryFormValidator";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  closeModal?: any;
  submitModal?: any;
  availableUnits?: Array<string>;
}

export const UsePantryItemModal = ({
  isOpen,
  closeModal,
  submitModal,
  availableUnits,
}: Props) => {
  const [quantity, setQuantity] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("g");

  const sendClose = () => {
    setQuantity("");
    setQuantityUnit("g");

    closeModal();
  };

  const sendSubmit = () => {
    if (isNaN(Number.parseFloat(quantity))) {
      alert("Please enter a valid number!");
      return;
    }

    submitModal(quantity, quantityUnit);

    sendClose();
  };

  function validateField(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const target = event.target;
    const name = target.name;
    //console.log(name);
    console.log(target);
    let itemEntryFormValidator = new ItemEntryFormValidator();

    switch (name) {
      case "quantity":
        console.log("Validating quantity");
        let convertedQuantity;
        try {
          convertedQuantity = itemEntryFormValidator.validateQuantity(
            target.value
          );
          document
            .querySelector(`input#form-text-quantity`)
            ?.classList.remove("field-error");
        } catch (error) {
          console.log(error);

          document
            .querySelector(`input#form-text-quantity`)
            ?.classList.add("field-error");
        }

        // Consider setting the form equal to the converted value to
        // remove any trailing characters after int conversion
        console.log("convertedQuantity = ", convertedQuantity);
        if (convertedQuantity) {
          setQuantity(convertedQuantity.toString());
        }
        break;

      case "quantityUnit":
        setQuantityUnit(target.value);
        break;
    }
  }

  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const target = event.target;
    const name = target.name;
    console.log(name);
    console.log(target.value);

    switch (name) {
      case "quantity":
        setQuantity(target.value);
        break;

      case "quantityUnit":
        setQuantityUnit(target.value);
        break;
    }
  }

  /*  Use inline styling to remove the ability to set the quantity
  within the modal. This feature may return, and I do not want to
  remove all the logic only to potentially re-introduce it later. */
  return (
    <Modal isOpen={isOpen}>
      <div id="modal-contents">
        <h1 id="modal-heading">How much did you use?</h1>

        <div id="form-field-container">
          <div id="quantity-field">
            <FormField
              orientation="horizontal"
              name="quantity"
              label="Quantity"
              onBlur={validateField}
              onChange={handleChange}
              value={quantity}
            ></FormField>
            <FormSelectField
              name="quantityUnit"
              label="quantityUnit"
              options={availableUnits ? availableUnits : ["g", "oz", "lb"]}
              onChange={handleChange}
              value={quantityUnit}
            />
          </div>
        </div>

        <div id="button-container">
          <Button text="Back" id="back" click={sendClose} />
          <Button text="Submit" id="submit" click={sendSubmit} />
        </div>
      </div>
    </Modal>
  );
};
