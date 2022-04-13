import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
const EventEmitter = require('events');

const firebaseConfig = {
    apiKey: "AIzaSyAXAhW8XBVJ4mmuUi_2NaDRpMY_MYDCwn8",
    authDomain: "pantry-be236.firebaseapp.com",
    projectId: "pantry-be236",
    storageBucket: "pantry-be236.appspot.com",
    messagingSenderId: "866075198626",
    appId: "1:866075198626:web:770e72230b22f34bf3c3fb",
    measurementId: "G-6LW3GB395J"
};

const app = firebase.initializeApp(firebaseConfig);
var ui = new firebaseui.auth.AuthUI(firebase.auth());
const auth = getAuth();

export const authEmitter = new EventEmitter();


export let userEmail: string;
var uid;

export function startLoginUI() {
    var uiConfig = {
        signInOptions: [
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: false
            }
        ],
        callbacks: {
          signInSuccessWithAuthResult: function(authResult: any, redirectUrl: any) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          },
        },
        signInSuccessUrl: '/'
    }
    
    ui.start('#firebaseui-auth-container', uiConfig);
}

export function getCurrentUser() {
  return getAuth().currentUser?.email;
}

onAuthStateChanged(auth, (user) => {
  console.log('User has been changed. ');
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    uid = user.uid;
    if (typeof user.email === 'string') {
        userEmail = user.email;
    }
    // ...
  } else {
    // User is signed out
    // ...
    console.log('User has signed out.');
  }

  authEmitter.emit('authChanged');
});

export function signOut() {
    getAuth().signOut();
}

export default {}