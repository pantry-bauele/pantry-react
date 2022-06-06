import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import firebase from "firebase/compat/app";
import { stringify } from "querystring";

const firebaseConfig = {
  apiKey: "AIzaSyAXAhW8XBVJ4mmuUi_2NaDRpMY_MYDCwn8",
  authDomain: "pantry-be236.firebaseapp.com",
  projectId: "pantry-be236",
  storageBucket: "pantry-be236.appspot.com",
  messagingSenderId: "866075198626",
  appId: "1:866075198626:web:770e72230b22f34bf3c3fb",
  measurementId: "G-6LW3GB395J",
};

const app = firebase.initializeApp(firebaseConfig);

// Function will return an object containing both an
// error code and an error message. The reason it returns
// both is to enable future changes in the specific error
// message without affecting the code that makes decisions
// based on the specific error number.
// -1 - Unknown error
// 0 - Successful account creation
// 1 - Internal error
// 2 - Invalid email address
// 3 - Weak password
export async function createAuthenticationAccount(
  emailAddress: string,
  password: string
) {
  let errorCode;

  await createUserWithEmailAndPassword(getAuth(), emailAddress, password)
    .then((userCredential) => {
      // Signed in
      errorCode = 0;
    })
    .catch((error) => {
      if (error.message.includes("auth/internal-error")) {
        errorCode = 1;
      } else if (error.message.includes("auth/invalid-email")) {
        errorCode = 2;
      } else if (error.message.includes("auth/weak-password")) {
        errorCode = 3;
      } else {
        errorCode = -1;
      }
    });

  return errorCode;
}

export function logoutUser() {
  signOut(getAuth());
  localStorage.removeItem("loggedIn");
}

export default {};
