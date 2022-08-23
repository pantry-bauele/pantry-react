import axios from "axios";

import { Item as ItemObject } from "../pantry-shared/src/item";
import { PantryItem as PantryItemObject } from "../pantry-shared/src/pantryItem";

class ServerAPI {
  ipAddress: string;
  port: string;
  serverURL: string;
  timeout = 5000;

  constructor(ipAddress: string, port: string, timeout?: number) {
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

  loadItems = async (emailAddress: string) => {
    try {
      let response = await axios({
        method: "get",
        url: `${this.serverURL}/get-all-items`,
        timeout: this.timeout,
        params: {
          emailAddress: emailAddress,
          credentials: localStorage.getItem("pantry-firebase-credentials"),
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

  loadPantryItems = async (emailAddress: string) => {
    try {
      let response = await axios({
        method: "get",
        url: `${this.serverURL}/get-all-pantry-items`,
        timeout: this.timeout,
        params: {
          emailAddress: emailAddress,
        },
      });

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  getItem = async (emailAddress: string, itemId: string) => {
    try {
      let response = await axios({
        method: "get",
        url: `${this.serverURL}/get-item`,
        timeout: this.timeout,
        params: {
          emailAddress: emailAddress,
          itemId: itemId,
        },
      });

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  createItem = async (emailAddress: string, item: ItemObject) => {
    try {
      let response = await axios({
        method: "post",
        url: `${this.serverURL}/create-item`,
        timeout: this.timeout,
        params: {
          emailAddress: emailAddress,
          itemObject: item,
        },
      });

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  createPantryItem = async (
    pantryItem: PantryItemObject,
    emailAddress: string
  ) => {
    try {
      let response = await axios({
        method: "post",
        url: `${this.serverURL}/create-pantry-item`,
        timeout: this.timeout,
        params: {
          emailAddress: emailAddress,
          itemObject: pantryItem,
        },
      });

      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  deleteItem = async (emailAddress: string, item: any) => {
    try {
      let response = await axios({
        method: "post",
        url: `${this.serverURL}/delete-item`,
        timeout: this.timeout,
        params: {
          emailAddress: emailAddress,
          itemObject: item,
        },
      });

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  async deletePantryItem(emailAddress: string, item: any) {
    try {
      let response = await axios({
        method: "post",
        url: `${this.serverURL}/delete-pantry-item`,
        params: {
          emailAddress: emailAddress,
          itemObject: item,
        },
      });

      if (response.data) {
        console.log(response.data);
        return response.data;
      } else {
        console.log("No response");
      }
    } catch (error) {
      console.log("deletePantryItem() error");
      console.log(error);
    }
  }

  async editPantryItem(emailAddress: string, item: any) {
    try {
      let response = await axios({
        method: "post",
        url: `${this.serverURL}/edit-pantry-item`,
        params: {
          emailAddress: emailAddress,
          itemObject: item,
        },
      });

      if (response.data) {
        console.log(response.data);
        return response.data;
      } else {
        console.log("No response");
      }
    } catch (error) {
      console.log("editPantryItem() error");
      console.log(error);
    }
  }

  async editItem(emailAddress: string, item: any) {
    try {
      let response = await axios({
        method: "post",
        url: `${this.serverURL}/edit-item`,
        params: {
          emailAddress: emailAddress,
          itemObject: item,
        },
      });

      if (response.data) {
        console.log(response.data);
        return response.data;
      } else {
        console.log("No response");
      }
    } catch (error) {
      console.log("editItem() error");
      console.log(error);
      return false;
    }
  }
}

export const server = new ServerAPI("http://192.168.0.7", "3001");
