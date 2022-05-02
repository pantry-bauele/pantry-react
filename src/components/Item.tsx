import '../styles/Item.css';

interface Props {
    name: string;
    brand: string;
    calories: number;
    vendorPrices: [];
    totalQuantity: any;
    servingSize: any;
}

function Item({name, brand, calories, vendorPrices, totalQuantity, servingSize}: Props) {
    let vp = vendorPrices.map((v: any) => {
        return (
        <div key={v.name}>
            <div>{v.name} | ${v.price}</div>
        </div>
        )
    })
    
    return (
        <div className="item">
            <div>{ name }</div>
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