import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA54OA8hE6Xi9_WQEC-fT4VsUXzltiqZd0",
  authDomain: "suporte-empreendedor.firebaseapp.com",
  projectId: "suporte-empreendedor",
  storageBucket: "suporte-empreendedor.firebasestorage.app",
  messagingSenderId: "167509129804",
  appId: "1:167509129804:web:197a85f476a2be906dd2e9",
  measurementId: "G-Z1J2BX3Z60"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
