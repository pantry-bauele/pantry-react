interface Props {
  items: any;
  children?: JSX.Element;
}

export const ItemDisplay = ({ items, children }: Props) => {
  if (items.length === 0) {
    return <div>There are no items to display!</div>;
  } else {
    return <div> {items} </div>;
  }
};
