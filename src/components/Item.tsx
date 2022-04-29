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
        <div style={{"border": "2px solid black", "margin": "3px", "padding": "10px"}}>
            <div>Name: { name }</div>
            <div>Brand: { brand }</div>
            <div>Calories: { calories }</div>
            <div> { vp } </div>
        </div>
    )
}

export default Item;