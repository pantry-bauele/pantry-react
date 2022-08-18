import "../styles/sass/EditItem.css";

import { Navigate, useParams } from "react-router-dom";
import { ItemEntryForm } from "../components/ItemEntryForm";
import { serverSingleton } from "../api/ServerAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  accountEmail: string | null;
}

let blank = new Map<string, string | []>();

export default function EditItem(props: Props) {
  let { id } = useParams();
  let navigate = useNavigate();

  const [iDetails, setItemDetails] = useState(blank);

  function submitForm(item: any) {
    alert("Submitted your item!");
    item.id = id;

    console.log("Item = ", item);

    if (typeof props.accountEmail === "string") {
      serverSingleton.editItem(props.accountEmail, item);
    }
  }

  async function getItemDetails() {
    // Make a call to the server to get all the information about that item
    // using its id
    if (typeof props.accountEmail === "string" && typeof id === "string") {
      console.log("getting item details");
      let result = await serverSingleton.getItem(props.accountEmail, id);
      return result;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      let result = await getItemDetails();

      let details = new Map<string, string | []>();
      details.set("name", result.name);
      details.set("brand", result.brand);
      details.set("calories", result.calories);
      details.set("totalQuantityAmount", result.totalQuantity.amount);
      details.set("totalQuantityUnit", result.totalQuantity.unit);
      details.set("servingSizeAmount", result.servingSize.amount);
      details.set("servingSizeUnit", result.servingSize.unit);
      details.set("vendorPrices", result.vendorPrices);

      setItemDetails(details);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("update details");
    console.log(iDetails);
    console.log("re-render");
  }, [iDetails]);

  function renderItemForm() {
    return <></>;
  }

  return (
    <div id="edit-item-container">
      <div id="edit-item-form-container">
        <h1>Edit Item</h1>
        <ItemEntryForm
          showNutritionFields={true}
          showSpendingFields={true}
          showSupplyFields={true}
          submitForm={submitForm}
          prefill={iDetails}
          onBack={() => navigate("/viewItems")}
        />
      </div>
    </div>
  );
}
