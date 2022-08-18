import { useEffect, useState } from "react";

import { Item } from "../components/items/Item";
import { Item as ItemObject } from "../pantry-shared/src/item";
import { ItemBuilder } from "../pantry-shared/src/itemBuilder";
import { PantryItem } from "../pantry-shared/src/pantryItem";
import { AddPantryItemModal } from "../components/modals/AddPantryItemModal";
import { serverSingleton } from "../api/ServerAPI";

import "../styles/sass/ViewItems.css";

interface Props {
  accountEmail: string | null;
}

export const ViewItems = ({ accountEmail }: Props) => {
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [listItems, setListItems] = useState(new Array<JSX.Element>());
  const [showAddPantryItemModal, setShowAddPantryItemModal] = useState(false);
  const [itemBeingAddedToPantry, setItemBeingAddedToPantry] = useState(
    new ItemObject()
  );

  const loadItems = async (accountEmail: string | null) => {
    console.log(`Loading items from ${accountEmail}`);

    let response;
    if (typeof accountEmail === "string") {
      response = await serverSingleton.loadItems(accountEmail);
    }

    console.log("response = ", response);
    if (response) {
      console.log(response);

      let itemBuilder = new ItemBuilder();
      const elements: Array<JSX.Element> = response.map(
        (element: ItemObject) => (
          <Item
            key={itemBuilder.buildItem(element).getId()}
            item={itemBuilder.buildItem(element)}
            deleteItem={deleteItem}
            addItem={addItem}
          />
        )
      );

      console.log(elements);
      setListItems(elements);
      setFinishedLoading(true);
    }
  };

  const addItem = async (item: ItemObject) => {
    setItemBeingAddedToPantry(item);
    setShowAddPantryItemModal(true);
  };

  const deleteItem = async (item: ItemObject) => {
    alert(`Deleted item`);

    if (typeof accountEmail === "string") {
      await serverSingleton.deleteItem(accountEmail, item);
      await loadItems(accountEmail);
    }
  };

  const closeModal = () => {
    setShowAddPantryItemModal(false);
    setItemBeingAddedToPantry(new ItemObject());
  };

  const submitModal = async (
    quantity: string,
    quantityUnit: string,
    expirationDate: number
  ) => {
    if (itemBeingAddedToPantry instanceof ItemObject) {
      let pantryItem = new PantryItem(itemBeingAddedToPantry);

      let itemQuantity = itemBeingAddedToPantry.getTotalQuantity();
      if (itemQuantity.amount > 0) {
        pantryItem.setAvailableQuantity(itemQuantity.amount, itemQuantity.unit);
      }

      if (expirationDate !== 0) {
        let dateString = new Date(expirationDate);
        let monthIndex = dateString.getMonth();
        let day = dateString.getUTCDate(); // Must be UTCDate to avoid time-zone day errors
        let year = dateString.getFullYear();

        pantryItem.setExpirationDate(year, monthIndex, day);
      }

      if (accountEmail !== null) {
        await serverSingleton.createPantryItem(pantryItem, accountEmail);
      }
    }

    alert("Added item to pantry!");
  };

  useEffect(() => {
    loadItems(accountEmail);
  }, [accountEmail]);

  return (
    <div id="view-items-container">
      <h1 id="view-items-heading">Items</h1>
      {!finishedLoading && (
        <div id="view-items-loading-text">Loading your items...</div>
      )}
      {finishedLoading && listItems.length === 0 && (
        <div id="view-items-no-items-text">
          You haven't added any items yet!
        </div>
      )}
      <div id="view-items-elements"> {listItems} </div>
      <AddPantryItemModal
        isOpen={showAddPantryItemModal}
        closeModal={closeModal}
        submitModal={submitModal}
      />
    </div>
  );
};
