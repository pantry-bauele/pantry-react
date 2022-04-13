import React from "react";
import { userEmail } from '../api/AuthenticationService';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getCurrentUser, authEmitter } from "../api/AuthenticationService"

interface IAuthentication {
    emailAddress: string;
}

let AuthenticationContext = React.createContext<IAuthentication>(null!);

export function AuthenticationProvider({children}: {children: React.ReactNode}) {

    let email = getCurrentUser();
    let value = {emailAddress: 'xx' };
    if (typeof email === 'string') {
        value = {emailAddress: email};
    }

    console.log('value = ', value);

    //console.log(children);
    return (
        <AuthenticationContext.Provider value={value}>
            {children}
        </AuthenticationContext.Provider>
    )


}

export function useAuthentication() {
    return React.useContext(AuthenticationContext);
}

export function RequireAuthentication({children}: {children: JSX.Element}) {
    let auth = useAuthentication();
    console.log('auth = ', getCurrentUser());
    console.log('auth email = ', getCurrentUser());

    let email = getCurrentUser();
    if (email === "" || (email === undefined)) {
        return (
            <div>
                You must log in before you can access this page.
            </div>
        )
    }

    return children;
}

export default {}