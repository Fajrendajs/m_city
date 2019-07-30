import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";

// https://console.firebase.google.com/project/m-city-edf44/database/m-city-edf44/data

// Your web app's Firebase configuration

var firebaseConfig = {
  apiKey: "AIzaSyASkV_OpE3DBGQIIyY22CjAUnBVTcWe4X4",
  authDomain: "m-city-edf44.firebaseapp.com",
  databaseURL: "https://m-city-edf44.firebaseio.com",
  projectId: "m-city-edf44",
  storageBucket: "",
  messagingSenderId: "911641476390",
  appId: "1:911641476390:web:a3cc111d9201fdc3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref("matches");
const firebasepromotions = firebaseDB.ref("promotions");
export { firebase, firebaseMatches, firebasepromotions };
