import { useState } from "react";

import { Modal } from "./Modal";
import { FormField } from "../FormField";
import { FormSelectField } from "../FormSelectField";
import { Button } from "../Button";
import { ItemEntryFormValidator } from "../../api/ItemEntryFormValidator";

import "../../styles/sass-built/AddPantryItemModal.css";

interface Props {
  isOpen: boolean;
  closeModal: Function;
  submitModal: Function;
}

export const AddPantryItemModal = ({
  isOpen,
  closeModal,
  submitModal,
}: Props) => {
  const [quantity, setQuantity] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("g");
  const [expirationDate, setExpirationDate] = useState(0);

  const sendClose = () => {
    setQuantity("");
    setQuantityUnit("g");
    setExpirationDate(0);

    closeModal();
  };

  const sendSubmit = () => {
    submitModal(quantity, quantityUnit, expirationDate);

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

      case "expirationDate":
        var dateElement = document.querySelector(
          'input[type="date"]'
        ) as HTMLInputElement;
        if (dateElement !== null) {
          var dateValue = dateElement.valueAsNumber;
          setExpirationDate(dateValue);
        }

        break;
    }
  };

  /*  Use inline styling to remove the ability to set the quantity
  within the modal. This feature may return, and I do not want to
  remove all the logic only to potentially re-introduce it later. */
  return (
    <Modal isOpen={isOpen}>
      <div id="modal-contents">
        <h1 id="modal-heading">Adding Pantry Item</h1>

        <div id="form-field-container">
          <div style={{ display: "none" }} id="quantity-field">
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
              options={["g", "oz", "lb"]}
              onChange={handleChange}
              value={quantityUnit}
            />
          </div>

          <div id="modal-date-container">
            <div id="form-label-horizontal">Expiration Date</div>
            <input
              type="date"
              id="modal-date-picker"
              onChange={handleChange}
              name="expirationDate"
            ></input>
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
