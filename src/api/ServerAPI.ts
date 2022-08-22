import axios from "axios";

import { PantryItem } from "../pantry-shared/src/pantryItem";

class ServerAPI {
  ipAddress: string;
  port: string;
  serverURL: string;

  constructor(ipAddress: string, port: string) {
    this.ipAddress = ipAddress;
    this.port = port;
    this.serverURL = ipAddress + ":" + port;
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

  async loadItems(emailAddress: string) {
    try {
      let response = await axios({
        method: "get",
        url: `${this.serverURL}/get-all-items`,
        params: {
          emailAddress: emailAddress,
          credentials: localStorage.getItem("pantry-firebase-credentials"),
        },
      });

      if (response.data) {
        console.log(response.data);
        return response.data;
      } else {
        console.log("No response");
      }
    } catch (error) {
      console.log("loadItems() error");
      console.log(error);
      return false;
    }
  }

  async loadPantryItems(emailAddress: string) {
    try {
      let response = await axios({
        method: "get",
        url: `${this.serverURL}/get-all-pantry-items`,
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
      console.log("loadPantryItems() error");
      console.log(error);
    }
  }

  async getItem(emailAddress: string, itemId: string) {
    try {
      let response = await axios({
        method: "get",
        url: `${this.serverURL}/get-item`,
        params: {
          emailAddress: emailAddress,
          itemId: itemId,
        },
      });

      if (response.data) {
        console.log(response.data);
        return response.data;
      } else {
        console.log("No response");
      }
    } catch (error) {
      console.log("getItem() error");
      console.log(error);
    }
  }

  async createItem(emailAddress: string, item: any) {
    try {
      let response = await axios({
        method: "post",
        url: `${this.serverURL}/create-item`,
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
      console.log("createItem() error");
      console.log(error);
    }
  }

  async createPantryItem(pantryItem: PantryItem, emailAddress: string) {
    try {
      let response = await axios({
        method: "post",
        url: `${this.serverURL}/create-pantry-item`,
        params: {
          emailAddress: emailAddress,
          itemObject: pantryItem,
        },
      });

      if (response.data) {
        console.log(response.data);
        return response.data;
      } else {
        console.log("No response");
      }
    } catch (error) {
      console.log("createPantryItem() error");
      console.log(error);
    }
  }

  async deleteItem(emailAddress: string, item: any) {
    try {
      let response = await axios({
        method: "post",
        url: `${this.serverURL}/delete-item`,
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
      console.log("deleteItem() error");
      console.log(error);
    }
  }

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
