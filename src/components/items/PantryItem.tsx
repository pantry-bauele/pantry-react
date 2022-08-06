import "../../styles/sass/PantryItem.css";
import "../../styles/sass/Item.css";

import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { useState } from "react";
import { PantryItem as PantryItemObject } from "../../pantry-shared/src/pantryItem";
import ItemHeading from "../items/ItemHeading";

interface Props {
  item: PantryItemObject;
  deleteItem: any;
  addItem: any;
}

function PantryItem({ item, deleteItem, addItem }: Props) {
  let navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  function sendDelete() {
    deleteItem(item);
  }

  function sendAdd() {
    addItem(item);
  }

  function editItem() {}

  function toggleExpand() {
    setExpanded(!expanded);
  }

  function renderMore() {
    if (expanded) {
      return (
        <div id="item-more">
          <div id="more-buttons">
            <Button id="edit" text="Audit" click={editItem}></Button>
            <Button id="delete" text="Delete" click={sendDelete}></Button>
          </div>
        </div>
      );
    }
  }

  return (
    <div id="item-container">
      <div id="item-main">
        <ItemHeading
          name={item.getBaseItem().getName()}
          brand={item.getBaseItem().getBrand()}
          expand={toggleExpand}
          actionButtonType="add"
          actionButtonFunction={sendAdd}
        />
      </div>
      <div id="item-stock">
        <div id="item-stock-text">
          {item.getAvailableQuantity().amount}{" "}
          {item.getAvailableQuantity().unit} in stock
        </div>
        <div id="item-expiration-text">
          {item.getExpirationDate().getFullYear() == 1969
            ? ""
            : "Expires on " + item.getExpirationDate().toLocaleDateString()}
        </div>
      </div>
      {renderMore()}
      <div id="item-border"></div>
    </div>
  );
}

export default PantryItem;
