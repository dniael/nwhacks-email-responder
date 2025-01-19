import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA4rwamdf9Vgydag2HOz8BQFHRNpoF82M8",
  authDomain: "nw-hacks-workshop-2025.firebaseapp.com",
  projectId: "nw-hacks-workshop-2025",
  storageBucket: "nw-hacks-workshop-2025.firebasestorage.app",
  messagingSenderId: "261856311264",
  appId: "1:261856311264:web:8695e8e1f3acd9e21a5d85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };