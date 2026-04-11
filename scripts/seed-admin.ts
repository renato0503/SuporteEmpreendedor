import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA54OA8hE6Xi9_WQEC-fT4VsUXzltiqZd0",
  authDomain: "suporte-empreendedor.firebaseapp.com",
  projectId: "suporte-empreendedor",
  storageBucket: "suporte-empreendedor.firebasestorage.app",
  messagingSenderId: "167509129804",
  appId: "1:167509129804:web:197a85f476a2be906dd2e9",
  measurementId: "G-Z1J2BX3Z60"
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
