import { useEffect, useState } from "react";
import Item from "../components/items/Item";

import { ServerAPI, serverSingleton } from "../api/ServerAPI";
import { ItemBuilder } from "../pantry-shared/src/itemBuilder";
import { Item as ItemObject } from "../pantry-shared/src/item";
import "../styles/ViewItems.css";
import { PantryItem } from "../pantry-shared/src/pantryItem";
import { AddPantryItemModal } from "../components/AddPantryItemModal";

interface Props {
  accountEmail: string | null;
}

export default function ViewItems(props: Props) {
  const [accountEmail, setAccountEmail] = useState(props.accountEmail);
  const [listItems, setListItems] = useState("");
  const [showAddPantryItemModal, setShowAddPantryItemModal] = useState(false);
  const [itemBeingAddedToPantry, setItemBeingAddedToPantry] = useState({});

  console.log(props.accountEmail);

  async function loadItems(emailAddress: string | null) {
    console.log(`Loading items from ${emailAddress}`);

    let response;
    if (typeof emailAddress === "string") {
      response = await serverSingleton.loadItems(emailAddress);
    }

    console.log("response = ", response);
    if (response) {
      console.log(response);

      let itemBuilder = new ItemBuilder();
      const elements = response.map((element: any) => (
        <Item
          key={itemBuilder.buildItem(element).getId()}
          item={itemBuilder.buildItem(element)}
          deleteItem={deleteItem}
          addItem={addItem}
        />
      ));

      console.log(elements);
      setListItems(elements);
    }
  }

  async function addItem(item: ItemObject) {
    setItemBeingAddedToPantry(item);
    setShowAddPantryItemModal(true);
  }

  async function deleteItem(item: {}) {
    alert(`Deleted item`);
    console.log(item);

    if (typeof accountEmail === "string") {
      await serverSingleton.deleteItem(accountEmail, item);
    } else {
      console.log("accountEmail is not a string!");
    }

    await loadItems(accountEmail);

    // Eventually, add support for removing that particular
    // item from the array here
  }

  function closeModal() {
    setShowAddPantryItemModal(false);
    setItemBeingAddedToPantry({});
  }

  async function submitModal(
    quantity: string,
    quantityUnit: string,
    expirationDate: any
  ) {
    console.log(itemBeingAddedToPantry);
    console.log(quantity);
    console.log(quantityUnit);
    console.log(expirationDate);

    if (itemBeingAddedToPantry instanceof ItemObject) {
      let pantryItem = new PantryItem(itemBeingAddedToPantry);

      /*
      if (quantity !== "") {
        pantryItem.setAvailableQuantity(
          Number.parseInt(quantity),
          quantityUnit
        );

        console.log("parsed = ", Number.parseInt(quantity));
      }
      */

      let itemQuantity = itemBeingAddedToPantry.getTotalQuantity();
      if (itemQuantity.amount > 0) {
        pantryItem.setAvailableQuantity(itemQuantity.amount, itemQuantity.unit);
      }

      console.log("preExpiration = ", expirationDate);
      if (expirationDate !== 0) {
        console.log("expiration date is ", expirationDate);

        let dateString = new Date(expirationDate);
        let monthIndex = dateString.getMonth();
        let day = dateString.getUTCDate(); // Must be to avoid time-zone day errors
        let year = dateString.getFullYear();

        pantryItem.setExpirationDate(year, monthIndex, day);
        console.log(
          "pantryItem.getExpirationDate() = ",
          pantryItem.getExpirationDate()
        );
      }

      if (accountEmail !== null) {
        await serverSingleton.createPantryItem(pantryItem, accountEmail);
      }
    }

    alert("Added item to pantry!");
  }

  useEffect(() => {
    loadItems(accountEmail);
  }, [accountEmail]);

  function renderNoItems() {
    if (listItems.length === 0) {
      return <div id="no-item-message">You haven't added any items yet!</div>;
    }
  }

  return (
    <div id="view-items-container">
      <h1 id="items-heading">Items</h1>
      {renderNoItems()}
      <div id="items"> {listItems} </div>
      <AddPantryItemModal
        isOpen={showAddPantryItemModal}
        closeModal={closeModal}
        submitModal={submitModal}
      />
    </div>
  );
}
