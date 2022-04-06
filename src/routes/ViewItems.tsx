import { useState } from 'react';

interface Props {
    accountEmail: string;
}

export default function ViewItems(props: Props) {
    const [accountEmail, setAccountEmail] = useState(props.accountEmail);
    console.log(props.accountEmail);
    
    return (
        <>
            <h1>View Items</h1>
            <h2>{props.accountEmail}</h2>
        </>
    )
}