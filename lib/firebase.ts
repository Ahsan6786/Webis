import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAQD0P_w859l3B7m2Ka9buRoRnrd0zknKs",
  authDomain: "webis-a35f3.firebaseapp.com",
  projectId: "webis-a35f3",
  storageBucket: "webis-a35f3.firebasestorage.app",
  messagingSenderId: "77795560389",
  appId: "1:77795560389:web:0e8dbbb2040f5df2fc19ac",
  measurementId: "G-NC6XXBRETF"
};

// Initialize Firebase (Singleton pattern to prevent re-initialization during HMR)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Analytics is only supported in browser environments
const analytics = typeof window !== "undefined" ? isSupported().then((yes) => yes ? getAnalytics(app) : null) : null;

export { app, db, analytics };
