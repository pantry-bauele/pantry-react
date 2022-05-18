import "../styles/sass/ItemEntryForm.css";
import { ItemEntryFormValidator } from "../api/ItemEntryFormValidator";
import { FormField } from "./FormField";
import { FormSelectField } from "./FormSelectField";
import { Button } from "./Button";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

interface Props {
  selectedItemDetails: Map<string, boolean>;
  submitForm: any;
}

let vendorPricesDefault = new Array<{ name: string; price: string }>();
vendorPricesDefault.push({ name: "", price: "" });

export default function ItemEntryForm(props: Props) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [calories, setCalories] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("g");
  const [serving, setServing] = useState("");
  const [servingUnit, setServingUnit] = useState("g");
  const [vendorPrices, setVendorPrices] = useState(vendorPricesDefault);

  let navigate = useNavigate();

  function showCaloriesField() {
    if (props.selectedItemDetails.get("nutrition-button")) {
      return (
        <>
          <FormField
            orientation="horizontal"
            name="calories"
            label="Calories"
            onBlur={validateField}
          ></FormField>
        </>
      );
    }
  }

  function showTotalQuantityField() {
    if (
      props.selectedItemDetails.get("supply-button") ||
      props.selectedItemDetails.get("spending-button")
    ) {
      return (
        <div id="quantity-field">
          <FormField
            orientation="horizontal"
            name="quantity"
            label="Quantity"
            onBlur={validateField}
          ></FormField>
          <FormSelectField
            name="quantityUnit"
            label="quantityUnit"
            options={["g", "oz", "lb"]}
            onChange={handleChange}
          />
        </div>
      );
    }
  }

  function showServingSizeField() {
    if (props.selectedItemDetails.get("nutrition-button")) {
      return (
        <div id="serving-field">
          <FormField
            orientation="horizontal"
            name="serving"
            label="Serving"
            onBlur={validateField}
          ></FormField>
          <FormSelectField
            name="servingUnit"
            label="servingUnit"
            options={["g", "oz", "lb"]}
            onChange={handleChange}
          />
        </div>
      );
    }
  }

  function showVendorField() {
    if (props.selectedItemDetails.get("spending-button")) {
      let x = vendorPrices.map((v, index) => {
        return (
          <div className="vendorListing" key={index}>
            <input
              className="vendorName"
              name={`vendor${index}`}
              type="text"
              value={vendorPrices[index].name}
              onChange={onVendorPriceChange}
            />
            <input
              className="vendorPrice"
              name={`price${index}`}
              type="text"
              value={vendorPrices[index].price}
              onChange={onVendorPriceChange}
            />
            <button
              className="vendorDelete"
              name={`${index}`}
              onClick={(e) => deleteVendorPrice(e)}
            >
              X
            </button>
          </div>
        );
      });

      return (
        <>
          <label id="vendorHeading">
            <p>Vendors</p>
            {x}
            <button className="roundButton" onClick={(e) => addVendorPrice(e)}>
              {" "}
              +{" "}
            </button>
          </label>
        </>
      );
    }
  }

  function onVendorPriceChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const target = event.target;
    const name = target.name;
    console.log(name);
    console.log(target.value);

    let currentVendorPrices = vendorPrices;
    let newVendorPrices = [...currentVendorPrices];

    if (name.includes("vendor")) {
      console.log("Updating vendor...");
      let index = Number.parseInt(name.substring(6));
      console.log("index = ", index);
      console.log("newVP = ", newVendorPrices);

      newVendorPrices[index].name = target.value;
      console.log("newVP = ", newVendorPrices);

      setVendorPrices(newVendorPrices);
    } else if (name.includes("price")) {
      let index = Number.parseInt(name.substring(5));

      newVendorPrices[index].price = target.value;
      console.log("newVP = ", newVendorPrices);

      setVendorPrices(newVendorPrices);
    }
  }

  function addVendorPrice(e: React.MouseEvent) {
    e.preventDefault();

    let currentVendorPrices = vendorPrices;
    let newVendorPrices = [...currentVendorPrices];
    newVendorPrices.push({ name: "", price: "" });

    setVendorPrices(newVendorPrices);
  }

  function deleteVendorPrice(e: React.MouseEvent) {
    e.preventDefault();
    let name = e.currentTarget.getAttribute("name");
    console.log(e.currentTarget.getAttribute("name"));

    let currentVendorPrices = vendorPrices;
    let newVendorPrices = [...currentVendorPrices];

    if (name !== null) {
      newVendorPrices.splice(Number.parseInt(name), 1);
    }

    setVendorPrices(newVendorPrices);
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
  }

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
      case "name":
        setName(target.value);
        break;

      case "brand":
        setBrand(target.value);
        break;

      case "calories":
        console.log("Validating calories");
        let convertedCalories;
        try {
          convertedCalories = itemEntryFormValidator.validateCalories(
            target.value
          );
          document
            .querySelector(`input#form-text-calories`)
            ?.classList.remove("field-error");
        } catch (error) {
          console.log(error);

          document
            .querySelector(`input#form-text-calories`)
            ?.classList.add("field-error");
        }

        // Consider setting the form equal to the converted value to
        // remove any trailing characters after int conversion
        //console.log("cv = ", convertedValue);
        if (convertedCalories) {
          setCalories(convertedCalories.toString());
        }
        break;

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

      case "serving":
        console.log("Validating serving");
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

        // Consider setting the form equal to the converted value to
        // remove any trailing characters after int conversion
        console.log("convertedServing = ", convertedServing);
        if (convertedServing) {
          setServing(convertedServing.toString());
        }
        break;

      case "servingUnit":
        setServingUnit(target.value);
        break;
    }
  }

  function buildItemObject() {
    let item = {
      name: name,
      brand: brand,
      calories: calories,
      vendorPrices: vendorPrices,
      totalQuantity: { amount: quantity, unit: quantityUnit },
      servingSize: { amount: serving, unit: servingUnit },
    };

    return item;
  }

  return (
    <div id="container">
      <div id="parent">
        <form id="form">
          <FormField
            orientation="horizontal"
            name="name"
            label="Name"
            onChange={handleChange}
          ></FormField>

          <FormField
            orientation="horizontal"
            name="brand"
            label="Brand"
            onChange={handleChange}
          ></FormField>

          {showCaloriesField()}
          {showTotalQuantityField()}
          {showServingSizeField()}
          {showVendorField()}
        </form>
      </div>

      <div id="form-buttons">
        <button
          id="back"
          onClick={() => {
            navigate(0);
          }}
        >
          Back
        </button>

        <Button
          id="submit"
          text="Submit"
          click={() => {
            props.submitForm(buildItemObject());
          }}
        ></Button>
      </div>
    </div>
  );
}
