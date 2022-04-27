import '../styles/Login.css'

import { useEffect } from 'react';
import '../api/AuthenticationService';
import { startLoginUI } from '../api/AuthenticationService';

export default function Login() {
    useEffect(() => {
        startLoginUI();
    }, [])

    return (
        <div id="parent">
            <div id="firebaseui-auth-container"></div>
        </div>
    )
}