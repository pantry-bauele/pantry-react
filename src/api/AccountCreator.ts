import { server } from "./ServerAPI";
import { createAuthenticationAccount } from "./AuthenticationService";

export class AccountCreator {
  createAccount = async (
    firstName: string,
    lastName: string,
    emailAddress: string,
    password: string
  ) => {
    // Attempt to locate the account with the server. If it is not found,
    // attempt to create the account with the Authentication Provider.
    let response = await server.getAccount(emailAddress);
    if (!response) {
      let errorCode = await createAuthenticationAccount(emailAddress, password);

      // If account was successfully created with the Authentication Provider,
      // create it on the server as well.
      if (errorCode === 0) {
        await server.createAccount(emailAddress, firstName, lastName);
        return 0;
      } else {
        return errorCode;
      }
    } else {
      return -1;
    }
  };
}
