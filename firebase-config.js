// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5kMZ7rGQWgHKFj3Jq-YQ5y0K9T6Y1xmY",
  authDomain: "love-letter-2024.firebaseapp.com",
  databaseURL: "https://love-letter-2024-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "love-letter-2024",
  storageBucket: "love-letter-2024.appspot.com",
  messagingSenderId: "485134113871",
  appId: "1:485134113871:web:9d4af3ea2f9a6fa595a8c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, get, child };
