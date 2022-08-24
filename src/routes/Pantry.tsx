import { useEffect, useState } from "react";

import { PantryItem } from "../components/items/PantryItem";
import { PantryItem as PantryItemObject } from "../pantry-shared/src/pantryItem";
import { PantryItemBuilder } from "../pantry-shared/src/pantryItemBuilder";
import { Item as ItemObject } from "../pantry-shared/src/item";
import { UsePantryItemModal } from "../components/modals/UsePantryItemModal";
import { AddPantryItemModal } from "../components/modals/AddPantryItemModal";
import { server } from "../api/ServerAPI";
import {
  getMeasurementType,
  getMeasurementUnits,
} from "../pantry-shared/src/measurementUnits";

interface Props {
  accountEmail: string | null;
}

export const Pantry = ({ accountEmail }: Props) => {
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
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
      response = await server.loadPantryItems(emailAddress);
    }

    if (Array.isArray(response)) {
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

        return 0;
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
    } else {
      setLoadingError(true);
    }
  };

  const editItem = (pantryItem: PantryItemObject) => {
    setShowEditPantryItemModal(true);
    setModalTarget(pantryItem);
  };

  const deleteItem = async (pantryItem: PantryItemObject) => {
    if (typeof accountEmail === "string") {
      let result = await server.deletePantryItem(accountEmail, pantryItem);
      if (result) {
        alert("Pantry item deleted!");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }

    await loadItems(accountEmail);
  };

  // Function name here is a bit awkward due to React's useX naming conventing
  // for hooks. I was unable to name this function useItem() for such reasons.
  const utilizeItem = async (pantryItem: PantryItemObject) => {
    if (pantryItem.getAvailableQuantity().amount <= 0) {
      if (accountEmail) {
        await server.deletePantryItem(accountEmail, pantryItem);
        await loadItems(accountEmail);
        alert("Item depleted.");
      }

      return;
    }

    setShowUsePantryItemModal(true);
    setUsePantryItemModalUnits([pantryItem.getAvailableQuantity().unit]);

    let pantryItemDefaultUnit = pantryItem.getAvailableQuantity().unit;
    let defaultUnitType = getMeasurementType(pantryItemDefaultUnit);

    if (defaultUnitType) {
      let availableMeasurementUnits = getMeasurementUnits(defaultUnitType);
      let availableMeasurementUnitLabels = availableMeasurementUnits?.flatMap(
        (unit) => unit.label
      );

      if (availableMeasurementUnitLabels) {
        setUsePantryItemModalUnits(availableMeasurementUnitLabels);
      }
    }
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
        let result = await server.deletePantryItem(accountEmail, modalTarget);
        if (result) {
          alert("Item depleted!");
          await loadItems(accountEmail);
        } else {
          alert("Something went wrong. Please try again.");
        }
      } else {
        modalTarget.setAvailableQuantity(
          newAmount,
          modalTarget.availableQuantity.unit
        );

        let result = await server.editPantryItem(accountEmail, modalTarget);
        if (result) {
          alert("Quantity has been adjusted!");
          await loadItems(accountEmail);
        } else {
          alert("Something went wrong. Please try again.");
        }
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
      let result = await server.editPantryItem(accountEmail, modalTarget);
      if (result) {
        alert("Expiration date updated!");
        await loadItems(accountEmail);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  useEffect(() => {
    loadItems(accountEmail);
  }, [accountEmail]);

  return (
    <div id="view-items-container">
      <h1 id="items-heading">Pantry Items</h1>
      {!finishedLoading && !loadingError && (
        <div id="view-items-loading-text">Loading your items...</div>
      )}
      {finishedLoading && listItems.length === 0 && (
        <div id="view-items-no-items-text">
          You haven't added any items yet!
        </div>
      )}
      {loadingError && (
        <div id="view-items-loading-text">
          There was an error processing your request. Please try again.
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
