import { useState } from "react";
import { Button } from "../Button";

import "../../styles/sass-built/ItemHeading.css";

interface Props {
  name: string;
  brand: string;
  actionButtonText: string;
  actionButtonFunction: Function;
  expand: Function;
}

export const ItemHeading = ({
  name,
  brand,
  actionButtonText,
  actionButtonFunction,
  expand,
}: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div id="item-heading">
      <div id="item-heading-info">
        <div id="item-heading-icon"></div>
        <div id="item-heading-info-text">
          <div id="item-heading-name">{name}</div>
          <div id="item-heading-brand">{brand}</div>
        </div>
      </div>
      <div id="item-heading-buttons">
        <Button
          className="brand-button-red button-small clickable-button"
          text={actionButtonText}
          click={() => actionButtonFunction()}
        ></Button>
        <Button
          className="brand-button-green button-small clickable-button"
          text={expanded ? "Less" : "More"}
          click={() => {
            setExpanded(!expanded);
            expand();
          }}
        ></Button>
      </div>
    </div>
  );
};
