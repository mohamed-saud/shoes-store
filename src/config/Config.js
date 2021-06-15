import firebase from "firebase";

import "firebase/auth";

var config = {
  apiKey: "AIzaSyB7tQ-NDBfaY1lsSlm-rX4KYSANXinoi_M",
  authDomain: "shopping-cart-dfa8f.firebaseapp.com",
  projectId: "shopping-cart-dfa8f",
  storageBucket: "shopping-cart-dfa8f.appspot.com",
  messagingSenderId: "459710132413",
  appId: "1:459710132413:web:cd4bb121cec89c834d07d4",
  measurementId: "G-L7TRWLL7PL",
};
firebase.initializeApp(config);
export const auth = firebase.auth();
export default firebase;
