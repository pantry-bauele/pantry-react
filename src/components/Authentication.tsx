import React from "react";

interface IAuthentication {
    emailAddress: string;
}

let AuthenticationContext = React.createContext<IAuthentication>(null!);

export function AuthenticationProvider({children}: {children: React.ReactNode}) {

    let value = {emailAddress: ''}

    console.log(children);

    return (
        <AuthenticationContext.Provider value={value}>
            {children}
        </AuthenticationContext.Provider>
    )
}

function useAuthentication() {
    return React.useContext(AuthenticationContext);
}

export function RequireAuthentication({children}: {children: JSX.Element}) {
    let auth = useAuthentication();

    if (auth.emailAddress === "") {
        return (
            <div>
                You must log in before you can access this page.
            </div>
        )
    }

    return children;
}

export default {}