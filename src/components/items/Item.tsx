import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

import { ItemHeading } from "../items/ItemHeading";
import { Item as ItemObject, VendorPrice } from "../../pantry-shared/src/item";

import "../../styles/sass-built/Item.css";

interface Props {
  item: ItemObject;
  deleteItem: Function;
  addItem: Function;
}

export const Item = ({ item, deleteItem, addItem }: Props) => {
  const [expanded, setExpanded] = useState(false);
  let navigate = useNavigate();

  let vendorPrices = item
    .getVendorPrices()
    .map((vendorPrice: VendorPrice, index) => {
      if (vendorPrice.name !== "") {
        return (
          <div key={index} className="item-vendor-price">
            <div>{vendorPrice.name}</div>
            <div>${vendorPrice.price}</div>
          </div>
        );
      }
    });

  const renderExpandedContent = () => {
    if (expanded) {
      return (
        <div id="item-expanded-area">
          <div id="item-size">
            <div>
              {item.getTotalQuantity()
                ? item.getTotalQuantity()?.amount +
                  " " +
                  item.getTotalQuantity()?.unit +
                  " of product"
                : ""}
            </div>
            <div>
              {/* Only show the calories field if not or if non-zero */}
              {item.getCalories()
                ? `${item.getCalories()} calories per  ${
                    item.getServingSize()?.amount
                  } ${item.getServingSize()?.unit}`
                : ""}
            </div>
          </div>
          <div id="item-prices">{vendorPrices}</div>
          <div id="item-additional-buttons">
            <Button
              className="brand-button-red button-medium clickable-button"
              text="Edit"
              click={() => navigate(`/editItem/${item.getId()}`)}
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
          name={item.getName()}
          brand={item.getBrand()}
          expand={() => setExpanded(!expanded)}
          actionButtonText="Add"
          actionButtonFunction={() => addItem(item)}
        />
      </div>
      {renderExpandedContent()}
      <div id="item-border"></div>
    </div>
  );
};
