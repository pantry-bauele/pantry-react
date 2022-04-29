import { useEffect, useState } from 'react';
import Item from '../components/Item';
import axios from 'axios';

interface Props {
  accountEmail: string | null;
}

export default function ViewItems(props: Props) {
  const [accountEmail, setAccountEmail] = useState(props.accountEmail);
  const [listItems, setListItems] = useState("");
  console.log(props.accountEmail);

  async function loadItems(emailAddress: string | null) {
    console.log(`Loading items from ${emailAddress}`);

    try {
      let response = await axios({
        method: 'get',
        url: 'http://192.168.0.5:3001/get-items',
        params: {
          emailAddress: emailAddress,
        }
      })

      if (response.data) {
        console.log(response.data);

        const elements = response.data.map((element: any) =>
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
      else {
        console.log('No response');
      }

    } catch (error) {
      console.log('loadItems() error');
      console.log(error);
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