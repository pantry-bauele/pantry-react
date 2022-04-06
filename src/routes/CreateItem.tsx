import '../styles/CreateItem.css';
import ItemEntryForm from '../components/ItemEntryForm';
import { useState } from 'react';

let itemDetailsDefault = new Map<string, boolean>();
itemDetailsDefault.set('nutrition-button', false);
itemDetailsDefault.set('spending-button', false);
itemDetailsDefault.set('supply-button', false);

export default function CreateItem() {
    const [selectedItemDetails,setSelectedItemDetails] = useState(new Map<string, boolean>(itemDetailsDefault));
    const [showItemDetailsButtons, setShowItemDetailsButtons] = useState(true);
    const [showItemForm, setShowItemForm] = useState(false);

    function toggleItemDetail(event: React.MouseEvent<HTMLElement>) {
        const buttonId = event.currentTarget.id;

        let newItemDetails = selectedItemDetails;
        newItemDetails.set(buttonId, !newItemDetails.get(buttonId));

        // Toggles the border around the button to show whether or not
        // the selected item detail has been enabled
        newItemDetails.get(buttonId) ?  
            document.querySelector(`#${buttonId}`)?.classList.add("item-details-button-selected")
            : document.querySelector(`#${buttonId}`)?.classList.remove("item-details-button-selected")

        setSelectedItemDetails(newItemDetails);
    }

    function toggleFormPage() {
        setShowItemDetailsButtons(!showItemDetailsButtons);
        setShowItemForm(!showItemForm);
    }

    function renderItemDetailsButtons() {
        if (showItemDetailsButtons) {
            return (
                <>
                    <h2 id="details-prompt">What details do you want to track about this item?</h2>
                    <button id="nutrition-button" className="item-details-button" onClick={toggleItemDetail}>Nutrition</button>
                    <button id="spending-button" className="item-details-button" onClick={toggleItemDetail}>Spending</button>
                    <button id="supply-button" className="item-details-button" onClick={toggleItemDetail}>At-Home Supply</button>
                    <button id="continue-button" className="item-details-button" onClick={toggleFormPage} >Continue</button>
                </>
            )
        }
    }

    function renderItemForm() {
        if (showItemForm) {
            return (
                <>
                    <ItemEntryForm selectedItemDetails={selectedItemDetails} />
                    <button id="back-button" onClick={toggleFormPage}>Go Back</button>
                </>
            )
        }
    }
    return (
        <div id="parent">
            <h1>Create Item</h1>

            {renderItemDetailsButtons()}
            {renderItemForm()}
        </div>
    )
}