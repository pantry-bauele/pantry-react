import React, { useEffect, useState } from "react";

import { Item as ItemObject } from "../pantry-shared/src/item";
import { getMeasurementUnits } from "../pantry-shared/src/measurementUnits";
import { ItemEntryFormValidator } from "../api/ItemEntryFormValidator";
import { FormField } from "./FormField";
import { FormSelectField } from "./FormSelectField";
import { Button } from "./Button";

import "../styles/sass-built/ItemEntryForm.css";

interface Props {
  showNutritionFields?: boolean;
  showSpendingFields?: boolean;
  showSupplyFields?: boolean;

  submitForm: Function;
  onBack: Function;
  prefill?: Map<string, string | number | [] | null>;
}

//Leaving until I am sure it works okay.
let vendorPricesDefault = new Array<{ name: string; price: string }>();
vendorPricesDefault.push();

export const ItemEntryForm = ({
  showNutritionFields,
  showSpendingFields,
  showSupplyFields,
  submitForm,
  onBack,
  prefill,
}: Props) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [calories, setCalories] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("g");
  const [serving, setServing] = useState("");
  const [servingUnit, setServingUnit] = useState("g");
  const [vendorPrices, setVendorPrices] = useState(
    new Array<{ name: string; price: string }>()
  );

  useEffect(() => {
    if (prefill !== undefined) {
      let prefillName = prefill.get("name");
      if (typeof prefillName === "string") {
        setName(prefillName);
      }

      let prefillBrand = prefill.get("brand");
      if (typeof prefillBrand === "string") {
        setBrand(prefillBrand);
      }

      let prefillCalories = prefill.get("calories");
      if (typeof prefillCalories === "number") {
        let prefillCaloriesString = prefillCalories.toString();
        setCalories(prefillCaloriesString);
      }

      let prefillTotalQuantityAmount = prefill.get("totalQuantityAmount");
      if (typeof prefillTotalQuantityAmount === "number") {
        let prefillTotalQuantityAmountString =
          prefillTotalQuantityAmount.toString();
        setQuantity(prefillTotalQuantityAmountString);
      }

      let prefillTotalQuantityUnit = prefill.get("totalQuantityUnit");
      if (typeof prefillTotalQuantityUnit === "string") {
        setQuantityUnit(prefillTotalQuantityUnit);
      }

      let prefillServingSizeAmount = prefill.get("servingSizeAmount");
      if (typeof prefillServingSizeAmount === "number") {
        let prefillServingSizeAmountString =
          prefillServingSizeAmount.toString();
        setServing(prefillServingSizeAmountString);
      }

      let prefillServingSizeUnit = prefill.get("servingSizeUnit");
      if (typeof prefillServingSizeUnit === "string") {
        setServingUnit(prefillServingSizeUnit);
      }

      let prefillVendorPrices = prefill.get("vendorPrices");
      if (Array.isArray(prefillVendorPrices)) {
        setVendorPrices(prefillVendorPrices);
      }
    }
  }, [prefill]);

  const availableUnits = () => {
    let units = getMeasurementUnits("all")?.flatMap((unit) => unit.label);
    if (!units) {
      return ["error"];
    }

    return units;
  };

  const showCaloriesField = () => {
    if (showNutritionFields) {
      return (
        <>
          <FormField
            orientation="horizontal"
            name="calories"
            label="Calories"
            onBlur={validateField}
            onChange={handleChange}
            value={calories}
          ></FormField>
        </>
      );
    }
  };

  const showTotalQuantityField = () => {
    if (showSupplyFields || showSpendingFields) {
      return (
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
            options={availableUnits()}
            onChange={handleChange}
            value={quantityUnit}
          />
        </div>
      );
    }
  };

  const showServingSizeField = () => {
    if (showNutritionFields) {
      return (
        <div id="serving-field">
          <FormField
            orientation="horizontal"
            name="serving"
            label="Serving"
            onBlur={validateField}
            onChange={handleChange}
            value={serving}
          ></FormField>
          <FormSelectField
            name="servingUnit"
            options={availableUnits()}
            onChange={handleChange}
            value={servingUnit}
          />
        </div>
      );
    }
  };

  const showVendorField = () => {
    if (showSpendingFields) {
      let vendorPriceElements = vendorPrices.map((vendorPrice, index) => {
        return (
          <div className="item-entry-form-vendor-price-element" key={index}>
            <input
              className="item-entry-form-vendor-name"
              name={`vendor${index}`}
              type="text"
              value={vendorPrice.name}
              onChange={onVendorPriceChange}
            />
            <input
              className="item-entry-form-vendor-price"
              name={`price${index}`}
              type="text"
              value={vendorPrice.price}
              onChange={onVendorPriceChange}
            />

            <Button
              className="item-entry-form-delete-vendor-button brand-button-white button-small clickable-button"
              id={`${index}`}
              click={(event) => deleteVendorPrice(event)}
              text="X"
            />
          </div>
        );
      });

      return (
        <div id="item-entry-form-vendor-heading">
          <p>Vendors</p>
          {vendorPriceElements}
          <Button
            className="brand-button-white button-small clickable-button"
            id="item-entry-form-add-vendor-button"
            click={(event) => addVendorPrice(event)}
            text="+"
          />
        </div>
      );
    }
  };

  const onVendorPriceChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const target = event.target;
    const name = target.name;

    let currentVendorPrices = vendorPrices;
    let newVendorPrices = [...currentVendorPrices];

    // All vendorPrice elements on the page are named in such a way where
    // their name attributes are vendor[index] or price[index] where
    // index identifies their position within the array. The following
    // code obtains that index by parsing the name string.
    if (name.includes("vendor")) {
      let index = Number.parseInt(name.substring(6));
      newVendorPrices[index].name = target.value;
      setVendorPrices(newVendorPrices);
    } else if (name.includes("price")) {
      let index = Number.parseInt(name.substring(5));
      newVendorPrices[index].price = target.value;
      setVendorPrices(newVendorPrices);
    }
  };

  const addVendorPrice = (event: React.MouseEvent) => {
    event.preventDefault();

    let currentVendorPrices = vendorPrices;
    let newVendorPrices = [...currentVendorPrices];
    newVendorPrices.push({ name: "", price: "" });
    setVendorPrices(newVendorPrices);
  };

  const deleteVendorPrice = (event: React.MouseEvent) => {
    event.preventDefault();
    let elementId = event.currentTarget.getAttribute("id");

    let currentVendorPrices = vendorPrices;
    let newVendorPrices = [...currentVendorPrices];

    if (elementId !== null) {
      newVendorPrices.splice(Number.parseInt(elementId), 1);
    }

    setVendorPrices(newVendorPrices);
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const target = event.target;
    const name = target.name;

    switch (name) {
      case "name":
        setName(target.value);
        break;

      case "brand":
        setBrand(target.value);
        break;

      case "calories":
        setCalories(target.value);
        break;

      case "quantity":
        setQuantity(target.value);
        break;

      case "quantityUnit":
        setQuantityUnit(target.value);
        break;

      case "serving":
        setServing(target.value);
        break;

      case "servingUnit":
        setServingUnit(target.value);
        break;
    }
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
      case "name":
        setName(target.value);
        break;

      case "brand":
        setBrand(target.value);
        break;

      case "calories":
        let convertedCalories;
        try {
          convertedCalories = itemEntryFormValidator.validateCalories(
            target.value
          );
          document
            .querySelector(`input#form-text-calories`)
            ?.classList.remove("item-entry-form-field-error");
        } catch (error) {
          console.log(error);

          document
            .querySelector(`input#form-text-calories`)
            ?.classList.add("item-entry-form-field-error");
        }

        if (convertedCalories) {
          setCalories(convertedCalories.toString());
        }
        break;

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

      case "serving":
        let convertedServing;
        try {
          convertedServing = itemEntryFormValidator.validateQuantity(
            target.value
          );
          document
            .querySelector(`input#form-text-serving`)
            ?.classList.remove("field-error");
        } catch (error) {
          console.log(error);

          document
            .querySelector(`input#form-text-serving`)
            ?.classList.add("field-error");
        }

        if (convertedServing) {
          setServing(convertedServing.toString());
        }
        break;

      case "servingUnit":
        setServingUnit(target.value);
        break;
    }
  };

  // TODO: Consider building this Item through the ItemBuilder available
  // through pantry-shared module.
  const buildItemObject = () => {
    let item = new ItemObject();
    item.setId("");
    item.setName(name);
    item.setBrand(brand);
    item.setCalories(Number.parseInt(calories));
    vendorPrices.forEach((vendorPrice) => {
      let float = Number.parseFloat(vendorPrice.price);
      let financial = Number.parseFloat(float.toFixed(2));

      item.addVendorPrice(vendorPrice.name, financial);
    });

    if (quantity !== "") {
      item.setTotalQuantity(Number.parseInt(quantity), quantityUnit);
    }

    if (serving !== "") {
      item.setServingSize(Number.parseInt(serving), servingUnit);
    }

    return item;
  };

  const onSubmit = () => {
    if (name === "") {
      alert("Item name is required.");
      return;
    }

    let vendorError = false;
    vendorPrices.forEach((vendorPrice) => {
      if (vendorPrice.name === "") {
        alert("Please make sure all vendors have names!");
        vendorError = true;
        return;
      } else if (
        vendorPrice.price === "" ||
        isNaN(Number.parseFloat(vendorPrice.price))
      ) {
        alert("Please make sure all vendors have valid prices!");
        vendorError = true;
        return;
      }
    });

    if (vendorError) {
      return;
    }

    submitForm(buildItemObject());
  };

  return (
    <div id="item-entry-form-container">
      <div id="item-entry-form-parent">
        <form>
          <FormField
            orientation="horizontal"
            name="name"
            label="Name"
            onChange={handleChange}
            value={name}
          ></FormField>

          <FormField
            orientation="horizontal"
            name="brand"
            label="Brand"
            onChange={handleChange}
            value={brand}
          ></FormField>

          {showCaloriesField()}
          {showTotalQuantityField()}
          {showServingSizeField()}
          {showVendorField()}
        </form>
      </div>

      <div id="item-entry-form-buttons">
        <Button
          id="item-entry-form-back-button"
          className="brand-button-red button-medium clickable-button"
          text="Back"
          click={() => {
            onBack();
          }}
        />

        <Button
          id="item-entry-form-submit-button"
          className="brand-button-green button-medium clickable-button"
          text="Submit"
          click={() => {
            onSubmit();
          }}
        ></Button>
      </div>
    </div>
  );
};
