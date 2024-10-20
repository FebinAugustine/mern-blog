// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-85aff.firebaseapp.com",
  projectId: "mern-blog-85aff",
  storageBucket: "mern-blog-85aff.appspot.com",
  messagingSenderId: "295375618800",
  appId: "1:295375618800:web:0f03550a52d3b7318af835",
  measurementId: "G-62HJKGZFQ1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
