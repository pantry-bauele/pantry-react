import { serverSingleton } from "./ServerAPI";
import { createAuthenticationAccount } from "./AuthenticationService";

export class AccountCreator {
  createAccount = async (
    firstName: string,
    lastName: string,
    emailAddress: string,
    password: string
  ) => {
    let response = await serverSingleton.getAccount(emailAddress);

    if (!response) {
      console.log("Account does not exist.");
      // Authentication provider goes first
      let errorCode = await createAuthenticationAccount(emailAddress, password);
      console.log("Authentication Code:  ", errorCode);
      if (errorCode === 0) {
        await serverSingleton.createAccount(emailAddress, firstName, lastName);
        return 0;
      } else {
        return errorCode;
      }
    } else {
      console.log("Account already exists.");
      return -1;
    }
  };
}
