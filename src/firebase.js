// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDzEa7sl_7K2zi1zJZh4Z6r_s8m-i41TiA",
  authDomain: "to-do-list-react-based.firebaseapp.com",
  projectId: "to-do-list-react-based",
  storageBucket: "to-do-list-react-based.appspot.com",
  messagingSenderId: "979575436761",
  appId: "1:979575436761:web:a5ab2b90a81b0111a3d5c8",
  measurementId: "G-MJE06K2TX7",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
