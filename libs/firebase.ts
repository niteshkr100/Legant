// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkIu5uH989pmWwi9e3OJUkBhfaSty1Vhg",
  authDomain: "myshop-1388a.firebaseapp.com",
  projectId: "myshop-1388a",
  storageBucket: "myshop-1388a.appspot.com",
  messagingSenderId: "657771635919",
  appId: "1:657771635919:web:cd358ef379a17fb125c3ba"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;