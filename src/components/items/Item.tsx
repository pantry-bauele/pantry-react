import "../../styles/sass/Item.css";

import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { useState } from "react";
import { Item as ItemObject } from "../../pantry-shared/src/item";

interface Props {
  item: ItemObject;
  deleteItem: any;
}

function Item({ item, deleteItem }: Props) {
  let navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  let vendorPrices = item.getVendorPrices().map((vp: any) => {
    return (
      <div key={vp.name} className="vendor-price">
        <div>{vp.name}</div>
        <div>${vp.price}</div>
      </div>
    );
  });

  function sendDelete() {
    deleteItem(item);
  }

  function editItem() {
    navigate(`/editItem/${item.getId()}`);
  }

  function toggleMore() {
    setShowMore(!showMore);
  }

  function renderMore() {
    if (showMore) {
      return (
        <div id="item-more">
          <div id="sizing">
            <div>
              {item.getTotalQuantity().amount} {item.getTotalQuantity().unit}
            </div>
            <div>
              {item.getCalories()} calories per {item.getServingSize().unit}
            </div>
          </div>
          <div id="pricing">{vendorPrices}</div>
          <div id="more-buttons">
            <Button id="edit" text="Edit" click={editItem}></Button>
            <Button id="stats" text="Statistics"></Button>
            <Button id="delete" text="Delete" click={sendDelete}></Button>
          </div>
        </div>
      );
    }
  }

  return (
    <div id="item-container">
      <div id="item-main">
        <div id="item-icon"></div>
        <div id="item-body">
          <div id="item-header">
            <div id="item-name">{item.getName()}</div>
            <div id="item-brand">{item.getBrand()}</div>
          </div>
          <div id="item-buttons">
            <Button id="add" text="Add"></Button>
            <Button id="more" text="More" click={toggleMore}></Button>
          </div>
        </div>
      </div>
      {renderMore()}
      <div id="item-border"></div>
    </div>
  );
}

export default Item;
