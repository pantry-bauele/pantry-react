import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ItemEntryForm } from "../components/ItemEntryForm";
import { Item as ItemObject } from "../pantry-shared/src/item";
import { server } from "../api/ServerAPI";

import "../styles/sass-built/EditItem.css";

interface Props {
  accountEmail: string | null;
}

export const EditItem = ({ accountEmail }: Props) => {
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [itemDetails, setItemDetails] = useState(
    new Map<string, string | [] | null>()
  );

  let { id } = useParams();
  let navigate = useNavigate();

  const submitForm = async (item: ItemObject) => {
    if (typeof id === "string") {
      item.setId(id);
      if (typeof accountEmail === "string") {
        let result = await server.editItem(accountEmail, item);
        if (result) {
          alert("Edited your item!");
        } else {
          alert("Something went wrong. Please try again.");
        }
      } else {
        alert("An unexpected error occured. Please try again.");
      }
    } else {
      alert("An unexpected error occured. Please try again.");
    }
  };

  const loadItemDetails = async () => {
    // Get the item details from the server via its id
    if (typeof accountEmail === "string" && typeof id === "string") {
      let result = await server.getItem(accountEmail, id);
      return result;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let result = await loadItemDetails();

      if (!result) {
        setLoadingError(true);
        return;
      }

      let details = new Map<string, string | []>();
      details.set("name", result.name);
      details.set("brand", result.brand);
      details.set("calories", result.calories);
      details.set("totalQuantityAmount", result.totalQuantity?.amount);
      details.set("totalQuantityUnit", result.totalQuantity?.unit);
      details.set("servingSizeAmount", result.servingSize?.amount);
      details.set("servingSizeUnit", result.servingSize?.unit);
      details.set("vendorPrices", result.vendorPrices);

      setItemDetails(details);
      setFinishedLoading(true);
    };

    fetchData();
  }, []);

  return (
    <div id="edit-item-container">
      <div id="edit-item-form-container">
        <h1>Edit Item</h1>
        {!finishedLoading && !loadingError && <div>Loading item...</div>}
        {finishedLoading && itemDetails.size === 0 && (
          <div>Could not retrieve item details</div>
        )}
        {loadingError && (
          <div>
            There was an error processing your request. Please try again.
          </div>
        )}
        {finishedLoading && itemDetails.size !== 0 && (
          <ItemEntryForm
            showNutritionFields={true}
            showSpendingFields={true}
            showSupplyFields={true}
            submitForm={submitForm}
            prefill={itemDetails}
            onBack={() => navigate("/viewItems")}
          />
        )}
      </div>
    </div>
  );
};
