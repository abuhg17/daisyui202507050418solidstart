// src/routes/api/firebasefood.js

// 不再需要 axios，因為我們是在伺服器端直接使用 Firebase SDK
// import axios from "axios"; // 移除此行

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// 建議將 Firebase 配置作為環境變數管理，而不是直接寫死
// 例如：process.env.FIREBASE_API_KEY
const firebaseConfig = {
  apiKey:
    process.env.FIREBASE_API_KEY || "AIzaSyBperuUWtP36lO_cRyGYSxuiTkhpy54F_Q",
  authDomain:
    process.env.FIREBASE_AUTH_DOMAIN || "myvue3-e45b9.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "myvue3-e45b9",
  storageBucket:
    process.env.FIREBASE_STORAGE_BUCKET || "myvue3-e45b9.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "439732498123",
  appId:
    process.env.FIREBASE_APP_ID || "1:439732498123:web:46d43d1cb409e8678c754e",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-80R2D8D149",
};

// 初始化 Firebase App，可以考慮在模組頂層初始化一次，避免每次請求都初始化
// 確保只初始化一次，避免重複初始化錯誤
let app;
if (!global.firebaseApp) {
  // 使用 global 變數來檢查是否已初始化
  global.firebaseApp = initializeApp(firebaseConfig);
}
app = global.firebaseApp;

const db = getFirestore(app);
const myvue3foodCollection = collection(db, "myvue3food");

export async function GET() {
  // SolidStart API 路由的入口點
  try {
    const snapshot = await getDocs(myvue3foodCollection);
    const documents = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return new Response(JSON.stringify({ myvue3food: documents }), {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching Firebase data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch data from Firebase." }),
      {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        status: 500, // 伺服器內部錯誤
      }
    );
  }
}
