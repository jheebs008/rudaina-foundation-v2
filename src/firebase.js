import firebase from "firebase";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyA_zoiRzLfJzvGY97CSOSdb0CrOIv2xB_E",
  authDomain: "rf-website-v2.firebaseapp.com",
  databaseURL: "https://rf-website-v2.firebaseio.com",
  projectId: "rf-website-v2",
  storageBucket: "rf-website-v2.appspot.com",
  messagingSenderId: "811833479370",
  appId: "1:811833479370:web:bdc62aeeccddf979ae2433",
  measurementId: "G-M4FE1MFR77"
};

const app = firebase.initializeApp(config);
const storage = firebase.storage();

// export {base , app , storage}
export { app , storage , firebase as default}