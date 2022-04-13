import React from "react";

interface IAuthentication {
    emailAddress: string;
}

let AuthenticationContext = React.createContext<IAuthentication>(null!);

export function AuthenticationProvider({children}: {children: React.ReactNode}) {

    let email = localStorage.getItem('user');
    let value = {emailAddress: 'default' };
    if (typeof email === 'string') {
        value = {emailAddress: email};
    }

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

    let email = auth.emailAddress;
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