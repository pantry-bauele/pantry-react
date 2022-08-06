import { ItemDisplay } from "../components/ItemDisplay";
import Item from "../components/items/Item";
import { UsePantryItemModal } from "../components/UsePantryItemModal";
import { AddPantryItemModal } from "../components/AddPantryItemModal";
import { serverSingleton } from "../api/ServerAPI";
import { useEffect, useState } from "react";
import { PantryItem as PantryItemObject } from "../pantry-shared/src/pantryItem";
import { Item as ItemObject } from "../pantry-shared/src/item";
import { PantryItemBuilder } from "../pantry-shared/src/pantryItemBuilder";
import PantryItem from "../components/items/PantryItem";

interface Props {
  accountEmail: string | null;
}

export default function Pantry({ accountEmail }: Props) {
  let defaultItem = new ItemObject();
  let defaultPantryItem = new PantryItemObject(defaultItem);

  const [listItems, setListItems] = useState("");
  const [showUsePantryItemModal, setShowUsePantryItemModal] = useState(false);
  const [showEditPantryItemModal, setShowEditPantryItemModal] = useState(false);
  const [usePantryItemModalUnits, setUsePantryItemModalUnits] = useState([""]);
  const [modalTarget, setModalTarget] = useState(defaultPantryItem);

  async function loadItems(emailAddress: string | null) {
    console.log(`Loading items from ${emailAddress}`);

    let response;
    if (typeof emailAddress === "string") {
      response = await serverSingleton.loadPantryItems(emailAddress);
    }

    console.log("pantry response = ", response);
    if (response) {
      console.log(response);
      let pantryItemBuilder = new PantryItemBuilder();

      response.sort((x: PantryItemObject, y: PantryItemObject) => {
        let xPantryItem = pantryItemBuilder.buildItem(x);
        let yPantryItem = pantryItemBuilder.buildItem(y);

        let xName = xPantryItem.getBaseItem().getName();
        let yName = yPantryItem.getBaseItem().getName();

        if (xName < yName) {
          return -1;
        }

        if (xName > yName) {
          return 1;
        }

        if (xName === yName) {
        }
      });

      const elements = response.map((element: any) => (
        <PantryItem
          key={pantryItemBuilder.buildItem(element).getId()}
          item={pantryItemBuilder.buildItem(element)}
          deleteItem={deleteItem}
          addItem={null}
          itemUse={itemUse}
          editItem={editItem}
        />
      ));
      console.log(elements);
      setListItems(elements);
    }
  }

  async function itemUse(pantryItem: PantryItemObject) {
    if (pantryItem.getAvailableQuantity().amount <= 0) {
      if (accountEmail) {
        await serverSingleton.deletePantryItem(accountEmail, modalTarget);
        await loadItems(accountEmail);
        alert("Item depleted.");
      }

      return;
    }

    console.log(pantryItem);
    setShowUsePantryItemModal(true);
    setUsePantryItemModalUnits([pantryItem.getAvailableQuantity().unit]);
    setModalTarget(pantryItem);
  }

  function closeModal() {
    setShowUsePantryItemModal(false);
  }

  async function deleteItem(item: {}) {
    alert(`Deleted item`);
    console.log(item);

    if (typeof accountEmail === "string") {
      await serverSingleton.deletePantryItem(accountEmail, item);
    } else {
      console.log("accountEmail is not a string!");
    }

    await loadItems(accountEmail);

    // Eventually, add support for removing that particular
    // item from the array here
  }

  async function submitModal(quantity: string, quantityUnit: string) {
    console.log("modal quantity = ", quantity);
    console.log("modal unit = ", quantityUnit);
    console.log("target = ", modalTarget);

    let previousAmount = modalTarget.getAvailableQuantity().amount;
    let newAmount = previousAmount - Number.parseFloat(quantity);

    if (isNaN(newAmount)) {
      alert("Please try again");
      return;
    }

    if (accountEmail) {
      if (newAmount <= 0) {
        await serverSingleton.deletePantryItem(accountEmail, modalTarget);
        await loadItems(accountEmail);
        alert("Item depleted.");
      } else {
        modalTarget.setAvailableQuantity(
          newAmount,
          modalTarget.availableQuantity.unit
        );

        await serverSingleton.editPantryItem(accountEmail, modalTarget);
        await loadItems(accountEmail);
        alert("Quantity has been adjusted.");
      }
    }
  }

  function editItem(item: PantryItemObject) {
    setShowEditPantryItemModal(true);
    setModalTarget(item);
  }

  function closeEditModal() {
    setShowEditPantryItemModal(false);
  }

  async function submitEditModal(
    quantity: string,
    quantityUnit: string,
    expirationDate: Date
  ) {
    expirationDate = new Date(expirationDate);

    modalTarget.setExpirationDate(
      expirationDate.getFullYear(),
      expirationDate.getMonth(),
      expirationDate.getUTCDate()
    );

    if (accountEmail) {
      await serverSingleton.editPantryItem(accountEmail, modalTarget);
      await loadItems(accountEmail);
      alert("Expiration date updated!");
    }
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
      <h1 id="items-heading">Pantry Items</h1>
      {renderNoItems()}
      <div id="items"> {listItems} </div>
      <UsePantryItemModal
        isOpen={showUsePantryItemModal}
        closeModal={closeModal}
        submitModal={submitModal}
        availableUnits={usePantryItemModalUnits}
      />
      <AddPantryItemModal
        isOpen={showEditPantryItemModal}
        closeModal={closeEditModal}
        submitModal={submitEditModal}
      />
    </div>
  );
}
