import { useEffect, useState } from "react";

import { PantryItem } from "../components/items/PantryItem";
import { PantryItem as PantryItemObject } from "../pantry-shared/src/pantryItem";
import { PantryItemBuilder } from "../pantry-shared/src/pantryItemBuilder";
import { Item as ItemObject } from "../pantry-shared/src/item";
import { UsePantryItemModal } from "../components/UsePantryItemModal";
import { AddPantryItemModal } from "../components/AddPantryItemModal";
import { serverSingleton } from "../api/ServerAPI";

interface Props {
  accountEmail: string | null;
}

export const Pantry = ({ accountEmail }: Props) => {
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [listItems, setListItems] = useState(Array<JSX.Element>());

  const [modalTarget, setModalTarget] = useState(
    new PantryItemObject(new ItemObject())
  );
  const [showUsePantryItemModal, setShowUsePantryItemModal] = useState(false);
  const [showEditPantryItemModal, setShowEditPantryItemModal] = useState(false);
  const [usePantryItemModalUnits, setUsePantryItemModalUnits] = useState([""]);

  const loadItems = async (emailAddress: string | null) => {
    let response;
    if (typeof emailAddress === "string") {
      response = await serverSingleton.loadPantryItems(emailAddress);
    }

    if (response) {
      let pantryItemBuilder = new PantryItemBuilder();

      // Sort the items by alphabetical order
      response.sort((obj1: PantryItemObject, obj2: PantryItemObject) => {
        // Objects still have to be built before properties on them
        // can be accessed using the class methods
        let pantryItem1 = pantryItemBuilder.buildItem(obj1);
        let pantryItem2 = pantryItemBuilder.buildItem(obj2);

        let pantryItemName1 = pantryItem1.getBaseItem().getName();
        let pantryItemName2 = pantryItem2.getBaseItem().getName();

        if (pantryItemName1 < pantryItemName2) {
          return -1;
        }

        if (pantryItemName1 > pantryItemName2) {
          return 1;
        }

        if (pantryItemName1 === pantryItemName2) {
        }
      });

      const elements = response.map((element: PantryItemObject) => (
        <PantryItem
          key={pantryItemBuilder.buildItem(element).getId()}
          item={pantryItemBuilder.buildItem(element)}
          deleteItem={deleteItem}
          addItem={() => {}}
          utilizeItem={utilizeItem}
          editItem={editItem}
        />
      ));
      setListItems(elements);
      setFinishedLoading(true);
    }
  };

  const editItem = (pantryItem: PantryItemObject) => {
    setShowEditPantryItemModal(true);
    setModalTarget(pantryItem);
  };

  const deleteItem = async (pantryItem: PantryItemObject) => {
    alert(`Deleted item`);

    if (typeof accountEmail === "string") {
      await serverSingleton.deletePantryItem(accountEmail, pantryItem);
    }

    await loadItems(accountEmail);
  };

  // Function name here is a bit awkward due to React's useX naming conventing
  // for hooks. I was unable to name this function useItem() for such reasons.
  const utilizeItem = async (pantryItem: PantryItemObject) => {
    if (pantryItem.getAvailableQuantity().amount <= 0) {
      if (accountEmail) {
        await serverSingleton.deletePantryItem(accountEmail, pantryItem);
        await loadItems(accountEmail);
        alert("Item depleted.");
      }

      return;
    }

    setShowUsePantryItemModal(true);
    setUsePantryItemModalUnits([pantryItem.getAvailableQuantity().unit]);
    setModalTarget(pantryItem);
  };

  const closeUseModal = () => {
    setShowUsePantryItemModal(false);
  };

  const closeEditModal = () => {
    setShowEditPantryItemModal(false);
  };

  const submitUseModal = async (quantity: string, quantityUnit: string) => {
    let previousAmount = modalTarget.getAvailableQuantity().amount;
    let newAmount = previousAmount - Number.parseFloat(quantity);

    if (isNaN(newAmount)) {
      alert("Please try again!");
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
  };

  const submitEditModal = async (
    quantity: string,
    quantityUnit: string,
    expirationDate: Date
  ) => {
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
  };

  useEffect(() => {
    loadItems(accountEmail);
  }, [accountEmail]);

  return (
    <div id="view-items-container">
      <h1 id="items-heading">Pantry Items</h1>
      {!finishedLoading && (
        <div id="view-items-loading-text">Loading your items...</div>
      )}
      {finishedLoading && listItems.length === 0 && (
        <div id="view-items-no-items-text">
          You haven't added any items yet!
        </div>
      )}
      <div id="items"> {listItems} </div>
      <UsePantryItemModal
        isOpen={showUsePantryItemModal}
        closeModal={closeUseModal}
        submitModal={submitUseModal}
        availableUnits={usePantryItemModalUnits}
      />
      <AddPantryItemModal
        isOpen={showEditPantryItemModal}
        closeModal={closeEditModal}
        submitModal={submitEditModal}
      />
    </div>
  );
};
