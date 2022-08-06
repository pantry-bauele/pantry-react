import { ItemDisplay } from "../components/ItemDisplay";
import Item from "../components/items/Item";
import { serverSingleton } from "../api/ServerAPI";
import { useEffect, useState } from "react";
import { PantryItem as PantryItemObject } from "../pantry-shared/src/pantryItem";
import { PantryItemBuilder } from "../pantry-shared/src/pantryItemBuilder";
import PantryItem from "../components/items/PantryItem";

interface Props {
  accountEmail: string | null;
}

export default function Pantry({ accountEmail }: Props) {
  const [listItems, setListItems] = useState("");

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

      const elements = response.map((element: any) => (
        <PantryItem
          key={pantryItemBuilder.buildItem(element).getBaseItem().getId()}
          item={pantryItemBuilder.buildItem(element)}
          deleteItem={deleteItem}
          addItem={null}
        />
      ));
      console.log(elements);
      setListItems(elements);
    }
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
      {renderNoItems()}
      <div id="items"> {listItems} </div>
    </div>
  );
}
