import "../../styles/sass/Item.css";

import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { useState } from "react";
import { Item as ItemObject } from "../../pantry-shared/src/item";
import ItemHeading from "../items/ItemHeading";
interface Props {
  item: ItemObject;
  deleteItem: any;
  addItem: any;
}

function Item({ item, deleteItem, addItem }: Props) {
  let navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  let vendorPrices = item.getVendorPrices().map((vp: any) => {
    if (vp.name !== "") {
      return (
        <div key={vp.name} className="vendor-price">
          <div>{vp.name}</div>
          <div>${vp.price}</div>
        </div>
      );
    }
  });

  function sendDelete() {
    deleteItem(item);
  }

  function sendAdd() {
    addItem(item);
  }

  function editItem() {
    navigate(`/editItem/${item.getId()}`);
  }

  function toggleExpand() {
    setExpanded(!expanded);
  }

  function renderMore() {
    if (expanded) {
      return (
        <div id="item-more">
          <div id="sizing">
            <div>
              {isNaN(item.getTotalQuantity().amount)
                ? ""
                : item.getTotalQuantity().amount +
                  " " +
                  item.getTotalQuantity().unit}
            </div>
            <div>
              {item.getCalories() < 0
                ? ""
                : item.getCalories() + " per " + item.getServingSize().unit}
            </div>
          </div>
          <div id="pricing">{vendorPrices}</div>
          <div id="more-buttons">
            <Button id="edit" text="Edit" click={editItem}></Button>
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
          name={item.getName()}
          brand={item.getBrand()}
          expand={toggleExpand}
          actionButtonType="add"
          actionButtonFunction={sendAdd}
        />
      </div>
      {renderMore()}
      <div id="item-border"></div>
    </div>
  );
}

export default Item;
