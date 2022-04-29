import axios from 'axios';

class ServerAPI {
    ipAddress: string;
    port: string;
    serverURL: string;

    constructor(ipAddress: string, port: string) {
        this.ipAddress = ipAddress;
        this.port = port;
        this.serverURL = ipAddress + ":" + port;
    }

    async loadItems(emailAddress: string) {
        console.log(`Loading items from ${emailAddress}`);
        console.log(`Server URL = ${this.serverURL}`);

        try {
            let response = await axios({
                method: 'get',
                url: `${this.serverURL}/get-items`,
                params: {
                    emailAddress: emailAddress,
                }
            })

            if (response.data) {
                console.log(response.data);
                return response.data;
            }
            else {
                console.log('No response');
            }

        } catch (error) {
            console.log('loadItems() error');
            console.log(error);
        }
    }

    async createItem(emailAddress: string, item: any) {
        try {
            let response = await axios({
                method: 'post',
                url: `${this.serverURL}/add-item`,
                params: {
                    emailAddress: emailAddress,
                    itemObject: item
                }
            })

            if (response.data) {
                console.log(response.data);
                return response.data;
            }
            else {
                console.log('No response');
            }

        } catch (error) {
            console.log('loadItems() error');
            console.log(error);
        }
    }
}

let serverSingleton = new ServerAPI("http://192.168.0.5", "3001");

export { ServerAPI, serverSingleton };