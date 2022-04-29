import { useEffect, useState } from 'react';
import Item from '../components/Item';

import {serverSingleton} from '../api/ServerAPI';

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
    if (typeof emailAddress === 'string') {
      response = await serverSingleton.loadItems(emailAddress);
    }

    console.log('response = ', response);
    if (response) {
      console.log(response);

      const elements = response.map((element: any) =>
        <Item
          key={element.name}
          name={element.name}
          brand={element.brand}
          calories={element.calories}
          vendorPrices={element.vendorPrices}
          totalQuantity={element.totalQuantity}
          servingSize={element.servingSize}
        />
      )

      console.log(elements);
      setListItems(elements);
    }
  }

  useEffect(() => {
    loadItems(accountEmail);
  }, [accountEmail])

  return (
    <>
      <h1>View Items</h1>
      <h2>{accountEmail}</h2>
      <div style={{"display": "flex"}}> {listItems} </div>
    </>
  )
}