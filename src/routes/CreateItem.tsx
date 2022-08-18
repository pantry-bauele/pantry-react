import { useState } from "react";
import { Item as ItemObject } from "../pantry-shared/src/item";
import { ItemEntryForm } from "../components/ItemEntryForm";
import { serverSingleton } from "../api/ServerAPI";

import "../styles/sass/CreateItem.css";

let itemDetailsDefault = new Map<string, boolean>();
itemDetailsDefault.set("nutrition-button", false);
itemDetailsDefault.set("spending-button", false);
itemDetailsDefault.set("supply-button", false);

type Props = {
  accountEmail: string | null;
};

export const CreateItem = ({ accountEmail }: Props) => {
  const [selectedItemDetails, setSelectedItemDetails] = useState(
    new Map<string, boolean>(itemDetailsDefault)
  );
  const [showItemDetailsButtons, setShowItemDetailsButtons] = useState(true);
  const [showItemForm, setShowItemForm] = useState(false);

  const toggleItemDetail = (event: React.MouseEvent<HTMLElement>) => {
    const buttonId = event.currentTarget.id;

    let newItemDetails = selectedItemDetails;
    newItemDetails.set(buttonId, !newItemDetails.get(buttonId));

    // Toggles the border around the button to show whether or not
    // the selected item detail has been enabled
    let buttonEnabled = newItemDetails.get(buttonId);
    if (buttonEnabled) {
      document
        .querySelector(`#${buttonId}`)
        ?.classList.remove("item-details-button-unselected");

      document
        .querySelector(`#${buttonId}`)
        ?.classList.add("item-details-button-selected");
    } else {
      document
        .querySelector(`#${buttonId}`)
        ?.classList.remove("item-details-button-selected");

      document
        .querySelector(`#${buttonId}`)
        ?.classList.add("item-details-button-unselected");
    }

    setSelectedItemDetails(newItemDetails);
  };

  const toggleFormPage = () => {
    // If item details buttons are not currently visible, they are
    // about to be after the toggle completes, so they should all be
    // reset to being unselected.
    if (!showItemDetailsButtons) {
      itemDetailsDefault.set("nutrition-button", false);
      itemDetailsDefault.set("spending-button", false);
      itemDetailsDefault.set("supply-button", false);
      setSelectedItemDetails(itemDetailsDefault);
    }

    setShowItemDetailsButtons(!showItemDetailsButtons);
    setShowItemForm(!showItemForm);
  };

  const submitForm = async (item: ItemObject) => {
    alert("Submitted your item!");
    console.log("Item = ", item.getName());

    if (typeof accountEmail === "string") {
      await serverSingleton.createItem(accountEmail, item);
    }
  };

  const resetPage = () => {
    setShowItemForm(false);
    itemDetailsDefault.set("nutrition-button", false);
    itemDetailsDefault.set("spending-button", false);
    itemDetailsDefault.set("supply-button", false);
    setSelectedItemDetails(itemDetailsDefault);
    setShowItemDetailsButtons(true);
  };

  const renderItemDetailsButtons = () => {
    if (showItemDetailsButtons) {
      return (
        <div id="item-details-form-container">
          <h2 id="item-details-prompt">
            What details do you want to track about this item?
          </h2>
          <button
            id="nutrition-button"
            className="item-details-button button-large brand-button-red item-details-button-unselected clickable-button"
            onClick={toggleItemDetail}
          >
            Nutrition
          </button>
          <button
            id="spending-button"
            className="item-details-button button-large brand-button-red item-details-button-unselected clickable-button"
            onClick={toggleItemDetail}
          >
            Spending
          </button>
          <button
            id="supply-button"
            className="item-details-button button-large brand-button-red item-details-button-unselected clickable-button"
            onClick={toggleItemDetail}
          >
            At-Home Supply
          </button>
          <button
            id="create-item-continue-button"
            className="item-details-button button-large brand-button-green clickable-button"
            onClick={toggleFormPage}
          >
            Continue
          </button>
        </div>
      );
    }
  };

  const renderItemForm = () => {
    if (showItemForm) {
      return (
        <>
          <ItemEntryForm
            showNutritionFields={selectedItemDetails.get("nutrition-button")}
            showSpendingFields={selectedItemDetails.get("spending-button")}
            showSupplyFields={selectedItemDetails.get("supply-button")}
            submitForm={submitForm}
            onBack={resetPage}
          />
        </>
      );
    }
  };
  return (
    <div id="create-item-container">
      <div id="create-item-form-container">
        <h1>Create Item</h1>

        {renderItemDetailsButtons()}
        {renderItemForm()}
      </div>
    </div>
  );
};
