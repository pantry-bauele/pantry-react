import { ItemDisplay } from "../components/ItemDisplay";
import Item from "../components/items/Item";
import { Item as ItemObject } from "../pantry-shared/src/item";
import { serverSingleton } from "../api/ServerAPI";
import { useEffect } from "react";
import { PantryItem } from "../pantry-shared/src/pantryItem";

interface Props {
  accountEmail: string | null;
}

export default function Pantry({ accountEmail }: Props) {
  async function loadItems(emailAddress: string | null) {
    console.log(`Loading items from ${emailAddress}`);

    let response;
    if (typeof emailAddress === "string") {
      response = await serverSingleton.loadPantryItems(emailAddress);
    }

    console.log("pantry response = ", response);
    if (response) {
      console.log(response);
    }
  }

  useEffect(() => {
    loadItems(accountEmail);
  }, [accountEmail]);

  /*
    function renderNoItems() {
        if (listItems.length === 0) {
          return <div>You haven't added any items yet!</div>;
        }
      }

    return (
        <div id="view-items-container">
          {renderNoItems()}
          <div id="items"> {listItems} </div>
          <AddPantryItemModal
            isOpen={showAddPantryItemModal}
            closeModal={closeModal}
            submitModal={submitModal}
          />
        </div>
      );
      */

  const item1 = (
    <Item item={new ItemObject()} deleteItem={null} addItem={null}></Item>
  );
  const item2 = (
    <Item item={new ItemObject()} deleteItem={null} addItem={null}></Item>
  );
  const item3 = (
    <Item item={new ItemObject()} deleteItem={null} addItem={null}></Item>
  );
  const itemArray = [item1, item2, item3];

  return <div></div>;
}
