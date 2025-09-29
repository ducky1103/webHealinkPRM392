// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBWQnbI_s8xO7bTwQMlG_GUo_fO6LlBuN8",
  authDomain: "test-12042.firebaseapp.com",
  projectId: "test-12042",
  storageBucket: "test-12042.firebasestorage.app",
  messagingSenderId: "1008902652116",
  appId: "1:1008902652116:web:bf9b833f585fea6d49fb41",
  measurementId: "G-70JM7REXVF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth, analytics };
