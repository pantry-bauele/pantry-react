import axios, { Method } from "axios";
import { getAuth } from "firebase/auth";

import { Item as ItemObject } from "../pantry-shared/src/item";
import { PantryItem as PantryItemObject } from "../pantry-shared/src/pantryItem";

class ServerAPI {
  ipAddress: string;
  port: string;
  serverURL: string;
  timeout = 5000;

  constructor() {
    console.log(process.env.REACT_APP_SERVER_ADDRESS);
    this.ipAddress = '';
    this.port = '';
    this.serverURL = '';
  }

  initialize(ipAddress: string, port: string, timeout?: number) {
    this.ipAddress = ipAddress;
    this.port = port;
    this.serverURL = ipAddress + ":" + port;

    if (timeout !== undefined) {
      if (timeout < 0) {
        throw new Error("timeout value must be a positive or 0 value");
      }

      this.timeout = timeout;
    }
  }

  async getAccount(emailAddress: string) {
    try {
      let response = await axios({
        method: "get",
        url: `${this.serverURL}/get-account`,
        params: {
          emailAddress: emailAddress,
        },
      });

      if (response.data) {
        console.log(response.data);
        return response.data;
      } else {
        console.log("No response");
      }
    } catch (error) {
      console.log("getAccount() error");
      console.log(error);
    }
  }

  async createAccount(
    emailAddress: string,
    firstName: string,
    lastName: string
  ) {
    try {
      let response = await axios({
        method: "post",
        url: `${this.serverURL}/create-account`,
        params: {
          emailAddress: emailAddress,
          firstName: firstName,
          lastName: lastName,
        },
      });

      if (response.data) {
        console.log(response.data);
        return response.data;
      } else {
        console.log("No response");
      }
    } catch (error) {
      console.log("createAccount() error");
      console.log(error);
    }
  }

  serverRequest = async (
    method: Method,
    endpoint: string,
    params: any,
    timeout: number
  ) => {
    try {
      let response = await axios({
        method: method,
        url: `${this.serverURL}/${endpoint}`,
        timeout: timeout,
        params: params,
        headers: {
          "authentication-token":
            (await getAuth().currentUser?.getIdToken()) ?? "",
        },
      });

      // response will thrown an error if the server responds with a
      // status code outside of the 200s
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  loadItems = async (emailAddress: string) => {
    return await this.serverRequest(
      "get",
      "get-all-items",
      {
        emailAddress: emailAddress,
      },
      this.timeout
    );
  };

  loadPantryItems = async (emailAddress: string) => {
    return await this.serverRequest(
      "get",
      "get-all-pantry-items",
      {
        emailAddress: emailAddress,
      },
      this.timeout
    );
  };

  getItem = async (emailAddress: string, itemId: string) => {
    return await this.serverRequest(
      "get",
      "get-item",
      {
        emailAddress: emailAddress,
        itemId: itemId,
      },
      this.timeout
    );
  };

  createItem = async (emailAddress: string, item: ItemObject) => {
    return await this.serverRequest(
      "post",
      "create-item",
      {
        emailAddress: emailAddress,
        itemObject: item,
      },
      this.timeout
    );
  };

  createPantryItem = async (
    pantryItem: PantryItemObject,
    emailAddress: string
  ) => {
    return await this.serverRequest(
      "post",
      "create-pantry-item",
      {
        emailAddress: emailAddress,
        itemObject: pantryItem,
      },
      this.timeout
    );
  };

  deleteItem = async (emailAddress: string, item: ItemObject) => {
    return await this.serverRequest(
      "post",
      "delete-item",
      {
        emailAddress: emailAddress,
        itemObject: item,
      },
      this.timeout
    );
  };

  deletePantryItem = async (
    emailAddress: string,
    pantryItem: PantryItemObject
  ) => {
    return await this.serverRequest(
      "post",
      "delete-pantry-item",
      {
        emailAddress: emailAddress,
        itemObject: pantryItem,
      },
      this.timeout
    );
  };

  editItem = async (emailAddress: string, item: ItemObject) => {
    return await this.serverRequest(
      "post",
      "edit-item",
      {
        emailAddress: emailAddress,
        itemObject: item,
      },
      this.timeout
    );
  };

  editPantryItem = async (
    emailAddress: string,
    pantryItem: PantryItemObject
  ) => {
    return await this.serverRequest(
      "post",
      "edit-pantry-item",
      {
        emailAddress: emailAddress,
        itemObject: pantryItem,
      },
      this.timeout
    );
  };
}

export const server = new ServerAPI();
if (process.env.REACT_APP_SERVER_ADDRESS && process.env.REACT_APP_SERVER_PORT) {
  server.initialize(process.env.REACT_APP_SERVER_ADDRESS, process.env.REACT_APP_SERVER_PORT);
}
else {
  console.log("Error: cannot initialize server connection");
}
