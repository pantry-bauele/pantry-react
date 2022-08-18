import { useState } from "react";

import { Modal } from "./Modal";
import { FormField } from "../FormField";
import { FormSelectField } from "../FormSelectField";
import { Button } from "../Button";
import { ItemEntryFormValidator } from "../../api/ItemEntryFormValidator";

import "../../styles/sass/AddPantryItemModal.css";

interface Props {
  isOpen: boolean;
  closeModal: Function;
  submitModal: Function;
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
    // Set modal back to default state
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

  const validateField = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const target = event.target;
    const name = target.name;
    let itemEntryFormValidator = new ItemEntryFormValidator();

    switch (name) {
      case "quantity":
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

        if (convertedQuantity) {
          setQuantity(convertedQuantity.toString());
        }
        break;

      case "quantityUnit":
        setQuantityUnit(target.value);
        break;
    }
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const target = event.target;
    const name = target.name;

    switch (name) {
      case "quantity":
        setQuantity(target.value);
        break;

      case "quantityUnit":
        setQuantityUnit(target.value);
        break;
    }
  };

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
              options={availableUnits ? availableUnits : ["g", "oz", "lb"]}
              onChange={handleChange}
              value={quantityUnit}
            />
          </div>
        </div>

        <div id="modal-button-container">
          <Button
            text="Back"
            className="brand-button-red button-medium clickable-button"
            click={sendClose}
          />
          <Button
            text="Submit"
            className="brand-button-green button-medium clickable-button"
            click={sendSubmit}
          />
        </div>
      </div>
    </Modal>
  );
};
