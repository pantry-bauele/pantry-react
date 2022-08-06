import "../../styles/sass/Item.css";
import { Button } from "../Button";

interface Props {
  name: string;
  brand: string;
  actionButtonType: any;
  actionButtonFunction: any;
  expand: any;
}

function ItemHeading({
  name,
  brand,
  actionButtonType,
  actionButtonFunction,
  expand,
}: Props) {
  function getButtonText() {
    if (actionButtonType === "add") {
      return "Add";
    } else if (actionButtonType === "delete") {
      return "Delete";
    } else if (actionButtonType === "use") {
      return "Use";
    } else {
      return "Undef";
    }
  }

  return (
    <div id="item-heading">
      <div id="item-heading-info">
        <div id="item-icon"></div>
        <div id="item-heading-info-text">
          <div id="item-name">{name}</div>
          <div id="item-brand">{brand}</div>
        </div>
      </div>
      <div id="item-buttons">
        <Button
          id="add"
          text={getButtonText()}
          click={actionButtonFunction}
        ></Button>
        <Button id="more" text="More" click={expand}></Button>
      </div>
    </div>
  );
}

export default ItemHeading;
