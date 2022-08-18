import { useState } from "react";

import { Button } from "../Button";
import { ItemHeading } from "../items/ItemHeading";
import { PantryItem as PantryItemObject } from "../../pantry-shared/src/pantryItem";

import "../../styles/sass/PantryItem.css";
import "../../styles/sass/Item.css";

interface Props {
  item: PantryItemObject;
  deleteItem: Function;
  addItem: Function;
  utilizeItem: Function;
  editItem: Function;
}

export const PantryItem = ({
  item,
  deleteItem,
  addItem,
  utilizeItem,
  editItem,
}: Props) => {
  const [expanded, setExpanded] = useState(false);

  const renderExpandedContent = () => {
    if (expanded) {
      return (
        <div id="item-expanded-area">
          <div id="item-additional-buttons">
            <Button
              className="brand-button-red button-medium clickable-button"
              text="Edit"
              click={() => editItem(item)}
            ></Button>
            <Button
              className="brand-button-white button-medium clickable-button"
              text="Delete"
              click={() => deleteItem(item)}
            ></Button>
          </div>
        </div>
      );
    }
  };

  return (
    <div id="item-container">
      <div id="item-parent">
        <ItemHeading
          name={item.getBaseItem().getName()}
          brand={item.getBaseItem().getBrand()}
          expand={() => setExpanded(!expanded)}
          actionButtonText="Use"
          actionButtonFunction={() => utilizeItem(item)}
        />
      </div>
      <div id="item-stock">
        <div id="item-stock-text">
          {item.getAvailableQuantity().amount > 0
            ? item.getAvailableQuantity().amount +
              " " +
              item.getAvailableQuantity().unit +
              " in stock "
            : ""}
        </div>
        <div id="item-expiration-text">
          {/* 1969 is the year that is returned by default if the user has not
           selected an expiration date, so it should not be shown */}
          {item.getExpirationDate().getFullYear() == 1969
            ? ""
            : "Expires on " + item.getExpirationDate().toLocaleDateString()}
        </div>
      </div>
      {renderExpandedContent()}
      <div id="item-border"></div>
    </div>
  );
};
