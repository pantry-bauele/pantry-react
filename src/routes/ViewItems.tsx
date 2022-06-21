import { useEffect, useState } from "react";
import Item from "../components/items/Item";

import { serverSingleton } from "../api/ServerAPI";
import { ItemBuilder } from "../pantry-shared/src/itemBuilder";
import { Item as ItemObject } from "../pantry-shared/src/item";
import "../styles/ViewItems.css";

interface Props {
  accountEmail: string | null;
}

export default function ViewItems(props: Props) {
  const [accountEmail, setAccountEmail] = useState(props.accountEmail);
  const [listItems, setListItems] = useState("");
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
      await serverSingleton.deleteItem(accountEmail, item);
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
      return <div>You haven't added any items yet!</div>;
    }
  }

  return (
    <div id="view-items-container">
      {renderNoItems()}
      <div id="items"> {listItems} </div>
    </div>
  );
}
