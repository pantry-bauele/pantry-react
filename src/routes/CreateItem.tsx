import "../styles/sass/CreateItem.css";
import ItemEntryForm from "../components/ItemEntryForm";
import { useState } from "react";
import { serverSingleton } from "../api/ServerAPI";

let itemDetailsDefault = new Map<string, boolean>();
itemDetailsDefault.set("nutrition-button", false);
itemDetailsDefault.set("spending-button", false);
itemDetailsDefault.set("supply-button", false);

type Props = {
  accountEmail: string | null;
};

export default function CreateItem({ accountEmail }: Props) {
  const [selectedItemDetails, setSelectedItemDetails] = useState(
    new Map<string, boolean>(itemDetailsDefault)
  );
  const [showItemDetailsButtons, setShowItemDetailsButtons] = useState(true);
  const [showItemForm, setShowItemForm] = useState(false);

  function toggleItemDetail(event: React.MouseEvent<HTMLElement>) {
    const buttonId = event.currentTarget.id;

    let newItemDetails = selectedItemDetails;
    newItemDetails.set(buttonId, !newItemDetails.get(buttonId));

    // Toggles the border around the button to show whether or not
    // the selected item detail has been enabled
    newItemDetails.get(buttonId)
      ? document
          .querySelector(`#${buttonId}`)
          ?.classList.add("item-details-button-selected")
      : document
          .querySelector(`#${buttonId}`)
          ?.classList.remove("item-details-button-selected");

    setSelectedItemDetails(newItemDetails);
  }

  function toggleFormPage() {
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
  }

  function submitForm(item: {}) {
    alert("Submitted your item!");
    console.log("Item = ", item);

    if (typeof accountEmail === "string") {
      serverSingleton.createItem(accountEmail, item);
    }
  }

  function renderItemDetailsButtons() {
    if (showItemDetailsButtons) {
      return (
        <div id="item-details-form-container">
          <h2 id="item-details-prompt">
            What details do you want to track about this item?
          </h2>
          <button
            id="nutrition-button"
            className="item-details-button"
            onClick={toggleItemDetail}
          >
            Nutrition
          </button>
          <button
            id="spending-button"
            className="item-details-button"
            onClick={toggleItemDetail}
          >
            Spending
          </button>
          <button
            id="supply-button"
            className="item-details-button"
            onClick={toggleItemDetail}
          >
            At-Home Supply
          </button>
          <button
            id="continue-button"
            className="item-details-button"
            onClick={toggleFormPage}
          >
            Continue
          </button>
        </div>
      );
    }
  }

  function renderItemForm() {
    if (showItemForm) {
      return (
        <>
          <ItemEntryForm
            selectedItemDetails={selectedItemDetails}
            submitForm={submitForm}
          />
          <button id="back-button" onClick={toggleFormPage}>
            Go Back
          </button>
        </>
      );
    }
  }
  return (
    <div id="create-item-container">
      <div id="create-item-form-container">
        <h1>Create Item</h1>

        {renderItemDetailsButtons()}
        {renderItemForm()}
      </div>
    </div>
  );
}
