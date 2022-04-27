import '../styles/ItemEntryForm.css';
import React, { useState } from 'react';

interface Props {
    selectedItemDetails: Map<string, boolean>;
}

export default function ItemEntryForm(props: Props) {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [calories, setCalories] = useState(-1);
    const [quantity, setQuantity] = useState(-1);
    const [quantityUnit, setQuantityUnit] = useState('');
    const [serving, setServing] = useState(-1);
    const [servingUnit, setServingUnit] = useState('');

    function doNothing() {

    }

    function showCaloriesField() {
        console.log(props);

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
                        <input name="serving" type="text" />
                    </label>

                    <label className="Form-element">
                        Unit
                        <select name="servingUnit">
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
            return (
                <>
                    <label className="">
                        Vendors

                    </label>
                </>
            )
        }
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
        }
    }

    return (
        <>
            <div id="parent">
                <form onSubmit={doNothing}>
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
        </>
    )
}