import '../styles/ItemEntryForm.css';
import React, { useState } from 'react';

interface Props {
    selectedItemDetails: Map<string, boolean>;
    submitForm: any;
}

let vp = new Array<{ vendor: string, price: string }>();
vp.push({ vendor: '', price: '' });

export default function ItemEntryForm(props: Props) {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [calories, setCalories] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [quantityUnit, setQuantityUnit] = useState('');
    const [serving, setServing] = useState(0);
    const [servingUnit, setServingUnit] = useState('');
    const [vendorPrices, setVendorPrices] = useState(vp);

    function showCaloriesField() {
        if (props.selectedItemDetails.get('nutrition-button')) {
            return (
                <>
                    <label className="Form-element">
                        Calories
                        <input name="calories" type="text" value={calories} onChange={handleChange} />
                    </label>
                </>
            )
        }
    }

    function showTotalQuantityField() {
        if (props.selectedItemDetails.get('supply-button') ||
            props.selectedItemDetails.get('spending-button')) {
            return (
                <>
                    <label className="Form-element">
                        Total Quantity
                        <input name="quantity" type="text" value={quantity} onChange={handleChange} />
                    </label>

                    <label className="Form-element">
                        Unit
                        <select name="quantityUnit" value={quantityUnit} onChange={handleChange}>
                            <option value="g">grams</option>
                            <option value="oz">ounces</option>
                            <option value="lb">pounds</option>
                        </select>
                    </label>
                </>
            )
        }
    }

    function showServingSizeField() {
        if (props.selectedItemDetails.get('nutrition-button')) {
            return (
                <>
                    <label className="Form-element">
                        Serving Size
                        <input name="serving" type="text" value={serving} onChange={handleChange} />
                    </label>

                    <label className="Form-element">
                        Unit
                        <select name="servingUnit" value={servingUnit} onChange={handleChange}>
                            <option value="g">grams</option>
                            <option value="oz">ounces</option>
                            <option value="lb">pounds</option>
                        </select>
                    </label>
                </>
            )
        }

    }

    function showVendorField() {
        if (props.selectedItemDetails.get('spending-button')) {
            let x = vendorPrices.map((v, index) => {
                return (
                    <div key={index}>
                        <input name={`vendor${index}`} type="text" value={vendorPrices[index].vendor} onChange={onVendorPriceChange} />
                        <input name={`price${index}`} type="text" value={vendorPrices[index].price} onChange={onVendorPriceChange} />
                        <button name={`${index}`} onClick={(e) => deleteVendorPrice(e)}>X</button>
                    </div>
                )
            })

            return (
                <>
                    <label className="">
                        Vendors

                        {x}
                        <button onClick={(e) => addVendorPrice(e)}>Add Vendor Price</button>
                    </label>
                </>
            )
        }
    }

    function onVendorPriceChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        const target = event.target;
        const name = target.name;
        console.log(name);
        console.log(target.value);

        let currentVendorPrices = vendorPrices;
        let newVendorPrices = [...currentVendorPrices];

        if (name.includes("vendor")) {
            console.log("Updating vendor...");
            let index = Number.parseInt(name.substring(6));
            console.log('index = ', index);
            console.log('newVP = ', newVendorPrices);

            newVendorPrices[index].vendor = target.value;
            console.log('newVP = ', newVendorPrices);

            setVendorPrices(newVendorPrices);
        }
        else if (name.includes("price")) {
            let index = Number.parseInt(name.substring(5));

            newVendorPrices[index].price = (target.value);
            console.log('newVP = ', newVendorPrices);

            setVendorPrices(newVendorPrices);
        }
    }

    function addVendorPrice(e: React.MouseEvent) {
        e.preventDefault();

        let currentVendorPrices = vendorPrices;
        let newVendorPrices = [...currentVendorPrices];
        newVendorPrices.push({ vendor: "", price: "" });

        setVendorPrices(newVendorPrices);
    }

    function deleteVendorPrice(e: React.MouseEvent) {
        e.preventDefault();
        let name = e.currentTarget.getAttribute('name');
        console.log(e.currentTarget.getAttribute('name'));

        let currentVendorPrices = vendorPrices;
        let newVendorPrices = [...currentVendorPrices];

        if (name !== null) {
            newVendorPrices.splice(Number.parseInt(name), 1);
        }

        setVendorPrices(newVendorPrices);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        const target = event.target;
        const name = target.name;
        console.log(name);
        console.log(target.value);

        switch (name) {
            case 'name':
                setName(target.value);
                break;

            case 'brand':
                setBrand(target.value);
                break;

            case 'calories':
                console.log('trying');
                setCalories(Number.parseInt(target.value));
                break;

            case 'quantity':
                setQuantity(Number.parseInt(target.value));
                break;

            case 'quantityUnit':
                setQuantityUnit(target.value);
                break;

            case 'serving':
                setServing(Number.parseInt(target.value));
                break;

            case 'servingUnit':
                setServingUnit(target.value);
                break;
        }
    }

    function buildItemObject() {
        let item = {
            name: name,
            brand: brand,
            calories: calories,
            vendorPrice: null,
            totalQuantity: { amount: quantity, unit: quantityUnit },
            servingSize: { amount: serving, unit: servingUnit }
        }

        return item;
    }

    return (
        <>
            <div id="parent">
                <form>
                    <label className="Form-element">
                        <div>Item Name</div>
                        <input name="name" type="text" value={name} onChange={handleChange} />
                    </label>
                    <label className="Form-element">
                        Brand
                        <input name="brand" type="text" value={brand} onChange={handleChange} />
                    </label>

                    {showCaloriesField()}
                    {showTotalQuantityField()}
                    {showServingSizeField()}
                    {showVendorField()}
                </form>
            </div>

            <button id="submit-button" onClick={() => { props.submitForm(buildItemObject()) }}>Add Item</button>
        </>
    )
}