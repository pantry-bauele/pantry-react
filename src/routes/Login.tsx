import '../styles/Login.css'

import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as firebaseui from 'firebaseui'
import { useEffect } from 'react';
import '../api/AuthenticationService';
import { startLoginUI } from '../api/AuthenticationService';

export default function Login() {

    function loginUser() {
        //console.log('logging in');
    }
    
    useEffect(() => {
        startLoginUI();
    })

    return (
        <div id="parent">
            <div id="firebaseui-auth-container"></div>
        </div>
    )
}