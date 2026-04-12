import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import * as dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ADMIN_UID = "nf28i6f7IlWiPBgvopi5Ob2Gelq2";
const ADMIN_DATA = {
  email: "admin@admin.com",
  role: "admin",
  name: "Airton Silva",
  createdAt: new Date()
};

async function seed() {
  console.log("🚀 Starting Admin Seeding...");
  try {
    await setDoc(doc(db, "users", ADMIN_UID), ADMIN_DATA);
    console.log("✅ Admin user seeded successfully in collection 'users'");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin user:", error);
    process.exit(1);
  }
}

seed();
