// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpshCpicWa4XUyK8LwOL6qMOw5Zc1a8bI",
  authDomain: "hazaribaghjesuits.firebaseapp.com",
  projectId: "hazaribaghjesuits",
  storageBucket: "hazaribaghjesuits.firebasestorage.app",
  messagingSenderId: "598725405122",
  appId: "1:598725405122:web:b091722976ab127c9ace5b",
  measurementId: "G-D0E5RYB0C6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);