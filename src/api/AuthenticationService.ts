import { getAuth, signOut } from "firebase/auth";
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'

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

export function startLoginUI() {
  var uiConfig = {
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      }
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (authResult: any, redirectUrl: any) {
        return true;
      },
    },
    signInSuccessUrl: '/createItem'
  }

  ui.start('#firebaseui-auth-container', uiConfig);
}

export function logoutUser() {
  signOut(getAuth());
  localStorage.removeItem('loggedIn');
}

export default {}