import "../styles/sass/Item.css";
import ItemBuilder from "../api/ItemBuilder";

import { Button } from "./Button";
import { useState } from "react";

interface Props {
  name: string;
  brand: string;
  calories: number;
  vendorPrices: [];
  totalQuantity: any;
  servingSize: any;
  deleteItem: any;
}

function Item({
  name,
  brand,
  calories,
  vendorPrices,
  totalQuantity,
  servingSize,
  deleteItem,
}: Props) {
  const [showMore, setShowMore] = useState(false);

  let vp = vendorPrices.map((v: any) => {
    return (
      <div key={v.name} className="vendor-price">
        <div>{v.name}</div>
        <div>${v.price}</div>
      </div>
    );
  });

  function sendDelete() {
    let itemBuilder = new ItemBuilder();
    let item = itemBuilder.buildItem(
      name,
      brand,
      calories,
      vendorPrices,
      totalQuantity,
      servingSize
    );

    deleteItem(item);
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
              {totalQuantity.amount} {totalQuantity.unit}
            </div>
            <div>
              {calories} calories per {servingSize.unit}
            </div>
          </div>
          <div id="pricing">{vp}</div>
          <div id="more-buttons">
            <Button id="edit" text="Edit"></Button>
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
            <div id="item-name">{name}</div>
            <div id="item-brand">{brand}</div>
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
