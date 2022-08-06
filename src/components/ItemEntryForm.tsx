import "../styles/sass/ItemEntryForm.css";
import { ItemEntryFormValidator } from "../api/ItemEntryFormValidator";
import { FormField } from "./FormField";
import { FormSelectField } from "./FormSelectField";
import { Button } from "./Button";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Item } from "../pantry-shared/src/item";

interface Props {
  selectedItemDetails: Map<string, boolean>;
  submitForm: any;
  onBack?: any;
  prefill?: Map<string, string | number | []>;
}

let vendorPricesDefault = new Array<{ name: string; price: string }>();
vendorPricesDefault.push();

export default function ItemEntryForm(props: Props) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [calories, setCalories] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("g");
  const [serving, setServing] = useState("");
  const [servingUnit, setServingUnit] = useState("g");
  const [vendorPrices, setVendorPrices] = useState(vendorPricesDefault);
  const [prefill, setPrefill] = useState(new Map<string, string | []>());

  useEffect(() => {
    /*
    if (props.prefill !== undefined) {
      let prefillName = props.prefill.get("name");
      if (typeof prefillName === "string") {
        setPrefill(props.prefill);
        console.log(prefillName);
        setName(prefillName);
      }
    }
    */
  }, []);

  useEffect(() => {
    console.log("set name to ", name);
  }, [name]);

  useEffect(() => {
    console.log("updating prefill");
    if (props.prefill !== undefined) {
      let prefillName = props.prefill.get("name");
      if (typeof prefillName === "string") {
        setName(prefillName);
      }

      let prefillBrand = props.prefill.get("brand");
      if (typeof prefillBrand === "string") {
        setBrand(prefillBrand);
      }

      let prefillCalories = props.prefill.get("calories");
      if (typeof prefillCalories === "number") {
        let prefillCaloriesString = prefillCalories.toString();
        setCalories(prefillCaloriesString);
      }

      let prefillTotalQuantityAmount = props.prefill.get("totalQuantityAmount");
      if (typeof prefillTotalQuantityAmount === "number") {
        let prefillTotalQuantityAmountString =
          prefillTotalQuantityAmount.toString();
        setQuantity(prefillTotalQuantityAmountString);
      }

      let prefillTotalQuantityUnit = props.prefill.get("totalQuantityUnit");
      if (typeof prefillTotalQuantityUnit === "string") {
        setQuantityUnit(prefillTotalQuantityUnit);
        console.log("Quantity unit set to ", prefillTotalQuantityUnit);
      }

      let prefillServingSizeAmount = props.prefill.get("servingSizeAmount");
      if (typeof prefillServingSizeAmount === "number") {
        let prefillServingSizeAmountString =
          prefillServingSizeAmount.toString();
        setServing(prefillServingSizeAmountString);
      }

      let prefillServingSizeUnit = props.prefill.get("servingSizeUnit");
      if (typeof prefillServingSizeUnit === "string") {
        setServingUnit(prefillServingSizeUnit);
      }

      let prefillVendorPrices = props.prefill.get("vendorPrices");
      if (Array.isArray(prefillVendorPrices)) {
        console.log("yesss");
        setVendorPrices(prefillVendorPrices);
        prefillVendorPrices?.forEach((vp) => {});
      }
    }
  }, [props.prefill]);

  let navigate = useNavigate();

  function goBack() {
    if (props.onBack) {
      navigate(props.onBack);
    } else {
      navigate(0);
    }
  }

  function showCaloriesField() {
    if (props.selectedItemDetails.get("nutrition-button")) {
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
            onChange={handleChange}
            value={quantity}
          ></FormField>
          <FormSelectField
            name="quantityUnit"
            label="quantityUnit"
            options={["g", "oz", "lb"]}
            onChange={handleChange}
            value={quantityUnit}
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
            onChange={handleChange}
            value={serving}
          ></FormField>
          <FormSelectField
            name="servingUnit"
            label="servingUnit"
            options={["g", "oz", "lb"]}
            onChange={handleChange}
            value={servingUnit}
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
    let item = new Item();
    item.setId("");
    item.setName(name);
    item.setBrand(brand);
    item.setCalories(Number.parseInt(calories));
    vendorPrices.forEach((vendorPrice) => {
      item.addVendorPrice(vendorPrice.name, Number.parseInt(vendorPrice.price));
    });
    item.setTotalQuantity(Number.parseInt(quantity), quantityUnit);
    item.setServingSize(Number.parseInt(serving), servingUnit);

    return item;
  }

  useEffect(() => {}, []);

  function onSubmit() {
    if (name === "") {
      alert("Item name is required.");
      return;
    }

    let vendorError = false;
    vendorPrices.forEach((vp) => {
      if (vendorError === true) {
        return;
      }

      if (vp.name === "") {
        alert("Please make sure all vendors have names!");
        vendorError = true;
        return;
      } else if (vp.price === "" || isNaN(Number.parseFloat(vp.price))) {
        alert("Please make sure all vendors have valid prices!");
        vendorError = true;
        return;
      }
    });

    if (vendorError) {
      return;
    }

    props.submitForm(buildItemObject());
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

      <div id="form-buttons">
        <button
          id="back"
          onClick={() => {
            goBack();
          }}
        >
          Back
        </button>

        <Button
          id="submit"
          text="Submit"
          click={() => {
            onSubmit();
          }}
        ></Button>
      </div>
    </div>
  );
}
