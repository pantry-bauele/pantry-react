import "../styles/ItemEntryForm.css";
import { ItemEntryFormValidator } from "../api/ItemEntryFormValidator";
import React, { useState } from "react";

interface Props {
  selectedItemDetails: Map<string, boolean>;
  submitForm: any;
}

let vendorPricesDefault = new Array<{ vendor: string; price: string }>();
vendorPricesDefault.push({ vendor: "", price: "" });

export default function ItemEntryForm(props: Props) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [calories, setCalories] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("");
  const [serving, setServing] = useState("");
  const [servingUnit, setServingUnit] = useState("");
  const [vendorPrices, setVendorPrices] = useState(vendorPricesDefault);

  function showCaloriesField() {
    if (props.selectedItemDetails.get("nutrition-button")) {
      return (
        <>
          <label className="Form-element">
            Calories
            <input
              id="calories"
              name="calories"
              type="text"
              //value={calories}
              //onChange={handleChange}
              onBlur={validateField}
            />
          </label>
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
        <>
          <label className="Form-element">
            Total Quantity
            <input
              name="quantity"
              type="text"
              value={quantity}
              onChange={handleChange}
            />
          </label>

          <label className="Form-element">
            Unit
            <select
              name="quantityUnit"
              value={quantityUnit}
              onChange={handleChange}
            >
              <option value="g">grams</option>
              <option value="oz">ounces</option>
              <option value="lb">pounds</option>
            </select>
          </label>
        </>
      );
    }
  }

  function showServingSizeField() {
    if (props.selectedItemDetails.get("nutrition-button")) {
      return (
        <>
          <label className="Form-element">
            Serving Size
            <input
              name="serving"
              type="text"
              value={serving}
              onChange={handleChange}
            />
          </label>

          <label className="Form-element">
            Unit
            <select
              name="servingUnit"
              value={servingUnit}
              onChange={handleChange}
            >
              <option value="g">grams</option>
              <option value="oz">ounces</option>
              <option value="lb">pounds</option>
            </select>
          </label>
        </>
      );
    }
  }

  function showVendorField() {
    if (props.selectedItemDetails.get("spending-button")) {
      let x = vendorPrices.map((v, index) => {
        return (
          <div key={index}>
            <input
              name={`vendor${index}`}
              type="text"
              value={vendorPrices[index].vendor}
              onChange={onVendorPriceChange}
            />
            <input
              name={`price${index}`}
              type="text"
              value={vendorPrices[index].price}
              onChange={onVendorPriceChange}
            />
            <button name={`${index}`} onClick={(e) => deleteVendorPrice(e)}>
              X
            </button>
          </div>
        );
      });

      return (
        <>
          <label className="">
            Vendors
            {x}
            <button onClick={(e) => addVendorPrice(e)}>Add Vendor Price</button>
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

      newVendorPrices[index].vendor = target.value;
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
    newVendorPrices.push({ vendor: "", price: "" });

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
    //console.log(name);
    //console.log(target.value);

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
    console.log(name);
    //console.log(target.value);
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
        let convertedValue;
        try {
          convertedValue = itemEntryFormValidator.validateCalories(
            target.value
          );
          document.querySelector(`input#${name}`)?.classList.remove("error");
        } catch (error) {
          console.log(error);
          document.querySelector(`input#${name}`)?.classList.add("error");
        }

        // Consider setting the form equal to the converted value to
        // remove any trailing characters after int conversion
        console.log("cv = ", convertedValue);
        //setCalories(target.value);
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

  function buildItemObject() {
    let item = {
      name: name,
      brand: brand,
      calories: calories,
      vendorPrice: null,
      totalQuantity: { amount: quantity, unit: quantityUnit },
      servingSize: { amount: serving, unit: servingUnit },
    };

    return item;
  }

  return (
    <>
      <div id="parent">
        <form>
          <label className="Form-element">
            <div>Item Name</div>
            <input
              name="name"
              type="text"
              value={name}
              onChange={handleChange}
            />
          </label>
          <label className="Form-element">
            Brand
            <input
              name="brand"
              type="text"
              value={brand}
              onChange={handleChange}
            />
          </label>

          {showCaloriesField()}
          {showTotalQuantityField()}
          {showServingSizeField()}
          {showVendorField()}
        </form>
      </div>

      <button
        id="submit-button"
        onClick={() => {
          props.submitForm(buildItemObject());
        }}
      >
        Add Item
      </button>
    </>
  );
}
