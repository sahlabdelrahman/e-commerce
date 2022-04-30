import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYVuxx6J3A_W1b_-qd8J2FaDwpGhcL6KA",
  authDomain: "e-commerce-7949e.firebaseapp.com",
  projectId: "e-commerce-7949e",
  storageBucket: "e-commerce-7949e.appspot.com",
  messagingSenderId: "543843316144",
  appId: "1:543843316144:web:f7882c6fad64c8ab6b2675",
  measurementId: "G-NNR85H245B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth(app);
