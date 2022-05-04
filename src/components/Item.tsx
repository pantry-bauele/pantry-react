import '../styles/Item.css';
import ItemBuilder from '../api/ItemBuilder';

interface Props {
    name: string;
    brand: string;
    calories: number;
    vendorPrices: [];
    totalQuantity: any;
    servingSize: any;
    deleteItem: any;
}

function Item({name, brand, calories, vendorPrices, totalQuantity, servingSize, deleteItem}: Props) {
    let vp = vendorPrices.map((v: any) => {
        return (
        <div key={v.name}>
            <div>{v.name} | ${v.price}</div>
        </div>
        )
    })

    function sendDelete() {
        let itemBuilder = new ItemBuilder();
        let item = itemBuilder.buildItem(name, brand, calories, 
            vendorPrices, totalQuantity, servingSize);

        deleteItem(item);
    }
    
    return (
        <div className="item">
            <div>{ name }
                <button style={{"marginLeft": "10px"}} onClick={sendDelete}>X</button>
            </div>
            <div style={{"padding": "5px"}}>
                <div>Brand: { brand }</div>
                <div>Calories: { calories }</div>
                <div> { vp } </div>
                <div>Total Quantity: { totalQuantity.amount} {totalQuantity.unit} </div>
                <div>Serving Size: { servingSize.amount} {servingSize.unit} </div>
            </div>
        </div>
    )
}

export default Item;