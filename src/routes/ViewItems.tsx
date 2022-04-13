import { useState } from 'react';
import { useAuthentication } from '../components/Authentication'

interface Props {
    accountEmail: string;
}

export default function ViewItems(props: Props) {
    const [accountEmail, setAccountEmail] = useState(props.accountEmail);
    console.log(props.accountEmail);

    let email = useAuthentication();
    
    return (
        <>
            <h1>View Items</h1>
            <h2>{email.emailAddress}</h2>
        </>
    )
}